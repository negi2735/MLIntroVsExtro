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
import { Brain, ArrowLeft, Loader2 } from "lucide-react"
import { z } from "zod"
import BubbleBackground from "@/components/BubbleBackground"

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
        const errorData = await response.json()
        alert(`Error: ${errorData.error || "Failed to submit assessment"}`)
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
      {/* Interactive Animated Bubble Background */}
      <BubbleBackground />

      {/* Navigation */}
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
              <Link href="/assessment" className="text-purple-400 font-semibold">
                Assessment
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center px-4 py-20 h-full z-10 relative">
        <div className="w-full max-w-2xl scrollable-content">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <Card className="dark-card shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold cosmic-text-gradient">Personality Assessment</CardTitle>
              <CardDescription className="text-gray-300">
                Answer these questions to discover your personality traits
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Going Outside */}
                <div className="space-y-3">
                  <Label htmlFor="going-outside" className="text-base font-semibold cosmic-text">
                    How much do you enjoy going outside and socializing?
                  </Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, Going_outside: Number.parseInt(value) })}
                    defaultValue={formData.Going_outside.toString()}
                  >
                    <SelectTrigger className="cosmic-input">
                      <SelectValue placeholder="Select your preference" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/20">
                      <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">Strongly prefer staying indoors</SelectItem>
                      <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">Prefer staying indoors</SelectItem>
                      <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">Neutral</SelectItem>
                      <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">Enjoy going outside</SelectItem>
                      <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">Love being outdoors and socializing</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.Going_outside && (
                    <p className="text-sm text-red-400">{validationErrors.Going_outside}</p>
                  )}
                </div>

                {/* Time Spent Alone */}
                <div className="space-y-3">
                  <Label htmlFor="time-alone" className="text-base font-semibold cosmic-text">
                    Where do you gain energy from?
                  </Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, Time_spent_Alone: Number.parseInt(value) })}
                    defaultValue={formData.Time_spent_Alone.toString()}
                  >
                    <SelectTrigger className="cosmic-input">
                      <SelectValue placeholder="Select your energy source" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/20">
                      <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">Gain energy from being with others</SelectItem>
                      <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">Prefer some social interaction</SelectItem>
                      <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">Balanced between alone time and social time</SelectItem>
                      <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">Prefer spending time alone</SelectItem>
                      <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">Strongly prefer solitude to recharge</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.Time_spent_Alone && (
                    <p className="text-sm text-red-400">{validationErrors.Time_spent_Alone}</p>
                  )}
                </div>

                {/* Stage Fear */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold cosmic-text">
                    Do you experience stage fear or anxiety when speaking publicly?
                  </Label>
                  <RadioGroup
                    onValueChange={(value) => setFormData({ ...formData, Stage_fear: Number.parseInt(value) })}
                    defaultValue={formData.Stage_fear.toString()}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="stage-fear-no" className="border-purple-400 text-purple-400" />
                      <Label htmlFor="stage-fear-no" className="text-gray-300">No stage fear</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="stage-fear-yes" className="border-purple-400 text-purple-400" />
                      <Label htmlFor="stage-fear-yes" className="text-gray-300">Experience stage fear</Label>
                    </div>
                  </RadioGroup>
                  {validationErrors.Stage_fear && <p className="text-sm text-red-400">{validationErrors.Stage_fear}</p>}
                </div>

                {/* Drained After Socializing */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold cosmic-text">
                    Do you feel drained after socializing?
                  </Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      setFormData({ ...formData, Drained_after_socializing: Number.parseInt(value) })
                    }
                    defaultValue={formData.Drained_after_socializing.toString()}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="not-drained" className="border-purple-400 text-purple-400" />
                      <Label htmlFor="not-drained" className="text-gray-300">Feel energized after socializing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="drained" className="border-purple-400 text-purple-400" />
                      <Label htmlFor="drained" className="text-gray-300">Feel drained after socializing</Label>
                    </div>
                  </RadioGroup>
                  {validationErrors.Drained_after_socializing && (
                    <p className="text-sm text-red-400">{validationErrors.Drained_after_socializing}</p>
                  )}
                </div>

                {/* Reading Books */}
                <div className="space-y-3">
                  <Label htmlFor="reading" className="text-base font-semibold cosmic-text">
                    How much do you enjoy reading books?
                  </Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, Reading_books: Number.parseInt(value) })}
                    defaultValue={formData.Reading_books.toString()}
                  >
                    <SelectTrigger className="cosmic-input">
                      <SelectValue placeholder="Select your reading preference" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/20">
                      <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">Dislike reading</SelectItem>
                      <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">Rarely read</SelectItem>
                      <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">Occasionally read</SelectItem>
                      <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">Enjoy reading</SelectItem>
                      <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">Love reading books</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.Reading_books && (
                    <p className="text-sm text-red-400">{validationErrors.Reading_books}</p>
                  )}
                </div>

                {/* Talkativeness */}
                <div className="space-y-3">
                  <Label htmlFor="talkativeness" className="text-base font-semibold cosmic-text">
                    How talkative are you?
                  </Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, Talkativeness: Number.parseInt(value) })}
                    defaultValue={formData.Talkativeness.toString()}
                  >
                    <SelectTrigger className="cosmic-input">
                      <SelectValue placeholder="Select your talkativeness level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/20">
                      <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">Very quiet/reserved</SelectItem>
                      <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">Somewhat quiet</SelectItem>
                      <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">Moderately talkative</SelectItem>
                      <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">Quite talkative</SelectItem>
                      <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">Very talkative/outgoing</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.Talkativeness && (
                    <p className="text-sm text-red-400">{validationErrors.Talkativeness}</p>
                  )}
                </div>

                {/* Energy Level */}
                <div className="space-y-3">
                  <Label htmlFor="energy" className="text-base font-semibold cosmic-text">
                    What is your general energy level?
                  </Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, Energy_level: Number.parseInt(value) })}
                    defaultValue={formData.Energy_level.toString()}
                  >
                    <SelectTrigger className="cosmic-input">
                      <SelectValue placeholder="Select your energy level" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/20">
                      <SelectItem value="1" className="text-gray-200 hover:bg-purple-500/20">Low energy/calm activities</SelectItem>
                      <SelectItem value="2" className="text-gray-200 hover:bg-purple-500/20">Somewhat low energy</SelectItem>
                      <SelectItem value="3" className="text-gray-200 hover:bg-purple-500/20">Moderate energy level</SelectItem>
                      <SelectItem value="4" className="text-gray-200 hover:bg-purple-500/20">High energy</SelectItem>
                      <SelectItem value="5" className="text-gray-200 hover:bg-purple-500/20">Very high energy/active</SelectItem>
                    </SelectContent>
                  </Select>
                  {validationErrors.Energy_level && (
                    <p className="text-sm text-red-400">{validationErrors.Energy_level}</p>
                  )}
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="cosmic-button w-full py-3 text-base font-semibold rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Submit Assessment"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
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