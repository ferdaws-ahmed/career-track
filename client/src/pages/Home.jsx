import { Link } from 'react-router-dom';
import {
  Briefcase,
  Search,
  CheckCircle,
  TrendingUp,
  Zap,
  BarChart3,
  Clock,
  Award,
  ArrowRight,
  Users,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Easily search and filter through all your job applications in one place.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Track Progress',
      description: 'Monitor your application status from saved to offer with beautiful visualizations.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Analytics Dashboard',
      description: 'Get insights into your job search with detailed statistics and metrics.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Blazing fast interface built with React and Vite for the best user experience.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: BarChart3,
      title: 'Status Pipelines',
      description: 'Organize your applications into clear pipelines and never miss a step.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Clock,
      title: 'Interview Reminders',
      description: 'Never miss an interview with built-in reminders and tracking.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Add Jobs',
      description: 'Quickly add any job application with all relevant details including company, position, and application link.'
    },
    {
      number: '02',
      title: 'Track Progress',
      description: 'Update your application status as you move through interviews, assessments, and offers.'
    },
    {
      number: '03',
      title: 'Get Hired',
      description: 'Stay organized, motivated, and land your dream job with CareerTrack Lite!'
    }
  ];

  const stats = [
    { value: '10k+', label: 'Applications Tracked' },
    { value: '5k+', label: 'Happy Users' },
    { value: '100%', label: 'Free Forever' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                <span>Launch your job search today</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Job Search,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Organized
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
                Track every job application, stay organized, and land your dream job with CareerTrack Lite. The simplest way to manage your job search.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-200 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto text-gray-700 bg-white border border-gray-200 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Senior Product Designer</p>
                      <p className="text-sm text-gray-500">Google • Mountain View</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Offer
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Full Stack Developer</p>
                      <p className="text-sm text-gray-500">Stripe • Remote</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      Interview
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Frontend Engineer</p>
                      <p className="text-sm text-gray-500">Notion • NYC</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                      Applied
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="text-white">
                <p className="text-4xl lg:text-5xl font-bold">{stat.value}</p>
                <p className="text-blue-100 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to help you track, manage, and land your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in just 3 simple steps and take control of your job search today!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to land your dream job?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who are already using CareerTrack Lite to stay organized and get hired faster.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
