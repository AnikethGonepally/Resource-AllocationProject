import React, { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Users, MapPin, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Employee {
  id: string;
  name: string;
  role: string;
  experience: string;
  projectAssigned: string;
  availability: 'Available' | 'Busy' | 'On Leave';
  skillset: string[];
  location: string;
  rating: number;
  utilizationRate: number;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior AI Engineer',
    experience: '5+ years',
    projectAssigned: 'Project Alpha',
    availability: 'Busy',
    skillset: ['Python', 'TensorFlow', 'Computer Vision', 'NLP'],
    location: 'San Francisco, CA',
    rating: 4.9,
    utilizationRate: 85,
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    role: 'Full Stack Developer',
    experience: '3-5 years',
    projectAssigned: 'Available',
    availability: 'Available',
    skillset: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    location: 'New York, NY',
    rating: 4.7,
    utilizationRate: 60,
  },
  {
    id: '3',
    name: 'Alex Kim',
    role: 'Senior AI Engineer',
    experience: '5+ years',
    projectAssigned: 'Project Beta',
    availability: 'Busy',
    skillset: ['Python', 'PyTorch', 'MLOps', 'Kubernetes'],
    location: 'Seattle, WA',
    rating: 4.8,
    utilizationRate: 90,
  },
  {
    id: '4',
    name: 'Emily Johnson',
    role: 'UX Designer',
    experience: '2-3 years',
    projectAssigned: 'Available',
    availability: 'Available',
    skillset: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    location: 'Austin, TX',
    rating: 4.6,
    utilizationRate: 45,
  },
  {
    id: '5',
    name: 'David Park',
    role: 'DevOps Engineer',
    experience: '3-5 years',
    projectAssigned: 'Project Gamma',
    availability: 'Busy',
    skillset: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
    location: 'San Francisco, CA',
    rating: 4.8,
    utilizationRate: 95,
  },
  {
    id: '6',
    name: 'Lisa Wang',
    role: 'Product Manager',
    experience: '5+ years',
    projectAssigned: 'Project Alpha',
    availability: 'Busy',
    skillset: ['Product Strategy', 'Agile', 'Analytics', 'Stakeholder Management'],
    location: 'Boston, MA',
    rating: 4.9,
    utilizationRate: 80,
  },
  {
    id: '7',
    name: 'James Wilson',
    role: 'Junior Developer',
    experience: '1-2 years',
    projectAssigned: 'Available',
    availability: 'Available',
    skillset: ['JavaScript', 'React', 'CSS', 'Git'],
    location: 'Remote',
    rating: 4.3,
    utilizationRate: 30,
  },
  {
    id: '8',
    name: 'Maria Garcia',
    role: 'Data Scientist',
    experience: '3-5 years',
    projectAssigned: 'Project Beta',
    availability: 'On Leave',
    skillset: ['Python', 'R', 'SQL', 'Machine Learning'],
    location: 'Miami, FL',
    rating: 4.7,
    utilizationRate: 0,
  },
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');
  const [filterSkill, setFilterSkill] = useState('all');

  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((employee) => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.skillset.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesProject = filterProject === 'all' || 
                             employee.projectAssigned.toLowerCase().includes(filterProject.toLowerCase()) ||
                             (filterProject === 'available' && employee.projectAssigned === 'Available');
      
      const matchesExperience = filterExperience === 'all' || employee.experience === filterExperience;
      
      const matchesSkill = filterSkill === 'all' || 
                          employee.skillset.some(skill => skill.toLowerCase().includes(filterSkill.toLowerCase()));

      return matchesSearch && matchesProject && matchesExperience && matchesSkill;
    });
  }, [searchTerm, filterProject, filterExperience, filterSkill]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-success text-success-foreground';
      case 'Busy': return 'bg-warning text-warning-foreground';
      case 'On Leave': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'text-destructive';
    if (rate >= 70) return 'text-warning';
    return 'text-success';
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
                <h1 className="text-4xl font-bold text-foreground mb-2">Employee Management</h1>
                <p className="text-muted-foreground">
                  Manage resource allocations and track employee availability
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">
                    {filteredEmployees.length} of {mockEmployees.length} employees
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <span>Filters & Search</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Search */}
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name, role, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Project Filter */}
                  <Select value={filterProject} onValueChange={setFilterProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="alpha">Project Alpha</SelectItem>
                      <SelectItem value="beta">Project Beta</SelectItem>
                      <SelectItem value="gamma">Project Gamma</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Experience Filter */}
                  <Select value={filterExperience} onValueChange={setFilterExperience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="1-2 years">1-2 years</SelectItem>
                      <SelectItem value="2-3 years">2-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Skill Filter */}
                  <Select value={filterSkill} onValueChange={setFilterSkill}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="aws">AWS</SelectItem>
                      <SelectItem value="tensorflow">TensorFlow</SelectItem>
                      <SelectItem value="figma">Figma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Employee Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Role & Experience</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Skills</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Utilization</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEmployees.map((employee, index) => (
                        <motion.tr
                          key={employee.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{employee.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground">{employee.role}</p>
                              <p className="text-sm text-muted-foreground">{employee.experience}</p>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <span className="font-medium text-foreground">{employee.projectAssigned}</span>
                          </TableCell>
                          
                          <TableCell>
                            <Badge className={`${getAvailabilityColor(employee.availability)}`}>
                              {employee.availability}
                            </Badge>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-48">
                              {employee.skillset.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {employee.skillset.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{employee.skillset.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{employee.location}</span>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-warning fill-current" />
                              <span className="font-medium">{employee.rating}</span>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    employee.utilizationRate >= 90 ? 'bg-destructive' :
                                    employee.utilizationRate >= 70 ? 'bg-warning' : 'bg-success'
                                  }`}
                                  style={{ width: `${employee.utilizationRate}%` }}
                                />
                              </div>
                              <span className={`text-sm font-medium ${getUtilizationColor(employee.utilizationRate)}`}>
                                {employee.utilizationRate}%
                              </span>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-2xl font-bold text-success">
                          {mockEmployees.filter(e => e.availability === 'Available').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Busy</p>
                        <p className="text-2xl font-bold text-warning">
                          {mockEmployees.filter(e => e.availability === 'Busy').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">On Leave</p>
                        <p className="text-2xl font-bold text-destructive">
                          {mockEmployees.filter(e => e.availability === 'On Leave').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-destructive" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Rating</p>
                        <p className="text-2xl font-bold text-foreground">
                          {(mockEmployees.reduce((acc, e) => acc + e.rating, 0) / mockEmployees.length).toFixed(1)}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Star className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <ChatBot />
    </div>
  );
};

export default Employees;