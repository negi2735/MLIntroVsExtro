import { Brain } from "lucide-react"

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
}

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }

  const textSizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl'
  }

  return (
    <div className="flex items-center justify-center space-x-3 mb-8">
      <div className="relative">
        {/* Outer glow ring */}
        <div className={`${sizeClasses[size]} absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-md animate-pulse`}></div>
        
        {/* Main logo background */}
        <div className={`${sizeClasses[size]} relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl`}>
          <Brain className={`${size === 'large' ? 'h-10 w-10' : size === 'medium' ? 'h-8 w-8' : 'h-6 w-6'} text-white drop-shadow-lg`} />
        </div>

        {/* Inner highlight */}
        <div className={`${sizeClasses[size]} absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none`}></div>
      </div>

      {showText && (
        <div className="text-center">
          <h1 className={`${textSizeClasses[size]} font-bold cosmic-text-gradient leading-tight`}>
            Personality Insights
          </h1>
          <p className="text-gray-400 text-sm mt-1">Discover Your True Self</p>
        </div>
      )}
    </div>
  )
}