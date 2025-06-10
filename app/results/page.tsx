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
          <Card className="dark-card shadow-xl border-0 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold cosmic-text-gradient">Your Personality Analysis</CardTitle>
              <CardDescription className="text-lg text-gray-300">{insights.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                    isExtrovert 
                      ? "bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-300 border border-orange-500/30" 
                      : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                  }`}
                >
                  <Users className="h-5 w-5 mr-2" />
                  {personalityType} ({confidencePercentage}% confidence)
                </div>
              </div>
              <p className="text-gray-300 text-center leading-relaxed text-lg">{insights.description}</p>
            </CardContent>
          </Card>

          {/* Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Traits Card */}
            <Card className="dark-card shadow-xl border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold cosmic-text flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-purple-400" />
                  Key Traits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {insights.traits.map((trait, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">{trait}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Suggestions Card */}
            <Card className="dark-card shadow-xl border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold cosmic-text flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {insights.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Decorative Image */}
          <div className="flex justify-center mb-8">
            <img
              src="https://images.unsplash.com/photo-1615866369373-8d232ea5a028"
              alt="Personality Visualization"
              className="hero-image w-full max-w-md h-48 object-cover"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/assessment" className="flex-1">
              <Button variant="outline" className="cosmic-button-secondary w-full py-3 text-base">
                Retake Assessment
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="cosmic-button w-full py-3 text-base">Back to Home</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-nav fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="text-gray-400 text-sm">© 2024 Personality Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}