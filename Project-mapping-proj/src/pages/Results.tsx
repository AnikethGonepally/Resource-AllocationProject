import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, Users, AlertTriangle, Calendar, 
  Target, Activity, Clock, CheckCircle, XCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for charts
const allocationData = [
  { project: 'Alpha', allocated: 8, required: 10, efficiency: 85 },
  { project: 'Beta', allocated: 12, required: 12, efficiency: 92 },
  { project: 'Gamma', allocated: 6, required: 8, efficiency: 78 },
  { project: 'Delta', allocated: 4, required: 6, efficiency: 67 },
];

const demandSupplyData = [
  { month: 'Jan', demand: 45, supply: 42 },
  { month: 'Feb', demand: 52, supply: 48 },
  { month: 'Mar', demand: 48, supply: 50 },
  { month: 'Apr', demand: 61, supply: 55 },
  { month: 'May', demand: 55, supply: 58 },
  { month: 'Jun', demand: 67, supply: 60 },
];

const skillDistribution = [
  { skill: 'AI/ML', value: 25, color: '#8B5CF6' },
  { skill: 'Frontend', value: 35, color: '#06B6D4' },
  { skill: 'Backend', value: 20, color: '#10B981' },
  { skill: 'DevOps', value: 12, color: '#F59E0B' },
  { skill: 'Design', value: 8, color: '#EF4444' },
];

const timelineData = [
  { week: 'Week 1', project1: 3, project2: 4, project3: 2 },
  { week: 'Week 2', project1: 4, project2: 3, project3: 3 },
  { week: 'Week 3', project1: 2, project2: 5, project3: 4 },
  { week: 'Week 4', project1: 5, project2: 2, project3: 1 },
];

const conflicts = [
  {
    id: 1,
    type: 'Resource Overlap',
    description: 'Sarah Chen is allocated to both Project Alpha and Beta for the same time period',
    severity: 'high',
    impact: 'Project delays possible',
    suggestion: 'Reschedule Project Beta tasks or find alternative resource',
  },
  {
    id: 2,
    type: 'Skill Gap',
    description: 'Project Gamma requires 2 additional DevOps engineers',
    severity: 'medium',
    impact: 'Deployment timeline at risk',
    suggestion: 'Consider outsourcing or training existing team members',
  },
  {
    id: 3,
    type: 'Over-allocation',
    description: 'Alex Kim is allocated 110% capacity next month',
    severity: 'high',
    impact: 'Burnout risk and quality concerns',
    suggestion: 'Redistribute workload or extend project timeline',
  },
];

const Results = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3months');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
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
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Allocation Results</h1>
                <p className="text-muted-foreground">
                  AI-powered resource allocation analysis and recommendations
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="gradient-primary border-0 text-white hover-lift">
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Match Accuracy</p>
                        <p className="text-3xl font-bold text-success">94.5%</p>
                        <p className="text-xs text-success flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +5.2% from last month
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                        <Target className="w-6 h-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Resources Allocated</p>
                        <p className="text-3xl font-bold text-primary">28/32</p>
                        <p className="text-xs text-primary flex items-center mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          87.5% utilization
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Active Conflicts</p>
                        <p className="text-3xl font-bold text-warning">3</p>
                        <p className="text-xs text-destructive flex items-center mt-1">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          2 high priority
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Response Time</p>
                        <p className="text-3xl font-bold text-foreground">2.4s</p>
                        <p className="text-xs text-success flex items-center mt-1">
                          <Activity className="w-3 h-3 mr-1" />
                          Real-time processing
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Dashboard */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="allocations">Allocations</TabsTrigger>
                <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Project Allocations Chart */}
                  <Card className="hover-lift">
                    <CardHeader>
                      <CardTitle>Project Resource Allocation</CardTitle>
                      <CardDescription>Current vs Required Resources</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={allocationData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="project" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="allocated" fill="#8B5CF6" name="Allocated" />
                          <Bar dataKey="required" fill="#06B6D4" name="Required" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Skill Distribution */}
                  <Card className="hover-lift">
                    <CardHeader>
                      <CardTitle>Skill Distribution</CardTitle>
                      <CardDescription>Current team composition by skills</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={skillDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ skill, value }) => `${skill}: ${value}%`}
                          >
                            {skillDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Demand vs Supply */}
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle>Demand vs Supply Trend</CardTitle>
                    <CardDescription>Resource demand and availability over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={demandSupplyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="demand" stroke="#EF4444" strokeWidth={3} />
                        <Line type="monotone" dataKey="supply" stroke="#10B981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Allocations Tab */}
              <TabsContent value="allocations" className="space-y-6">
                <div className="grid gap-6">
                  {allocationData.map((project, index) => (
                    <motion.div
                      key={project.project}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="hover-lift">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>Project {project.project}</CardTitle>
                            <Badge className={project.efficiency >= 85 ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                              {project.efficiency}% Efficiency
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-foreground">{project.allocated}</p>
                              <p className="text-sm text-muted-foreground">Allocated Resources</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-foreground">{project.required}</p>
                              <p className="text-sm text-muted-foreground">Required Resources</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-2xl font-bold text-foreground">{project.required - project.allocated}</p>
                              <p className="text-sm text-muted-foreground">Remaining Need</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Conflicts Tab */}
              <TabsContent value="conflicts" className="space-y-6">
                <div className="space-y-4">
                  {conflicts.map((conflict, index) => (
                    <motion.div
                      key={conflict.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <Card className="hover-lift">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <div className={`w-3 h-3 rounded-full mt-1 ${
                                conflict.severity === 'high' ? 'bg-destructive' : 
                                conflict.severity === 'medium' ? 'bg-warning' : 'bg-success'
                              }`}></div>
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">{conflict.type}</h3>
                                <p className="text-muted-foreground">{conflict.description}</p>
                              </div>
                            </div>
                            <Badge className={getSeverityColor(conflict.severity)}>
                              {conflict.severity.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="p-3 rounded-lg bg-destructive/10">
                              <p className="text-sm font-medium text-destructive mb-1">Impact</p>
                              <p className="text-sm text-muted-foreground">{conflict.impact}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-success/10">
                              <p className="text-sm font-medium text-success mb-1">Suggestion</p>
                              <p className="text-sm text-muted-foreground">{conflict.suggestion}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <Button size="sm" className="gradient-primary border-0 text-white">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Resolve
                            </Button>
                            <Button variant="outline" size="sm">
                              <XCircle className="w-4 h-4 mr-2" />
                              Dismiss
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-6">
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>Resource Allocation Timeline</span>
                    </CardTitle>
                    <CardDescription>Weekly resource distribution across projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="project1" stackId="a" fill="#8B5CF6" name="Project Alpha" />
                        <Bar dataKey="project2" stackId="a" fill="#06B6D4" name="Project Beta" />
                        <Bar dataKey="project3" stackId="a" fill="#10B981" name="Project Gamma" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <ChatBot />
    </div>
  );
};

export default Results;