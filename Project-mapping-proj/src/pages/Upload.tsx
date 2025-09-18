import React, { useState, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload as UploadIcon, FileText, File, Play, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = useCallback((files: FileList) => {
    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'uploading' as const,
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => {
            if (f.id === file.id) {
              const newProgress = f.progress + Math.random() * 30;
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...f, progress: 100, status: 'completed' };
              }
              return { ...f, progress: newProgress };
            }
            return f;
          })
        );
      }, 200);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(extension || '')) return FileText;
    if (['doc', 'docx'].includes(extension || '')) return FileText;
    if (['xls', 'xlsx', 'csv'].includes(extension || '')) return File;
    return File;
  };

  const runPrototype = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: 'No files uploaded',
        description: 'Please upload some files before running the prototype.',
        variant: 'destructive',
      });
      return;
    }

    setIsRunning(true);
    
    // Simulate processing
    setTimeout(() => {
      toast({
        title: 'Processing Complete',
        description: 'Your files have been analyzed successfully!',
      });
      setIsRunning(false);
      navigate('/results');
    }, 3000);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Upload Your Resource Data
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload project requirements, employee data, and resource documents. Our AI will analyze and create optimal allocations.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UploadIcon className="w-5 h-5 text-primary" />
                    <span>File Upload</span>
                  </CardTitle>
                  <CardDescription>
                    Drag and drop files or click to browse. Supports PDF, Excel, and Word documents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                    >
                      <UploadIcon className="w-8 h-8 text-primary" />
                    </motion.div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Drop files here or click to browse
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      PDF, Excel, Word documents up to 10MB each
                    </p>
                    
                    <Button variant="outline" className="hover-lift">
                      Select Files
                    </Button>
                  </div>

                  <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                  />
                </CardContent>
              </Card>

              {/* Uploaded Files */}
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Uploaded Files ({uploadedFiles.length})</span>
                    {uploadedFiles.length > 0 && (
                      <Button
                        onClick={runPrototype}
                        disabled={isRunning || uploadedFiles.some(f => f.status === 'uploading')}
                        className="gradient-primary border-0 text-white hover-lift"
                      >
                        {isRunning ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isRunning ? 'Processing...' : 'Run Prototype'}
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    <AnimatePresence>
                      {uploadedFiles.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-8 text-muted-foreground"
                        >
                          <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p>No files uploaded yet</p>
                        </motion.div>
                      ) : (
                        uploadedFiles.map((file) => {
                          const FileIcon = getFileIcon(file.name);
                          return (
                            <motion.div
                              key={file.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FileIcon className="w-5 h-5 text-primary" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </p>
                                
                                {file.status === 'uploading' && (
                                  <div className="mt-2">
                                    <div className="w-full bg-muted rounded-full h-1.5">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${file.progress}%` }}
                                        className="h-1.5 bg-primary rounded-full"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {file.status === 'completed' && (
                                  <CheckCircle className="w-4 h-4 text-success" />
                                )}
                                {file.status === 'error' && (
                                  <AlertCircle className="w-4 h-4 text-destructive" />
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(file.id)}
                                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                >
                                  ×
                                </Button>
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Supported Formats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12"
            >
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    What types of data can you upload?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">Project Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        Project specs, timelines, skill requirements, and resource needs
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <File className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">Employee Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Skills, experience levels, availability, and current assignments
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <UploadIcon className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-medium text-foreground mb-2">Resource Constraints</h4>
                      <p className="text-sm text-muted-foreground">
                        Budget limits, time constraints, and organizational policies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <ChatBot />
    </div>
  );
};

export default Upload;