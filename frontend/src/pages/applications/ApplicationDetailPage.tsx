import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Building, 
  Clock,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { jobApplicationsApi } from '@/services/api';

// Status color mapping
const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  interview: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
} as const;

const statusDescriptions = {
  pending: 'Application submitted and waiting for response',
  interview: 'Interview has been scheduled or completed',
  approved: 'Job offer received or application approved',
  rejected: 'Application was not successful',
  in_progress: 'Application is currently being reviewed',
} as const;

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch application data
  const { data: application, isLoading, error } = useQuery({
    queryKey: ['jobApplication', id],
    queryFn: async () => {
      if (!id) throw new Error('No application ID provided');
      const response = await jobApplicationsApi.getById(Number(id));
      return response.data;
    },
    enabled: Boolean(id),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => jobApplicationsApi.delete(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
      toast.success('Job application deleted successfully');
      navigate('/applications');
    },
    onError: (error: unknown) => {
      console.error('Delete failed:', error);
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to delete application');
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    setShowDeleteConfirm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Application Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The job application you're looking for doesn't exist or has been deleted.
            </p>
            <Link to="/applications">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Back to Applications
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/applications" 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Applications
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="border-2 border-amber-700 dark:border-amber-600 text-amber-800 dark:text-amber-400 hover:bg-amber-800 hover:text-white dark:hover:bg-amber-800 dark:hover:text-white hover:border-amber-800 dark:hover:border-amber-800 font-medium transition-all duration-300 transform hover:scale-[1.01]">
                  Dashboard
                </Button>
              </Link>
              
              <Link to={`/applications/${id}/edit`}>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Main Info Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-3xl font-light mb-2">
                    {application.title}
                  </CardTitle>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    {application.position}
                  </p>
                  <div className="flex items-center text-lg text-gray-600 dark:text-gray-400">
                    <Building className="w-5 h-5 mr-2" />
                    {application.company}
                  </div>
                </div>
                
                <div className="flex flex-col items-start sm:items-end gap-3">
                  <Badge 
                    variant="secondary" 
                    className={`text-sm ${statusColors[application.status as keyof typeof statusColors]}`}
                  >
                    {application.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  
                  {application.link && (
                    <a
                      href={application.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Job Posting
                    </a>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Status Description */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Status: {statusDescriptions[application.status as keyof typeof statusDescriptions]}
                </p>
              </div>

              {/* Timeline Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Applied On
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(application.created_at)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Last Updated
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDateTime(application.updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              {application.notes && (
                <div>
                  <div className="flex items-center mb-3">
                    <FileText className="w-5 h-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Notes
                    </h3>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {application.notes}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900 dark:text-slate-100">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to={`/applications/${id}/edit`}>
                  <Button className="w-full justify-start bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white border-0 shadow-sm hover:shadow-md font-medium transition-all duration-300 transform hover:scale-[1.01]">
                    <Edit className="w-5 h-5 mr-3" />
                    Edit Application
                  </Button>
                </Link>
                
                {application.link && (
                  <a
                    href={application.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full justify-start bg-gradient-to-r from-stone-700 to-neutral-800 hover:from-stone-800 hover:to-neutral-900 text-white border-0 shadow-sm hover:shadow-md font-medium transition-all duration-300 transform hover:scale-[1.01]">
                      <ExternalLink className="w-5 h-5 mr-3" />
                      View Job Posting
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Delete Job Application
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this job application? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleteMutation.isPending}
                className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 font-semibold transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-800 hover:to-rose-800 text-white shadow-sm hover:shadow-md font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
