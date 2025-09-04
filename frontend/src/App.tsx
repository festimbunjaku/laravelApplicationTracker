import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import LandingPage from '@/pages/landing/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import ApplicationFormPage from '@/pages/applications/ApplicationFormPage';
import ApplicationDetailPage from '@/pages/applications/ApplicationDetailPage';
import ProtectedRoute from '@/components/common/ProtectedRoute';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/applications" 
                  element={
                    <ProtectedRoute>
                      <ApplicationsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/applications/new" 
                  element={
                    <ProtectedRoute>
                      <ApplicationFormPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/applications/:id" 
                  element={
                    <ProtectedRoute>
                      <ApplicationDetailPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/applications/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <ApplicationFormPage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch all route - redirect to landing */}
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </div>
          </Router>
          <Toaster 
            position="top-right"
            offset="80px"
            expand={false}
            richColors
            closeButton
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.75rem',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                marginTop: '16px',
                marginRight: '16px',
              },
              className: 'toaster-custom',
            }}
            theme="system"
          />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
