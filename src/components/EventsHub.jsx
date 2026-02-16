import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react'

export default function EventsHub() {
  const events = EVENTS_DATA
  const [filter, setFilter] = useState('all')

  const EVENTS_DATA = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      description: 'Hands-on workshop with Microsoft Azure ML',
      date: '2024-02-20',
      time: '10:00 AM - 4:00 PM',
      venue: 'Seminar Hall A',
      category: 'workshop',
      registrationLink: 'https://forms.gle/example1',
      rsvpCount: 47,
      status: 'upcoming',
      image:
        'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800'
    },
    {
      id: 2,
      title: 'Web3 Hackathon 2024',
      description:
        '36-hour blockchain hackathon with prizes worth ₹50k',
      date: '2024-02-25',
      time: '9:00 AM',
      venue: 'Campus Wide',
      category: 'hackathon',
      registrationLink: 'https://forms.gle/example2',
      rsvpCount: 32,
      status: 'upcoming',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800'
    },
    {
      id: 3,
      title: 'Guest Lecture: IoT in Healthcare',
      description:
        'Industry expert from Philips Healthcare',
      date: '2024-03-01',
      time: '2:00 PM - 4:00 PM',
      venue: 'Auditorium',
      category: 'seminar',
      registrationLink: 'https://forms.gle/example3',
      rsvpCount: 28,
      status: 'upcoming',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
    },
    {
      id: 4,
      title: 'IEEE Day Celebration',
      date: '2024-02-10',
      venue: 'Main Campus',
      category: 'celebration',
      rsvpCount: 120,
      status: 'completed',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    }
  ]


  const filteredEvents =
    filter === 'all'
      ? events
      : events.filter((e) => e.category === filter)

  const categories = [
    'all',
    'workshop',
    'hackathon',
    'seminar',
    'celebration'
  ]

  return (
    <div className="section">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-2">
          Events Hub
        </h2>
        <p className="text-gray-400">
          Real-time updates • Seamless registration
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full transition-all ${
              filter === cat
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            className="glass-card overflow-hidden group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-110"
              />

              <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full text-xs">
                {event.status === 'upcoming'
                  ? '🔴 Live'
                  : '✅ Completed'}
              </div>
            </div>

            <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs mb-3">
              {event.category}
            </span>

            <h3 className="text-xl font-bold mb-2">
              {event.title}
            </h3>

            {event.description && (
              <p className="text-gray-400 text-sm mb-4">
                {event.description}
              </p>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={16} />
                <span>
                  {event.date}
                  {event.time && ` • ${event.time}`}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} />
                <span>{event.venue}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users size={16} />
                <span>{event.rsvpCount} registered</span>
              </div>
            </div>

            {event.registrationLink &&
              event.status === 'upcoming' && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Register Now
                  <ExternalLink size={16} />
                </a>
              )}

            {event.status === 'completed' && (
              <button className="w-full bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-gray-400">
                View Highlights
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
