# JobTracker Frontend

A modern React frontend for the JobTracker application - a job application tracking system built as a portfolio project.

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Routing**: React Router v7
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: Next Themes (Dark/Light mode)

## 🎨 Design Features

- **Modern UI**: Clean, minimalistic design with sophisticated color palette
- **Orange Theme**: Cohesive amber-to-orange gradient buttons throughout
- **Responsive**: Mobile-first design with excellent desktop experience
- **Dark Mode**: Full dark/light theme support
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: High contrast ratios and keyboard navigation

## 🏗️ Architecture

```
src/
├── components/
│   ├── common/          # Shared components (ProtectedRoute)
│   └── ui/              # Shadcn/ui components (Button, Card, etc.)
├── contexts/            # React contexts (Auth, Theme)
├── pages/
│   ├── auth/            # Login, Register
│   ├── applications/    # CRUD operations for job applications
│   ├── dashboard/       # Main dashboard
│   └── landing/         # Hero-only landing page
├── services/            # API client and utilities
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Environment
The frontend connects to a Laravel API backend. Ensure the backend is running and accessible.

## 🎯 Features

### Authentication
- User registration and login
- Protected routes
- Persistent sessions
- Laravel Sanctum integration

### Job Applications Management
- **CRUD Operations**: Create, read, update, delete applications
- **Status Tracking**: Pending, interviewing, offered, rejected
- **Filtering & Search**: Filter by status, search by company/position
- **Detailed Views**: Full application details with quick actions

### Dashboard
- **Overview Stats**: Total applications by status
- **Recent Activity**: Latest 3 applications with quick navigation
- **Quick Actions**: Add new applications, view all applications

### Navigation
- **Intuitive Flow**: Easy movement between dashboard and applications
- **Breadcrumb Navigation**: Clear path indicators
- **Quick Access**: Dashboard and applications buttons in all headers

## 🎨 UI/UX Highlights

- **Orange Theme**: Consistent amber-to-orange gradients for primary actions
- **Muted Colors**: Sophisticated, less bright color palette
- **Smooth Interactions**: Subtle hover effects and transitions
- **Professional Polish**: Enterprise-level design quality
- **Mobile Optimized**: Responsive design for all screen sizes

## 📱 Pages

1. **Landing Page**: Hero section with project showcase
2. **Authentication**: Login and registration forms
3. **Dashboard**: Overview with stats and recent activity
4. **Applications List**: Paginated list with filtering
5. **Application Detail**: Full details with edit/delete actions
6. **Application Form**: Create/edit application with validation

## 🔧 Production Ready

- **TypeScript**: Fully typed codebase
- **Optimized Build**: Vite optimizations for production
- **Error Handling**: Comprehensive error states and messaging
- **Loading States**: Smooth loading experiences
- **Form Validation**: Client-side validation with Zod
- **Performance**: Optimized queries and efficient renders

---

**Portfolio Project**: This is a demonstration of modern React development practices and UI design skills.