// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { Zap, Calendar, Users, TrendingUp } from "lucide-react"
import { useStore } from "../store/useStore"

export default function VibeCore() {
  const { user, updateVibeScore } = useStore()

  const hotEvents = [
    {
      id: 1,
      title: "AI Workshop by Microsoft",
      rsvp: 47,
      date: "2024-02-20",
      image:
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800",
    },
    {
      id: 2,
      title: "Web3 Hackathon",
      rsvp: 32,
      date: "2024-02-25",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    },
    {
      id: 3,
      title: "Circuit Design Bootcamp",
      rsvp: 28,
      date: "2024-03-01",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    },
  ]

  const handleRSVP = () => {
    updateVibeScore(5)
  }

  if (!user) return null

  return (
    <div className="section">
      {/* Vibe Score Card */}
      <motion.div
        className="glass-card mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-400">
              Your vibe is looking{" "}
              {user.vibeScore > 70 ? "immaculate" : "decent"} today ✨
            </p>
          </div>

          <div className="text-center">
            <div className="text-6xl font-black gradient-text">
              {user.vibeScore}
            </div>
            <div className="text-sm text-gray-400 flex items-center gap-2 mt-2">
              <TrendingUp size={16} />
              Vibe Score
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <StatCard icon={<Calendar size={20} />} label="Events Joined" value="12" />
          <StatCard icon={<Users size={20} />} label="Connections" value="34" />
          <StatCard icon={<Zap size={20} />} label="Projects" value="5" />
        </div>
      </motion.div>

      {/* Hot Events */}
      <div>
        <h2 className="text-3xl font-bold mb-6">
          <span className="gradient-text">🔥 Hot Right Now</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-bold mb-2">{event.title}</h3>

              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Users size={16} />
                <span>{event.rsvp} people going</span>
              </div>

              <button
                className="btn-primary w-full"
                onClick={handleRSVP}
              >
                I'm In! 🎯
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass-card text-center p-4">
      <div className="flex justify-center text-purple-400 mb-2">
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  )
}
