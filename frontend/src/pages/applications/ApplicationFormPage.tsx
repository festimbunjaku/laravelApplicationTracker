import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Loader2, Save, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { jobApplicationsApi } from '@/services/api';
interface JobAppFormData {
  link: string;
  title: string;
  position: string;
  company: string;
  status: 'pending' | 'interview' | 'approved' | 'rejected';
  notes?: string;
}

const jobApplicationSchema = z.object({
  link: z
    .string()
    .min(1, 'Job link is required')
    .url('Please enter a valid URL'),
  title: z
    .string()
    .min(1, 'Job title is required')
    .max(255, 'Job title must be less than 255 characters'),
  position: z
    .string()
    .min(1, 'Position is required')
    .max(255, 'Position must be less than 255 characters'),
  company: z
    .string()
    .min(1, 'Company name is required')
    .max(255, 'Company name must be less than 255 characters'),
  status: z
    .enum(['pending', 'interview', 'approved', 'rejected']),
  notes: z
    .string()
    .optional(),
});

export default function ApplicationFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<JobAppFormData>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      status: 'pending',
      notes: '',
    },
  });

  // Watch the link field to show external link icon
  const linkValue = watch('link');

  // Fetch existing application data if editing
  const { data: applicationData, isLoading: isLoadingApp } = useQuery({
    queryKey: ['jobApplication', id],
    queryFn: async () => {
      if (!id) return null;
      const response = await jobApplicationsApi.getById(Number(id));
      return response.data;
    },
    enabled: isEditing && Boolean(id),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: JobAppFormData) => jobApplicationsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
      toast.success('Job application created successfully!');
      navigate('/applications');
    },
    onError: (error: unknown) => {
      console.error('Create failed:', error);
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create application');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: JobAppFormData) => 
      jobApplicationsApi.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications'] });
      queryClient.invalidateQueries({ queryKey: ['jobApplication', id] });
      toast.success('Job application updated successfully!');
      navigate('/applications');
    },
    onError: (error: unknown) => {
      console.error('Update failed:', error);
      toast.error((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to update application');
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (applicationData && isEditing) {
      reset({
        link: applicationData.link || '',
        title: applicationData.title || '',
        position: applicationData.position || '',
        company: applicationData.company || '',
        status: applicationData.status || 'pending',
        notes: applicationData.notes || '',
      });
    }
  }, [applicationData, isEditing, reset]);

  const onSubmit = async (data: JobAppFormData) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  if (isEditing && isLoadingApp) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/applications" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Applications
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="border-2 border-amber-700 dark:border-amber-600 text-amber-800 dark:text-amber-400 hover:bg-amber-800 hover:text-white dark:hover:bg-amber-800 dark:hover:text-white hover:border-amber-800 dark:hover:border-amber-800 font-medium transition-all duration-300 transform hover:scale-[1.01]">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-light">
                {isEditing ? 'Edit Job Application' : 'Add New Job Application'}
              </CardTitle>
              <CardDescription>
                {isEditing 
                  ? 'Update your job application details below.'
                  : 'Fill in the details for your new job application.'
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Job Link */}
                <div className="space-y-2">
                  <Label htmlFor="link" className="text-sm font-medium">
                    Job Posting Link *
                  </Label>
                  <div className="relative">
                    <Input
                      id="link"
                      type="url"
                      placeholder="https://example.com/job-posting"
                      {...register('link')}
                      className={errors.link ? 'border-red-500 focus:border-red-500' : ''}
                    />
                    {linkValue && (
                      <a
                        href={linkValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {errors.link && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.link.message}
                    </p>
                  )}
                </div>

                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Job Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Senior Software Engineer"
                    {...register('title')}
                    className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-sm font-medium">
                    Position/Role *
                  </Label>
                  <Input
                    id="position"
                    type="text"
                    placeholder="Frontend Developer"
                    {...register('position')}
                    className={errors.position ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.position && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.position.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Acme Corporation"
                    {...register('company')}
                    className={errors.company ? 'border-red-500 focus:border-red-500' : ''}
                  />
                  {errors.company && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Application Status
                  </Label>
                  <select
                    id="status"
                    {...register('status')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="interview">Interview Scheduled</option>
                    <option value="approved">Approved/Offered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  {errors.status && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    Notes (Optional)
                  </Label>
                  <textarea
                    id="notes"
                    rows={4}
                    placeholder="Add any additional notes about this application..."
                    {...register('notes')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  {errors.notes && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/applications');
                    }}
                    disabled={isLoading}
                    className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 font-semibold transition-all duration-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white shadow-sm hover:shadow-md font-medium transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {isEditing ? 'Update Application' : 'Create Application'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
