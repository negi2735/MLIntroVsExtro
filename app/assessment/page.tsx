"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2, Users, Home, Mic, BookOpen, MessageCircle, Battery, Eye } from "lucide-react"
import { z } from "zod"
import BubbleBackground from "@/components/BubbleBackground"
import CustomCursor from "@/components/CustomCursor"
import Logo from "@/components/Logo"

// Define validation schema using Zod
const PersonalitySchema = z.object({
  Going_outside: z.number().int().min(1).max(5),
  Time_spent_Alone: z.number().int().min(1).max(5),
  Stage_fear: z.number().int().min(0).max(1),
  Drained_after_socializing: z.number().int().min(0).max(1),
  Reading_books: z.number().int().min(1).max(5),
  Talkativeness: z.number().int().min(1).max(5),
  Energy_level: z.number().int().min(1).max(5),
})

interface FormData {
  Going_outside: number
  Time_spent_Alone: number
  Stage_fear: number
  Drained_after_socializing: number
  Reading_books: number
  Talkativeness: number
  Energy_level: number
}

export default function AssessmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    Going_outside: 3,
    Time_spent_Alone: 3,
    Stage_fear: 0,
    Drained_after_socializing: 0,
    Reading_books: 3,
    Talkativeness: 3,
    Energy_level: 3,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    try {
      PersonalitySchema.parse(formData)
      setValidationErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0].toString()] = err.message
          }
        })
        setValidationErrors(errors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form data
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Use our new API endpoint instead of the external one
      const response = await fetch("/api/personality", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        // Store result in localStorage to pass to results page
        localStorage.setItem("personalityResult", JSON.stringify(result))
        router.push("/results")
      } else {
        let errorMessage = "Failed to submit assessment"
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage
        }
        alert(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error connecting to server. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Interactive Animated Bubble Background */}
      <BubbleBackground />

      <main className="flex flex-col items-center justify-center px-4 py-8 h-full z-10 relative">
        <div className="w-full max-w-3xl scrollable-content">
          {/* Logo */}
          <Logo size="medium" showText={true} />
          
          <div className="mb-6">
            <Link href="/" className="back-link hover:transform hover:scale-105 transition-all duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <Card className="dark-card shadow-xl border-0 backdrop-blur-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold cosmic-text-gradient mb-2">
                🧠 Personality Assessment
              </CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Discover your unique personality traits through our scientifically-backed questionnaire
              </CardDescription>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
              </div>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Going Outside */}
                <div className="group">
                  <Card className="dark-card border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-2xl">
                          🌞
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="going-outside" className="text-lg font-semibold cosmic-text flex items-center gap-2">
                            <Users className="h-5 w-5 text-green-400" />
                            Social Energy & Outdoor Activities
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">How much do you enjoy going outside and socializing with others?</p>
                        </div>
                      </div>
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, Going_outside: Number.parseInt(value) })}
                        defaultValue={formData.Going_outside.toString()}
                      >
                        <SelectTrigger className="cosmic-input hover:border-green-400/50 transition-colors">
                          <SelectValue placeholder="Select your preference" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/20">
                          <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">🏠 Strongly prefer staying indoors</SelectItem>
                          <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">🏡 Prefer staying indoors</SelectItem>
                          <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">⚖️ Neutral - balanced approach</SelectItem>
                          <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">🌳 Enjoy going outside</SelectItem>
                          <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">🎉 Love being outdoors and socializing</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.Going_outside && (
                        <p className="text-sm text-red-400 mt-2 animate-pulse">{validationErrors.Going_outside}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Time Spent Alone */}
                <div className="group">
                  <Card className="dark-card border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-2xl">
                          ⚡
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="time-alone" className="text-lg font-semibold cosmic-text flex items-center gap-2">
                            <Battery className="h-5 w-5 text-blue-400" />
                            Energy Source & Recharge Method
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">Where do you get your energy from - people or solitude?</p>
                        </div>
                      </div>
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, Time_spent_Alone: Number.parseInt(value) })}
                        defaultValue={formData.Time_spent_Alone.toString()}
                      >
                        <SelectTrigger className="cosmic-input hover:border-blue-400/50 transition-colors">
                          <SelectValue placeholder="Select your energy source" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/20">
                          <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">👥 Gain energy from being with others</SelectItem>
                          <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">🤝 Prefer some social interaction</SelectItem>
                          <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">⚖️ Balanced between alone time and social time</SelectItem>
                          <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">🧘 Prefer spending time alone</SelectItem>
                          <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">🔋 Strongly prefer solitude to recharge</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.Time_spent_Alone && (
                        <p className="text-sm text-red-400 mt-2 animate-pulse">{validationErrors.Time_spent_Alone}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Stage Fear */}
                <div className="group">
                  <Card className="dark-card border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-2xl">
                          🎭
                        </div>
                        <div className="flex-1">
                          <Label className="text-lg font-semibold cosmic-text flex items-center gap-2">
                            <Eye className="h-5 w-5 text-red-400" />
                            Public Speaking Comfort
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">How comfortable are you with public speaking and being the center of attention?</p>
                        </div>
                      </div>
                      <RadioGroup
                        onValueChange={(value) => setFormData({ ...formData, Stage_fear: Number.parseInt(value) })}
                        defaultValue={formData.Stage_fear.toString()}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200">
                          <RadioGroupItem value="0" id="stage-fear-no" className="border-purple-400 text-purple-400" />
                          <Label htmlFor="stage-fear-no" className="text-gray-300 cursor-pointer flex items-center gap-2">
                            😎 <span>Confident public speaker</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200">
                          <RadioGroupItem value="1" id="stage-fear-yes" className="border-purple-400 text-purple-400" />
                          <Label htmlFor="stage-fear-yes" className="text-gray-300 cursor-pointer flex items-center gap-2">
                            😰 <span>Experience stage fear</span>
                          </Label>
                        </div>
                      </RadioGroup>
                      {validationErrors.Stage_fear && <p className="text-sm text-red-400 mt-2 animate-pulse">{validationErrors.Stage_fear}</p>}
                    </CardContent>
                  </Card>
                </div>

                {/* Drained After Socializing */}
                <div className="group">
                  <Card className="dark-card border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                          💭
                        </div>
                        <div className="flex-1">
                          <Label className="text-lg font-semibold cosmic-text flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-400" />
                            Post-Social Energy Levels
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">How do you typically feel after spending time in social situations?</p>
                        </div>
                      </div>
                      <RadioGroup
                        onValueChange={(value) =>
                          setFormData({ ...formData, Drained_after_socializing: Number.parseInt(value) })
                        }
                        defaultValue={formData.Drained_after_socializing.toString()}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200">
                          <RadioGroupItem value="0" id="not-drained" className="border-purple-400 text-purple-400" />
                          <Label htmlFor="not-drained" className="text-gray-300 cursor-pointer flex items-center gap-2">
                            ⚡ <span>Feel energized after socializing</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200">
                          <RadioGroupItem value="1" id="drained" className="border-purple-400 text-purple-400" />
                          <Label htmlFor="drained" className="text-gray-300 cursor-pointer flex items-center gap-2">
                            😴 <span>Feel drained after socializing</span>
                          </Label>
                        </div>
                      </RadioGroup>
                      {validationErrors.Drained_after_socializing && (
                        <p className="text-sm text-red-400 mt-2 animate-pulse">{validationErrors.Drained_after_socializing}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Reading Books */}
                <div className="group">
                  <Card className="dark-card border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-2xl">
                          📚
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="reading" className="text-lg font-semibold cosmic-text flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-amber-400" />
                            Reading & Learning Preferences  
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">How much do you enjoy reading books and learning through text?</p>
                        </div>
                      </div>
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, Reading_books: Number.parseInt(value) })}
                        defaultValue={formData.Reading_books.toString()}
                      >
                        <SelectTrigger className="cosmic-input hover:border-amber-400/50 transition-colors">
                          <SelectValue placeholder="Select your reading preference" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/20">
                          <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">😑 Dislike reading</SelectItem>
                          <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">📱 Rarely read books</SelectItem>
                          <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">📖 Occasionally read</SelectItem>
                          <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">📚 Enjoy reading regularly</SelectItem>
                          <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">📖💕 Love reading books</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.Reading_books && (
                        <p className="text-sm text-red-400 mt-2 animate-pulse">{validationErrors.Reading_books}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Talkativeness */}
                <div className="group">
                  <Card className="dark-card border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                          💬
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="talkativeness" className="text-lg font-semibold cosmic-text flex items-center gap-2">
                            <MessageCircle className="h-5 w-5 text-cyan-400" />
                            Communication Style & Talkativeness
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">How talkative and expressive are you in conversations?</p>
                        </div>
                      </div>
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, Talkativeness: Number.parseInt(value) })}
                        defaultValue={formData.Talkativeness.toString()}
                      >
                        <SelectTrigger className="cosmic-input hover:border-cyan-400/50 transition-colors">
                          <SelectValue placeholder="Select your talkativeness level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/20">
                          <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">🤐 Very quiet/reserved</SelectItem>
                          <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">😐 Somewhat quiet</SelectItem>
                          <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">🙂 Moderately talkative</SelectItem>
                          <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">😊 Quite talkative</SelectItem>
                          <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">🗣️ Very talkative/outgoing</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.Talkativeness && (
                        <p className="text-sm text-red-400 mt-2 animate-pulse">{validationErrors.Talkativeness}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Energy Level */}
                <div className="group">
                  <Card className="dark-card border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                          🔥
                        </div>
                        <div className="flex-1">
                          <Label htmlFor="energy" className="text-lg font-semibold cosmic-text flex items-center gap-2">
                            <Battery className="h-5 w-5 text-green-400" />
                            Overall Energy & Activity Level
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">What's your general energy level and preference for activities?</p>
                        </div>
                      </div>
                      <Select
                        onValueChange={(value) => setFormData({ ...formData, Energy_level: Number.parseInt(value) })}
                        defaultValue={formData.Energy_level.toString()}
                      >
                        <SelectTrigger className="cosmic-input hover:border-green-400/50 transition-colors">
                          <SelectValue placeholder="Select your energy level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/20">
                          <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">🐌 Low energy/calm activities</SelectItem>
                          <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">🚶 Somewhat low energy</SelectItem>
                          <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">🚴 Moderate energy level</SelectItem>
                          <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">🏃 High energy</SelectItem>
                          <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">⚡ Very high energy/active</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.Energy_level && (
                        <p className="text-sm text-red-400 mt-2 animate-pulse">{validationErrors.Energy_level}</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="cosmic-button w-full py-4 text-lg font-semibold rounded-xl hover:transform hover:scale-[1.02] transition-all duration-300 shadow-2xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        🧠 Analyzing Your Personality...
                      </>
                    ) : (
                      <>
                        🚀 Submit Assessment & Discover Your Personality
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
