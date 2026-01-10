import Link from 'next/link';
import { ArrowRight, Video, Zap, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-black">convinco</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-black transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-black transition">How it works</a>
              <a href="#demo" className="text-gray-600 hover:text-black transition">Demo</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/analyze"
                className="bg-black text-white px-6 py-2.5 rounded-full hover:bg-gray-800 transition font-medium"
              >
                Try Pitch Pulse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl shadow-2xl flex items-center justify-center transform hover:scale-105 transition">
              <Video className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
            Practice your pitch.<br />
            Get <span className="text-blue-500">real-time</span> feedback.
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your <span className="font-semibold text-black">sales presentation</span> into a winning performance with{' '}
            <span className="font-semibold text-black">live AI coaching</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/analyze"
              className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition font-semibold text-lg flex items-center gap-2 shadow-lg"
            >
              Try it yourself
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#demo"
              className="bg-white text-black border-2 border-black px-8 py-4 rounded-full hover:bg-gray-50 transition font-semibold text-lg"
            >
              See demo
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Used by 500+ sales professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>87% improvement in pitch scores</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Real-time analysis in seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              The only tool with <span className="text-blue-500">live</span> coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlike post-pitch analysis tools, Pitch Pulse gives you feedback while you practice—just like a real coach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Live Sentiment Waves</h3>
              <p className="text-gray-600 leading-relaxed">
                Watch engagement intensity rise and fall in real-time. Know exactly when you're losing your audience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Micro-Moment Markers</h3>
              <p className="text-gray-600 leading-relaxed">
                AI flags exact timestamps where attention dropped or peaked. Replay and fix problem areas instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Video className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Color-Coded Replay</h3>
              <p className="text-gray-600 leading-relaxed">
                Green = engaging, Yellow = losing them, Red = critical. Instantly see what's working and what's not.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Smart Suggestions</h3>
              <p className="text-gray-600 leading-relaxed">
                AI whispers coaching tips like "slow down", "add story here", "you're losing them" at the perfect moments.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Comparison View</h3>
              <p className="text-gray-600 leading-relaxed">
                See your pitch side-by-side with top performers. Learn from the best in your industry.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Instant Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your practice pitch and get comprehensive feedback in seconds. No waiting, no complexity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              How Convinco's Pitch Pulse <span className="text-blue-500">works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your pitch from average to exceptional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Record or Upload</h3>
              <p className="text-gray-600 leading-relaxed">
                Practice your pitch on camera or upload an existing recording. Works with any sales presentation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">AI Analyzes Live</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI watches like a real coach, tracking engagement, pace, tone, and body language in real-time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Improve & Win</h3>
              <p className="text-gray-600 leading-relaxed">
                Get actionable feedback, replay problem areas, and practice until perfect. Close more deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to master your pitch?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join hundreds of sales professionals who've transformed their presentations with Pitch Pulse.
          </p>
          <Link 
            href="/analyze"
            className="bg-white text-black px-10 py-5 rounded-full hover:bg-gray-100 transition font-bold text-lg inline-flex items-center gap-2 shadow-xl"
          >
            Start analyzing now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-gray-400 mt-6">No signup required • Try with demo videos first</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-black">convinco</span>
              <p className="text-gray-500 text-sm mt-2">Pitch Pulse • A feature concept</p>
            </div>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition">Privacy</a>
              <a href="#" className="hover:text-black transition">Terms</a>
              <a href="#" className="hover:text-black transition">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © 2026 Convinco. Built with ❤️ by Antipas
          </div>
        </div>
      </footer>
    </div>
  );
}