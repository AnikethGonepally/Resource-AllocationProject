import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Play, Users, Brain, BarChart3, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const features = [
    { icon: Brain, label: 'AI-Powered Matching', value: '95% Accuracy' },
    { icon: Users, label: 'Resource Optimization', value: '40% Faster' },
    { icon: BarChart3, label: 'Conflict Resolution', value: 'Real-time' },
    { icon: Clock, label: 'Time Saved', value: '15hrs/week' },
  ];

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-primary/10 to-accent/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Resource Management
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground leading-tight"
              >
                AI-Driven Talent Management for{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Project–Resource Mapping
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                Intelligently allocate talent to projects with AI-powered matching, real-time conflict resolution, and dynamic resource optimization. Transform your project management with data-driven insights.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/upload">
                <Button size="lg" className="gradient-primary border-0 text-white hover-lift group">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="hover-lift group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">{feature.value}</p>
                    <p className="text-sm text-muted-foreground">{feature.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <Card className="overflow-hidden shadow-2xl bg-card/90 backdrop-blur-lg border-0 hover-lift">
              <CardContent className="p-0">
                {/* Dashboard Header */}
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">Project Dashboard</h3>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <div className="w-3 h-3 rounded-full bg-warning"></div>
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                    </div>
                  </div>
                </div>

                {/* Sample Dashboard Content */}
                <div className="p-6 space-y-4">
                  {/* Resource Allocation */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Current Allocations</h4>
                    {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project, index) => (
                      <motion.div
                        key={project}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-chart-1' : index === 1 ? 'bg-chart-2' : 'bg-chart-3'
                          }`}></div>
                          <span className="text-sm font-medium">{project}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {index === 0 ? '8 resources' : index === 1 ? '12 resources' : '6 resources'}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Resource Utilization</h4>
                    {[85, 92, 78].map((percentage, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 1.3 + index * 0.1, duration: 0.8 }}
                        className="space-y-1"
                      >
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {index === 0 ? 'AI Engineers' : index === 1 ? 'Frontend Devs' : 'Designers'}
                          </span>
                          <span className="font-medium">{percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ delay: 1.5 + index * 0.1, duration: 1 }}
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-chart-1' : index === 1 ? 'bg-chart-2' : 'bg-chart-3'
                            }`}
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-lg"
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;