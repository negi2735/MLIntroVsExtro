"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, BookOpen, Lightbulb } from "lucide-react"
import BubbleBackground from "@/components/BubbleBackground"
import CustomCursor from "@/components/CustomCursor"
import Logo from "@/components/Logo"

interface PersonalityResult {
  success?: boolean
  insertedId?: string
  prediction?: string
  confidence?: number
}

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<PersonalityResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedResult = localStorage.getItem("personalityResult")
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult)
        setResult(parsedResult)
      } catch (error) {
        console.error("Error parsing result:", error)
        router.push("/assessment")
      }
    } else {
      router.push("/assessment")
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="page-container flex items-center justify-center">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Interactive Animated Bubble Background */}
        <BubbleBackground />
        <div className="text-center z-10">
          <Logo size="medium" showText={false} />
          <p className="text-gray-300">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="page-container flex items-center justify-center">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Interactive Animated Bubble Background */}
        <BubbleBackground />
        <div className="text-center z-10">
          <Logo size="medium" showText={true} />
          <p className="text-gray-300 mb-4">No results found. Please take the assessment first.</p>
          <Link href="/assessment">
            <Button className="cosmic-button">Take Assessment</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isExtrovert = result.prediction?.toLowerCase().includes("extrovert")
  const personalityType = result.prediction || "Unknown"
  const confidencePercentage = result.confidence ? Math.round(result.confidence * 100) : 0

  const getInsights = () => {
    if (isExtrovert) {
      return {
        title: "You lean towards Extroversion",
        description:
          "Based on your responses, you exhibit traits that align more closely with an extroverted personality.",
        traits: [
          "You gain energy from social interactions",
          "You enjoy being the center of attention",
          "You think out loud and process externally",
        ],
        suggestions: ["Join group activities", "Take on leadership roles", "Practice active listening"],
      }
    } else {
      return {
        title: "You lean towards Introversion",
        description:
          "Based on your responses, you exhibit traits that align more closely with an introverted personality.",
        traits: [
          "You recharge through solitude",
          "You prefer deep, meaningful conversations",
          "You process information internally before speaking",
        ],
        suggestions: [
          "Schedule alone time to recharge",
          "Find quiet spaces for focused work",
          "Express your thoughts through writing",
        ],
      }
    }
  }

  const insights = getInsights()

  return (
    <div className="page-container">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Interactive Animated Bubble Background */}
      <BubbleBackground />

      <main className="flex flex-col items-center justify-center px-4 py-8 h-full z-10 relative">
        <div className="w-full max-w-4xl scrollable-content">
          {/* Logo */}
          <Logo size="medium" showText={true} />
          
          <div className="mb-6">
            <Link
              href="/assessment"
              className="back-link"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Assessment
            </Link>
          </div>

          {/* Main Result Card */}
          <Card className="dark-card shadow-xl border-0 mb-8 backdrop-blur-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-4xl font-bold cosmic-text-gradient mb-2">
                🎯 Your Personality Analysis
              </CardTitle>
              <CardDescription className="text-xl cosmic-text">{insights.title}</CardDescription>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 hover:transform hover:scale-105 ${
                    isExtrovert 
                      ? "bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-300 border border-orange-500/30 shadow-lg shadow-orange-500/10" 
                      : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/10"
                  }`}
                >
                  {isExtrovert ? "🎉" : "🧘"} <Users className="h-6 w-6 mx-2" />
                  {personalityType} ({confidencePercentage}% confidence)
                </div>
              </div>
              <p className="text-gray-300 text-center leading-relaxed text-xl cosmic-text">{insights.description}</p>
            </CardContent>
          </Card>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Traits Card */}
            <Card className="dark-card shadow-xl border-0 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold cosmic-text flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                    💡
                  </div>
                  Key Traits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {insights.traits.map((trait, index) => (
                    <li key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-purple-500/5 transition-colors duration-200">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                      <p className="text-gray-300 text-lg">{trait}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Suggestions Card */}
            <Card className="dark-card shadow-xl border-0 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold cosmic-text flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mr-3">
                    🚀
                  </div>
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {insights.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-green-500/5 transition-colors duration-200">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{animationDelay: `${index * 0.5}s`}}></div>
                      <p className="text-gray-300 text-lg">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Decorative Image */}
          <div className="flex justify-center mb-8">
            <div className="relative max-w-md mx-auto">
              <img
                src="https://images.unsplash.com/photo-1748194449456-a6a59f63dcc8"
                alt="Professional Psychology Data Visualization"
                className="hero-image w-full h-48 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/assessment" className="flex-1">
              <Button variant="outline" className="cosmic-button-secondary w-full py-4 text-lg font-semibold rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300">
                🔄 Retake Assessment
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="cosmic-button w-full py-4 text-lg font-semibold rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300">
                🏠 Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}