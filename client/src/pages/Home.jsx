import { Link } from 'react-router-dom';
import { Briefcase, Search, CheckCircle, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Briefcase className="h-16 w-16 mr-4" />
              <h1 className="text-5xl font-bold">CareerTrack Lite</h1>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Track your job applications effortlessly. Stay organized, never miss an opportunity, and land your dream job!
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose CareerTrack Lite?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Organize Applications</h3>
                <p className="text-gray-600">Keep track of all your job applications in one beautiful, easy-to-use dashboard.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">Monitor your application status from saved to offer with clear statistics.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay Focused</h3>
                <p className="text-gray-600">See your recent applications and stay motivated in your job search journey.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
