# Job Tracker Frontend

A modern React frontend for the Job Tracker application, built with cutting-edge technologies for a superior user experience.

## 🚀 Tech Stack

- **React 18** - Latest React with hooks and modern features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and micro-interactions
- **React Router v6** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client for API requests
- **React Hook Form + Zod** - Form management with validation
- **next-themes** - Dark/light mode support
- **Sonner** - Beautiful toast notifications

## 🎨 Design Features

- **Ultra-minimalistic** design with purposeful white space
- **Dark/Light mode** with system preference detection
- **Responsive design** that works beautifully on all devices
- **Accessibility-first** approach (WCAG 2.1 AA compliant)
- **Modern typography** with Inter Variable font
- **Micro-animations** for delightful user interactions
- **Glassmorphism effects** and subtle shadows

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   ├── landing/         # Landing page components
│   └── common/          # Common components
├── pages/               # Route components
│   ├── landing/         # Landing page
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard pages
│   └── applications/    # Job application pages
├── contexts/            # React contexts
├── hooks/               # Custom hooks
├── services/            # API services
├── types/               # TypeScript definitions
└── lib/                 # Utility functions
```

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_NAME=Job Tracker
VITE_APP_VERSION=1.0.0
```

### Features Included

- ✅ Modern landing page with hero section
- ✅ Authentication system setup
- ✅ Theme provider for dark/light mode
- ✅ API service layer with Axios
- ✅ Type-safe forms with React Hook Form + Zod
- ✅ Toast notifications with Sonner
- ✅ Responsive design components
- ✅ Loading states and error handling

### Next Steps

1. **Complete authentication pages** (login/register)
2. **Build dashboard with analytics**
3. **Implement job applications CRUD**
4. **Add search and filtering**
5. **Implement data visualization**
6. **Add performance optimizations**

## 🎯 Design Goals

- **Performance**: Lightning-fast loading and interactions
- **Accessibility**: Screen reader compatible, keyboard navigation
- **Mobile-first**: Beautiful on all device sizes
- **Modern UX**: Smooth animations and micro-interactions
- **Type Safety**: Full TypeScript coverage
- **Maintainability**: Clean, organized code structure

## 📚 Key Libraries

- **UI Components**: shadcn/ui for consistent, accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Query for server state
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6 for navigation
- **Icons**: Lucide React for modern icons
- **Animations**: Framer Motion for smooth transitions
