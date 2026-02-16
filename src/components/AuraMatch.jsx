import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X, MessageCircle } from "lucide-react"
import { supabase } from "../lib/supabase.js"

export default function AuraMatch() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState([])
  const [myMatches, setMyMatches] = useState([])

  useEffect(() => {
    const mockMatches = [
      {
        id: 1,
        name: "Riya Sharma",
        year: 3,
        branch: "CSE",
        skills: ["Python", "TensorFlow", "Computer Vision"],
        project: "YOLOv9 for traffic sign detection",
        matchScore: 94,
        availability: "Weekends",
        image: "https://i.pravatar.cc/300?img=1",
      },
      {
        id: 2,
        name: "Ananya Singh",
        year: 2,
        branch: "ECE",
        skills: ["Arduino", "IoT", "Embedded"],
        project: "Smart home automation",
        matchScore: 87,
        availability: "Evenings",
        image: "https://i.pravatar.cc/300?img=5",
      },
      {
        id: 3,
        name: "Priya Verma",
        year: 2,
        branch: "IT",
        skills: ["React", "Node", "MongoDB"],
        project: "Student networking platform",
        matchScore: 91,
        availability: "Flexible",
        image: "https://i.pravatar.cc/300?img=9",
      },
    ]
    setMatches(mockMatches)
  }, [])

  const handleSwipe = async (direction) => {
    const matched = matches[currentIndex]

    if (direction === "right") {
      setMyMatches((prev) => [...prev, matched])

      try {
        await supabase.from("matches").insert({
          user1_id: "current_user",
          user2_id: matched.id,
          project: matched.project,
        })
      } catch (err) {
        console.error("Supabase error:", err)
      }
    }

    setCurrentIndex((prev) =>
      prev === matches.length - 1 ? 0 : prev + 1
    )
  }

  const currentMatch = matches[currentIndex]

  if (!currentMatch) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-gray-400">
        Loading matches…
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold gradient-text mb-2">
          Aura Match
        </h2>
        <p className="text-gray-400">
          Find your perfect project partner ✨
        </p>
      </div>

      {/* Swipe Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMatch.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl"
        >
          {/* Match badge */}
          <div className="absolute top-5 right-5 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {currentMatch.matchScore}% match
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <img
              src={currentMatch.image}
              alt={currentMatch.name}
              className="w-28 h-28 rounded-full border-4 border-purple-500/40 object-cover"
            />
          </div>

          {/* Info */}
          <h3 className="text-2xl font-bold text-center">
            {currentMatch.name}
          </h3>
          <p className="text-center text-purple-400 font-medium mb-5">
            {currentMatch.year}th Year · {currentMatch.branch}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {currentMatch.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-purple-500/20 border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Project */}
          <div className="bg-black/20 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-gray-400 mb-1">
              Current Project
            </p>
            <p className="font-medium">
              {currentMatch.project}
            </p>
          </div>

          {/* Availability */}
          <div className="text-center mb-8">
            <span className="text-sm px-4 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
              Available · {currentMatch.availability}
            </span>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSwipe("left")}
              className="w-16 h-16 rounded-full flex items-center justify-center bg-red-500/20 border border-red-400/30"
            >
              <X className="text-red-400" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSwipe("right")}
              className="w-20 h-20 rounded-full flex items-center justify-center bg-emerald-500/20 border border-emerald-400/30"
            >
              <Heart className="text-emerald-400" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Matches List */}
      {myMatches.length > 0 && (
        <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <MessageCircle size={20} />
            Your Matches
          </h3>

          <div className="space-y-3">
            {myMatches.slice(-3).map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between bg-black/20 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-emerald-400">
                      {m.matchScore}% match
                    </p>
                  </div>
                </div>

                <button className="px-4 py-1 text-sm rounded-lg bg-purple-500 text-white">
                  Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recruitment CTA */}
      <div className="mt-12 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">
          Join the Core Team?
        </h3>
        <p className="text-gray-400 mb-4">
          Great matches often make great leaders 🚀
        </p>

        <iframe
          src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
          className="w-full h-[400px] rounded-xl"
        />
      </div>
    </div>
  )
}
