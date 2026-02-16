import { useState } from 'react'

import { Volume2, X } from 'lucide-react'
import { generateVibexPulse } from '../lib/ai'

export default function VibexPulse() {
  const [isOpen, setIsOpen] = useState(false)
  const [pulseText, setPulseText] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handlePulse = async () => {
    setIsOpen(true)

    const branchData = {
      newProjects: 3,
      lookingForTeammates: 12,
      upcomingEvents: 2,
      latestPost: 'Someone just posted a fire meme about the canteen food'
    }

    const summary = await generateVibexPulse(branchData)
    setPulseText(summary)

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(summary)
      utterance.rate = 1.1
      utterance.pitch = 1.0
      utterance.volume = 1.0
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }

  return (
    <>
      <motion.div
        className="floating-orb"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePulse}
      >
        <Volume2 size={32} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="modal-backdrop" onClick={handleClose}>
            <motion.div
              className="modal-content max-w-md"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text flex items-center gap-2">
                  <Volume2 className="text-purple-400" />
                  VIBEX Pulse
                </h3>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {pulseText ? (
                <>
                  <div className="bg-white/5 rounded-xl p-6 mb-4 border border-purple-500/30">
                    <p className="text-lg leading-relaxed">{pulseText}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    {isSpeaking ? (
                      <>
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                        Speaking...
                      </>
                    ) : (
                      'Audio finished'
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  />
                  <p className="text-gray-400 mt-4">Generating pulse...</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}