import { motion } from 'framer-motion'
import { Star, Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function FeedbackSystem() {
  const [selectedEvent, setSelectedEvent] = useState('')
  const [rating, setRating] = useState(0)
  const [satisfaction, setSatisfaction] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const events = [
    'AI Workshop by Microsoft',
    'Web3 Hackathon',
    'IoT Bootcamp',
    'IEEE Day Celebration'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedEvent || rating === 0) {
      alert('Please select an event and provide a rating')
      return
    }

    console.log({
      event: selectedEvent,
      rating,
      satisfaction,
      suggestions
    })

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSelectedEvent('')
      setRating(0)
      setSatisfaction('')
      setSuggestions('')
    }, 3000)
  }

  return (
    <div className="section">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold gradient-text mb-2">Event Feedback</h2>
          <p className="text-gray-400">Help us improve - your voice matters! 💬</p>
        </div>

        {submitted ? (
          <motion.div
            className="glass-card text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <CheckCircle className="text-green-400 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-400">Your feedback has been submitted successfully.</p>
          </motion.div>
        ) : (
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Which event did you attend? *
                </label>
                <select
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                  required
                >
                  <option value="" disabled>Select an event</option>
                  {events.map((event, idx) => (
                    <option key={idx} value={event} className="bg-gray-900">
                      {event}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Overall Rating *
                </label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={40}
                        className={rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm text-gray-400 mt-2">
                  {rating === 0 && 'Click to rate'}
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  What did you like most?
                </label>
                <textarea
                  value={satisfaction}
                  onChange={(e) => setSatisfaction(e.target.value)}
                  placeholder="Share what you enjoyed about the event..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 min-h-[100px] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Suggestions for Improvement
                </label>
                <textarea
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  placeholder="How can we make it better next time?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 min-h-[100px] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  Quick Feedback (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    '✅ Well organized',
                    '🎤 Great speakers',
                    '⏰ Good timing',
                    '🍕 Food was good',
                    '💡 Learned a lot',
                    '🤝 Good networking'
                  ].map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Submit Feedback
              </button>
            </form>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-3 gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text">487</div>
            <div className="text-sm text-gray-400">Total Responses</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text">4.6</div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </div>
          <div className="glass-card text-center">
            <div className="text-3xl font-bold gradient-text">92%</div>
            <div className="text-sm text-gray-400">Satisfaction</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}