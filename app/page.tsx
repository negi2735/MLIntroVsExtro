import Link from "next/link"
import { Button } from "@/components/ui/button"
import BubbleBackground from "@/components/BubbleBackground"
import CustomCursor from "@/components/CustomCursor"
import Logo from "@/components/Logo"

export default function HomePage() {
  return (
    <div className="page-container">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Interactive Animated Bubble Background */}
      <BubbleBackground />

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-center px-4 text-center lg:text-left h-full max-w-7xl mx-auto z-10 relative">
        {/* Content Section */}
        <div className="flex-1 lg:pr-12 mb-8 lg:mb-0">
          {/* Logo */}
          <Logo size="large" showText={true} />

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
              src="https://images.unsplash.com/photo-1551086002-6eebfd453843"
              alt="Professional Psychology and Personality Insights"
              className="hero-image w-full h-auto"
            />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </main>
    </div>
  )
}