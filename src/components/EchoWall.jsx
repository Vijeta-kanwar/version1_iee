import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"
import { MessageSquare, ThumbsUp, Heart, Lightbulb, Send } from "lucide-react"
import { useStore } from "../store/useStore"

export default function EchoWall() {
  const { addEchoPost } = useStore()

  const [posts, setPosts] = useState([
    {
      id: 1,
      content:
        "The last workshop felt too basic. We need more advanced topics!",
      category: "feedback",
      reactions: { thumbsup: 12, heart: 5, lightbulb: 8 },
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      content:
        "Can we have more girl-only sessions? Would feel more comfortable.",
      category: "suggestion",
      reactions: { thumbsup: 23, heart: 15, lightbulb: 3 },
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      content: "The AI workshop was 🔥🔥🔥 More like this please!",
      category: "praise",
      reactions: { thumbsup: 45, heart: 32, lightbulb: 12 },
      timestamp: "1 day ago",
    },
  ])

  const [newPost, setNewPost] = useState("")

  const handlePost = () => {
    if (!newPost.trim()) return

    const post = {
      id: Date.now(),
      content: newPost,
      category: "general",
      reactions: { thumbsup: 0, heart: 0, lightbulb: 0 },
      timestamp: "Just now",
    }

    // ✅ functional update (correct React pattern)
    setPosts((prev) => [post, ...prev])

    setNewPost("")
    addEchoPost(post)
  }

  const handleReaction = (postId, reactionType) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [reactionType]: post.reactions[reactionType] + 1,
              },
            }
          : post
      )
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      feedback: "bg-blue-500/20 text-blue-400",
      suggestion: "bg-purple-500/20 text-purple-400",
      praise: "bg-green-500/20 text-green-400",
      general: "bg-gray-500/20 text-gray-400",
    }
    return colors[category] || colors.general
  }

  return (
    <div className="section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold gradient-text mb-2">
            Echo Wall
          </h2>
          <p className="text-gray-400">
            Your anonymous voice matters. Speak up! 🎤
          </p>
        </div>

        <motion.div
          className="glass-card mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts anonymously... (Be honest, be respectful)"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 min-h-[100px] resize-none"
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-400">
              ✨ Posted anonymously • AI will auto-categorize
            </span>

            <button
              onClick={handlePost}
              className="btn-primary flex items-center gap-2"
            >
              <Send size={18} />
              Post
            </button>
          </div>
        </motion.div>

        <div className="space-y-4">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              className="glass-card"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.timestamp}
                    </span>
                  </div>

                  <p className="text-white leading-relaxed mb-4">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-6">
                    <ReactionButton
                      icon={<ThumbsUp size={18} />}
                      count={post.reactions.thumbsup}
                      onClick={() =>
                        handleReaction(post.id, "thumbsup")
                      }
                    />
                    <ReactionButton
                      icon={<Heart size={18} />}
                      count={post.reactions.heart}
                      onClick={() =>
                        handleReaction(post.id, "heart")
                      }
                    />
                    <ReactionButton
                      icon={<Lightbulb size={18} />}
                      count={post.reactions.lightbulb}
                      onClick={() =>
                        handleReaction(post.id, "lightbulb")
                      }
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass-card mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-400" />
            Top Suggestions This Week
          </h3>

          <div className="space-y-2">
            {posts.slice(0, 3).map((post, idx) => (
              <div key={post.id} className="flex items-center gap-3 text-sm">
                <span className="text-purple-400 font-bold">
                  #{idx + 1}
                </span>
                <span className="text-gray-300">
                  {post.content.slice(0, 80)}...
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4">
            📊 Execs see these automatically every Monday
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function ReactionButton({ icon, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
    >
      {icon}
      <span className="text-sm font-semibold">{count}</span>
    </button>
  )
}
