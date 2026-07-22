import {
  Search,
  CheckCircle,
  TrendingUp,
  Zap,
  BarChart3,
  Clock,
} from 'lucide-react';

export const heroSection = {
  badge: {
    text: 'Launch your job search today',
    icon: Zap,
  },
  title: 'Your Job Search, Organized',
  description:
    'Track every job application, stay organized, and land your dream job with CareerTrack Lite. The simplest way to manage your job search.',
  ctaButtons: [
    {
      text: 'Get Started Free',
      to: '/register',
      primary: true,
    },
    {
      text: 'Sign In',
      to: '/login',
      primary: false,
    },
  ],
  mockApplications: [
    {
      jobTitle: 'Senior Product Designer',
      companyName: 'Google',
      status: 'Offer',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      jobTitle: 'Full Stack Developer',
      companyName: 'Stripe',
      status: 'Interview',
      statusColor: 'bg-purple-100 text-purple-800',
    },
    {
      jobTitle: 'Frontend Engineer',
      companyName: 'Notion',
      status: 'Applied',
      statusColor: 'bg-blue-100 text-blue-800',
    },
  ],
};

export const statsSection = {
  stats: [
    { value: '10k+', label: 'Applications Tracked' },
    { value: '5k+', label: 'Happy Users' },
    { value: '100%', label: 'Free Forever' },
    { value: '24/7', label: 'Support Available' },
  ],
};

export const featuresSection = {
  title: 'Everything you need to stay organized',
  description: 'Powerful features to help you track, manage, and land your dream job.',
  features: [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Easily search and filter through all your job applications in one place.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: CheckCircle,
      title: 'Track Progress',
      description: 'Monitor your application status from saved to offer with beautiful visualizations.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Get insights into your job search with detailed statistics and metrics.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Blazing fast interface built with React and Vite for the best user experience.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: BarChart3,
      title: 'Status Pipelines',
      description: 'Organize your applications into clear pipelines and never miss a step.',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Clock,
      title: 'Interview Reminders',
      description: 'Never miss an interview with built-in reminders and tracking.',
      color: 'from-pink-500 to-pink-600',
    },
  ],
};

export const howItWorksSection = {
  title: 'How It Works',
  description: 'Get started in just 3 simple steps and take control of your job search today!',
  steps: [
    {
      number: '01',
      title: 'Add Jobs',
      description:
        'Quickly add any job application with all relevant details including company, position, and application link.',
    },
    {
      number: '02',
      title: 'Track Progress',
      description:
        'Update your application status as you move through interviews, assessments, and offers.',
    },
    {
      number: '03',
      title: 'Get Hired',
      description:
        'Stay organized, motivated, and land your dream job with CareerTrack Lite!',
    },
  ],
};

export const ctaSection = {
  title: 'Ready to land your dream job?',
  description:
    'Join thousands of job seekers who are already using CareerTrack Lite to stay organized and get hired faster.',
  ctaButton: {
    text: 'Get Started for Free',
    to: '/register',
  },
};
