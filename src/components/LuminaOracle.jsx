import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send } from 'lucide-react'
import { askLumina } from '../lib/ai'
import { useStore } from '../store/useStore'

export default function LuminaOracle() {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, events, members } = useStore()

  const handleAsk = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    const context = {
      skills: user.skills,
      interests: user.interests,
      year: user.year,
      branch: user.branch,
      events: events.slice(0, 5),
      members: members.slice(0, 10)
    }
    
    const answer = await askLumina(query, context)
    setResponse(answer)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-purple-600/30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block mb-4"
          >
            <Sparkles className="text-purple-400" size={40} />
          </motion.div>

          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Lumina Oracle
          </h2>

          <p className="text-gray-400 mt-3">
            Ask anything about projects, skills, events, or career paths ✨
          </p>
        </div>

        {/* Input Area */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask Lumina something magical..."
            className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAsk}
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-purple-500/40 transition"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send size={20} />
            )}
          </motion.button>
        </div>

        {/* Response Area */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-6 shadow-inner"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="text-purple-400 mt-1 flex-shrink-0" size={20} />
                <p className="text-white leading-relaxed whitespace-pre-wrap">
                  {response}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
