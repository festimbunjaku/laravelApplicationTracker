import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 dark:from-slate-900 dark:via-slate-800 dark:to-stone-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <svg className="h-8 w-8 mr-3" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#gradient)" />
                <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h12v2H8v-2z" fill="white" />
                <circle cx="20" cy="20" r="3" fill="white" opacity="0.8" />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#475569" />
                    <stop offset="1" stopColor="#334155" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-semibold text-slate-800 dark:text-slate-200">JobTracker</span>
              <span className="ml-3 text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full">Portfolio</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-gray-800 dark:hover:from-slate-700 dark:hover:to-gray-800 font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white shadow-sm hover:shadow-md font-medium transition-all duration-300 transform hover:scale-[1.01]">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:flex lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8"
          >
            <div className="mt-8 sm:mt-12 lg:mt-0">
              <div className="inline-flex space-x-6">
                <span className="rounded-full bg-slate-600/10 px-3 py-1 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 ring-1 ring-inset ring-slate-600/20">
                  Portfolio Project
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">
                  <span>Full-stack demo application</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden="true" />
                </span>
              </div>
            </div>
            <h1 className="mt-10 text-4xl font-light tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
              Modern Job Application{' '}
              <span className="font-semibold bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                Tracking System
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              A sophisticated full-stack web application showcasing{' '}
              <span className="font-medium text-slate-700 dark:text-slate-300">React 18</span>,{' '}
              <span className="font-medium text-slate-700 dark:text-slate-300">TypeScript</span>, and{' '}
              <span className="font-medium text-slate-700 dark:text-slate-300">Laravel 12 API</span>.{' '}
              Experience modern development practices with clean architecture and intuitive design.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white shadow-sm hover:shadow-md font-medium transition-all duration-300 transform hover:scale-[1.01]">
                  Try Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="lg" className="text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-slate-700 hover:to-gray-800 dark:hover:from-slate-700 dark:hover:to-gray-800 font-medium transition-all duration-300 transform hover:scale-[1.01] shadow-sm hover:shadow-md">
                  Explore Features
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-x-6">
              <div className="flex -space-x-2 overflow-hidden">
             
             {/* Laravel Icon */}
              <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 ring-2 ring-white dark:ring-slate-800 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <img src="/icons/laravel.svg" alt="Laravel" className="h-5 w-5" />
                </div>
                
                {/* React Icon */}
                <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 ring-2 ring-white dark:ring-slate-800 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <img src="/icons/react.svg" alt="React" className="h-5 w-5" />
                </div>
                
                {/* TypeScript Icon */}
                <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 ring-2 ring-white dark:ring-slate-800 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <img src="/icons/typescript.svg" alt="TypeScript" className="h-5 w-5" />
                </div>
                
                {/* Laravel Icon */}

                
                {/* Tailwind CSS Icon */}
                <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 ring-2 ring-white dark:ring-slate-800 flex items-center justify-center hover:scale-110 transition-transform duration-200">
                  <img src="/icons/tailwindcss.svg" alt="Tailwind CSS" className="h-5 w-5" />
                </div>
              </div>
              <div className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">Portfolio</strong> project showcasing full-stack development
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
          >
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="rounded-md bg-white p-6 shadow-2xl ring-1 ring-gray-900/10 dark:bg-slate-800 dark:ring-white/10">
                  {/* Browser header */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                      jobtracker.portfolio
                    </div>
                  </div>
                  
                  {/* App header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 bg-gradient-to-br from-slate-600 to-slate-700 rounded"></div>
                      <div className="h-3 w-20 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="h-6 w-16 bg-slate-700 rounded text-white text-xs"></div>
                  </div>
                  
                  {/* Stats cards */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                      <div className="h-2 w-12 bg-slate-300 dark:bg-slate-600 rounded mb-2"></div>
                      <div className="h-4 w-8 bg-slate-600 dark:bg-slate-400 rounded"></div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                      <div className="h-2 w-16 bg-amber-300 dark:bg-amber-600 rounded mb-2"></div>
                      <div className="h-4 w-6 bg-amber-600 dark:bg-amber-400 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Application list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>
                        <div className="h-2 w-24 bg-slate-400 dark:bg-slate-500 rounded"></div>
                      </div>
                      <div className="h-2 w-12 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/30 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                        <div className="h-2 w-20 bg-slate-400 dark:bg-slate-500 rounded"></div>
                      </div>
                      <div className="h-2 w-16 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

