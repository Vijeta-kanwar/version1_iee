import { motion } from "framer-motion"
import { Award, BookOpen, Users, Zap, CheckCircle, ExternalLink } from "lucide-react"

export default function MembershipSection() {
  const benefits = [
    {
      icon: <BookOpen />,
      title: "Access to IEEE Xplore",
      desc: "5+ million technical documents and research papers",
    },
    {
      icon: <Users />,
      title: "Global Network",
      desc: "Connect with 400,000+ members in 160+ countries",
    },
    {
      icon: <Award />,
      title: "Career Resources",
      desc: "Job board, resume reviews, interview prep",
    },
    {
      icon: <Zap />,
      title: "Exclusive Discounts",
      desc: "Conferences, publications, online courses",
    },
  ]

  const steps = [
    {
      number: 1,
      title: "Visit IEEE Website",
      desc: "Go to ieee.org/membership",
      action: "https://www.ieee.org/membership",
    },
    {
      number: 2,
      title: "Choose Student Membership",
      desc: "Special rates for students (₹2000/year)",
      action: null,
    },
    {
      number: 3,
      title: "Complete Profile",
      desc: "Fill in your academic details",
      action: null,
    },
    {
      number: 4,
      title: "Get Your Member ID",
      desc: "Access benefits immediately",
      action: null,
    },
  ]

  return (
    <div className="section">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-2">
          IEEE Membership
        </h2>
        <p className="text-gray-400">
          Unlock endless opportunities for growth 🚀
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {benefits.map((benefit, idx) => (
          <motion.div
            key={idx}
            className="glass-card text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
              {benefit.icon}
            </div>
            <h3 className="font-bold mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-400">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            name: "Student Member",
            price: "₹2,000/year",
            features: ["IEEE Xplore", "Career resources", "Discounts"],
          },
          {
            name: "Graduate Student",
            price: "₹3,500/year",
            features: [
              "Everything in Student",
              "Job board access",
              "Networking events",
            ],
          },
          {
            name: "Professional",
            price: "₹10,000/year",
            features: [
              "Full benefits",
              "Leadership opportunities",
              "Premium resources",
            ],
          },
        ].map((tier, idx) => (
          <motion.div
            key={idx}
            className={`glass-card ${
              idx === 1 ? "border-2 border-purple-500" : ""
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            {idx === 1 && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <div className="text-3xl font-black gradient-text mb-6">
              {tier.price}
            </div>

            <div className="space-y-3">
              {tier.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={18} />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Steps */}
      <div className="glass-card">
        <h3 className="text-2xl font-bold mb-8 text-center">How to Join</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>

              <h4 className="font-bold mb-2">{step.title}</h4>
              <p className="text-sm text-gray-400 mb-4">{step.desc}</p>

              {step.action && (
                <a
                  href={step.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 text-sm flex items-center justify-center gap-1 hover:underline"
                >
                  Visit <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="glass-card mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
        <p className="text-gray-400 mb-6">
          Become part of the world's largest technical professional organization
        </p>

        <a
          href="https://www.ieee.org/membership"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          Start Your Application
          <ExternalLink size={18} />
        </a>
      </motion.div>
    </div>
  )
}
