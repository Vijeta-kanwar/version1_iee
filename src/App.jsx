import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Sparkles,
  Heart,
  MessageSquare,
  Calendar,
  Users,
  Award,
  Info,
  MessageCircle,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Menu,
  X,
} from "lucide-react"

import VibeCore from "./components/VibeCore"
import LuminaOracle from "./components/LuminaOracle"
import AuraMatch from "./components/AuraMatch"
import EchoWall from "./components/EchoWall"
import EventsHub from "./components/EventsHub"
import RecruitmentCenter from "./components/RecruitmentCenter"
import PastEventsGallery from "./components/PastEventsGallery"
import MembershipSection from "./components/MembershipSection"
import FeedbackSystem from "./components/FeedbackSystem"

import { useStore } from "./store/useStore"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useStore()

  const navigation = [
    { id: "home", label: "VibeCore", icon: Home },
    { id: "lumina", label: "Lumina AI", icon: Sparkles },
    { id: "match", label: "Aura Match", icon: Heart },
    { id: "echo", label: "Echo Wall", icon: MessageSquare },
    { id: "events", label: "Events", icon: Calendar },
    { id: "recruitment", label: "Join Us", icon: Users },
    { id: "gallery", label: "Gallery", icon: Award },
    { id: "membership", label: "Membership", icon: Info },
    { id: "feedback", label: "Feedback", icon: MessageCircle },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <VibeCore />
      case "lumina":
        return <LuminaOracle />
      case "match":
        return <AuraMatch />
      case "echo":
        return <EchoWall />
      case "events":
        return <EventsHub />
      case "recruitment":
        return <RecruitmentCenter />
      case "gallery":
        return <PastEventsGallery />
      case "membership":
        return <MembershipSection />
      case "feedback":
        return <FeedbackSystem />
      default:
        return <VibeCore />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex flex-col">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-black text-lg">
              I
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">
                IEEE IGDTUW
              </h1>
              <p className="text-xs text-gray-400">
                VibePlatform 2.0
              </p>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigation.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${
                    activeTab === id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE NAV */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden px-4 pb-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {navigation.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id)
                      setMobileMenuOpen(false)
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm
                      ${
                        activeTab === id
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                          : "bg-white/5 text-gray-300 hover:bg-white/10"
                      }
                    `}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN */}
      <main className="flex-1 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="max-w-6xl mx-auto px-4"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left">
            <h3 className="font-bold gradient-text mb-1">
              IEEE IGDTUW
            </h3>
            <p className="text-sm text-gray-400">
              Building the future, one project at a time
            </p>
          </div>

          <div className="flex gap-4">
            {[Linkedin, Instagram, Twitter, Globe].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pb-4">
          © 2026 IEEE IGDTUW · VERSION ONE — Nobita & Vijeta 💜
        </div>
      </footer>
    </div>
  )
}

export default App
