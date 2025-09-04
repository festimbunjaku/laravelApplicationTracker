import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { jobApplicationsApi } from '@/services/api';
import { Plus, Briefcase, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  // Fetch job applications for dashboard stats
  const { data: applicationsData } = useQuery({
    queryKey: ['jobApplications'],
    queryFn: async () => {
      const response = await jobApplicationsApi.getAll();
      return response.data || [];
    },
  });

  // Calculate stats from real data
  const totalApplications = applicationsData?.length || 0;
  const pendingApplications = applicationsData?.filter(app => app.status === 'pending').length || 0;
  const approvedApplications = applicationsData?.filter(app => app.status === 'approved').length || 0;
  const rejectedApplications = applicationsData?.filter(app => app.status === 'rejected').length || 0;

  const stats = [
    {
      title: 'Total Applications',
      value: totalApplications.toString(),
      icon: Briefcase,
      color: 'text-slate-600 dark:text-slate-400',
      bgColor: 'bg-slate-100 dark:bg-slate-700/20',
    },
    {
      title: 'Pending',
      value: pendingApplications.toString(),
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    },
    {
      title: 'Approved',
      value: approvedApplications.toString(),
      icon: CheckCircle,
      color: 'text-emerald-600 dark:text-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/10',
    },
    {
      title: 'Rejected',
      value: rejectedApplications.toString(),
      icon: XCircle,
      color: 'text-rose-600 dark:text-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-900/10',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-light text-slate-900 dark:text-slate-100">
                Job Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-600 dark:text-slate-400">
                Welcome, {user?.name}
              </span>
              <Link to="/applications">
                <Button variant="outline" className="border-2 border-amber-700 dark:border-amber-600 text-amber-800 dark:text-amber-400 hover:bg-amber-800 hover:text-white dark:hover:bg-amber-800 dark:hover:text-white hover:border-amber-800 dark:hover:border-amber-800 font-medium transition-all duration-300 transform hover:scale-[1.01]">
                  All Applications
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={logout}
                className="border-2 border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 hover:bg-red-700 hover:text-white dark:hover:bg-red-700 dark:hover:text-white hover:border-red-700 dark:hover:border-red-700 font-medium transition-all duration-300 transform hover:scale-[1.01]"
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-light text-slate-900 dark:text-slate-100 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Track your job applications and manage your career journey.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-light text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Add Application Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span>Add New Application</span>
              </CardTitle>
              <CardDescription>
                Track a new job application you've submitted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/applications/new">
                <Button className="w-full bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white shadow-sm hover:shadow-md font-medium transition-all duration-300 transform hover:scale-[1.01]">
                  Add Application
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity Card */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest job application updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalApplications === 0 ? (
                <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-60" />
                  <p className="font-medium">No applications yet</p>
                  <p className="text-sm">Add your first job application to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Recent Applications
                    </p>
                    <Link to="/applications">
                      <Button variant="ghost" size="sm" className="text-amber-800 dark:text-amber-400 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-amber-800 hover:to-orange-800 dark:hover:from-amber-800 dark:hover:to-orange-800 font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md">
                        <Eye className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </Link>
                  </div>
                  
                  {applicationsData?.slice(0, 3).map((app) => (
                    <Link key={app.id} to={`/applications/${app.id}`}>
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {app.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                            {app.company}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          app.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                          app.status === 'approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' :
                          app.status === 'rejected' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
