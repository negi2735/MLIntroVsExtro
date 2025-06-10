import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"
import BubbleBackground from "@/components/BubbleBackground"

export default function HomePage() {
  return (
    <div className="page-container">
      {/* Interactive Animated Bubble Background */}
      <BubbleBackground />

      {/* Minimal Navigation */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-400 cosmic-logo" />
              <span className="text-xl font-bold cosmic-text-gradient">Personality Insights</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="/assessment" className="text-gray-300 hover:text-purple-400 transition-colors">
                Assessment
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-center px-4 text-center lg:text-left h-full max-w-7xl mx-auto z-10 relative">
        {/* Content Section */}
        <div className="flex-1 lg:pr-12 mb-8 lg:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="cosmic-text">Welcome to</span><br />
            <span className="cosmic-text-gradient">Personality Insights</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Discover the fascinating dynamics between personality types. Our scientifically validated insights help you understand yourself and others.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/assessment">
              <Button
                size="lg"
                className="cosmic-button px-8 py-4 text-lg font-semibold rounded-lg w-full sm:w-auto"
              >
                Take Assessment
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="cosmic-button-secondary px-8 py-4 text-lg font-semibold rounded-lg w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="flex-1 lg:pl-12">
          <div className="relative max-w-lg mx-auto">
            <img
              src="https://images.unsplash.com/photo-1618367588421-400296bac364"
              alt="Personality Insights"
              className="hero-image w-full h-auto"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="text-gray-400 text-sm">© 2024 Personality Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}