// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Users, Star, CheckCircle, ExternalLink } from 'lucide-react'

export default function RecruitmentCenter() {
  const positions = [
    {
      role: 'Core Team Member',
      department: 'Technical',
      openings: 5,
      eligibility: '2nd/3rd year, CGPA > 7.5',
      formLink: 'https://forms.gle/core-team',
      icon: '🎯',
      color: 'from-purple-500 to-pink-500'
    },
    {
      role: 'Associate',
      department: 'Events & Marketing',
      openings: 10,
      eligibility: '1st/2nd year, Passionate about events',
      formLink: 'https://forms.gle/associate',
      icon: '✨',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      role: 'Coordinator',
      department: 'Technical Writing',
      openings: 3,
      eligibility: '2nd/3rd year, Strong communication skills',
      formLink: 'https://forms.gle/coordinator',
      icon: '📝',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const process = [
    { step: 1, title: 'Fill Application Form', desc: 'Submit your details and portfolio' },
    { step: 2, title: 'Resume Screening', desc: 'Review by core team (2-3 days)' },
    { step: 3, title: 'Interview Round', desc: 'Technical + HR discussion' },
    { step: 4, title: 'Final Selection', desc: 'Results announced within a week' }
  ]

  return (
    <div className="section">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-2">Join Our Team</h2>
        <p className="text-gray-400">Be part of something amazing 🚀</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {positions.map((pos, idx) => (
          <motion.div
            key={idx}
            className="glass-card relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${pos.color}`} />
            
            <div className="text-4xl mb-4">{pos.icon}</div>
            
            <h3 className="text-2xl font-bold mb-2">{pos.role}</h3>
            <p className="text-purple-400 text-sm mb-4">{pos.department}</p>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-gray-400" />
                <span>{pos.openings} openings</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="text-gray-400 mt-1" />
                <span className="text-gray-400">{pos.eligibility}</span>
              </div>
            </div>

            <a  
              href={pos.formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Apply Now
              <ExternalLink size={16} />
            </a>
          </motion.div>
        ))}
      </div>

      <div className="glass-card">
        <h3 className="text-2xl font-bold mb-8 text-center">Selection Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {process.map((item, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="glass-card mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Star className="text-yellow-400" />
          Why Join IEEE IGDTUW?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Work on real-world technical projects',
            'Network with industry professionals',
            'Gain leadership & management experience',
            'Access to exclusive workshops & resources',
            'Certificate of participation & recognition',
            'Build your portfolio & resume'
          ].map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}