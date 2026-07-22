import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import {
  heroSection,
  statsSection,
  featuresSection,
  howItWorksSection,
  ctaSection,
} from '../data/homeData';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <heroSection.badge.icon className="h-4 w-4" />
                <span>{heroSection.badge.text}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Job Search,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Organized
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
                {heroSection.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                {heroSection.ctaButtons.map((btn, i) => (
                  <Link
                    key={i}
                    to={btn.to}
                    className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center space-x-2 ${
                      btn.primary
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-2xl hover:shadow-blue-200'
                        : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span>{btn.text}</span>
                    {btn.primary && <ArrowRight className="h-5 w-5" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
                <div className="space-y-4">
                  {heroSection.mockApplications.map((app, i) => (
                    <div
                      key={i}
                      className={`flex items-center space-x-3 ${
                        i === 0 ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-gray-50'
                      } p-4 rounded-2xl`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{app.jobTitle}</p>
                        <p className="text-sm text-gray-500">{app.companyName}</p>
                      </div>
                      <span className={`px-3 py-1 ${app.statusColor} text-xs font-semibold rounded-full`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
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
            {statsSection.stats.map((stat, i) => (
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
              {featuresSection.title}
            </h2>
            <p className="text-lg text-gray-600">{featuresSection.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresSection.features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
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
              {howItWorksSection.title}
            </h2>
            <p className="text-lg text-gray-600">{howItWorksSection.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSection.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
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
              {ctaSection.title}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {ctaSection.description}
            </p>
            <Link
              to={ctaSection.ctaButton.to}
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all"
            >
              <span>{ctaSection.ctaButton.text}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
