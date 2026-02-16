import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, Award, X } from 'lucide-react'
import { useState } from 'react'

export default function PastEventsGallery() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const pastEvents = [
    {
      id: 1,
      title: 'TechFest 2023',
      date: 'October 2023',
      attendees: 500,
      highlights: ['3 keynote speakers', '15+ workshops', '₹1L prize pool'],
      images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800'
      ],
      speakers: ['Dr. Anjali Sharma (Google)', 'Prof. Rajesh Kumar (IIT Delhi)'],
      outcomes: '45 projects showcased, 200+ certificates issued'
    },
    {
      id: 2,
      title: 'IoT Workshop Series',
      date: 'September 2023',
      attendees: 120,
      highlights: ['Hands-on Arduino', 'Smart home project', 'Industry mentors'],
      images: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'
      ],
      speakers: ['Engineers from Texas Instruments'],
      outcomes: '30 working prototypes built'
    },
    {
      id: 3,
      title: 'Women in Tech Summit',
      date: 'August 2023',
      attendees: 300,
      highlights: ['Panel discussion', 'Career guidance', 'Networking session'],
      images: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800'
      ],
      speakers: ['Industry leaders from Microsoft, Amazon, Flipkart'],
      outcomes: 'Inspired 100+ women to pursue tech careers'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white px-6 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Past Events Gallery
        </h2>
        <p className="text-gray-400 mt-3">
          Preserving our legacy, one event at a time 📸
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pastEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl cursor-pointer"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="relative">
              <img
                src={event.images[0]}
                alt={event.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-300">{event.date}</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{event.attendees}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} />
                  <span>{event.highlights.length}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {event.highlights.slice(0, 2).map((hl, i) => (
                  <span
                    key={i}
                    className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs"
                  >
                    {hl}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-500/30"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{selectedEvent.title}</h2>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {selectedEvent.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt=""
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>

              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="text-purple-400" size={20} />
                  <span>{selectedEvent.date} • {selectedEvent.attendees} attendees</span>
                </div>

                <div>
                  <h3 className="font-bold mb-2 text-white">✨ Highlights</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedEvent.highlights.map((hl, idx) => (
                      <li key={idx}>{hl}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-2 text-white">🎤 Speakers</h3>
                  <p>{selectedEvent.speakers.join(', ')}</p>
                </div>

                <div>
                  <h3 className="font-bold mb-2 text-white">🏆 Outcomes</h3>
                  <p>{selectedEvent.outcomes}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
