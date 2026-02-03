import { useState } from "react"
import { motion } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GoldConstellationBackground } from "@/components/background/gold-constellation-background"
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from "react-icons/fa6"
import { Loader2, Terminal, Send } from "lucide-react"

export function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío para efecto visual
    setTimeout(() => {
      const subject = encodeURIComponent(`Contacto desde portafolio — ${name || "Nuevo lead"}`)
      const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)
      window.location.href = `mailto:pabloazuara800@gmail.com?subject=${subject}&body=${body}`
      setIsSubmitting(false)
    }, 800)
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/pablo-azuara-53b295163/",
      color: "#0A66C2"
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/Alejandro-Az",
      color: "#ffffff"
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: "mailto:pabloazuara800@gmail.com",
      color: "#F59E0B"
    }
  ]

  return (
    <Section id="contact" className="relative overflow-hidden">
      {/* Background Effect */}
      <GoldConstellationBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-4 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Hiring Open
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Iniciemos la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              conversación
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
            ¿Tienes una gran idea? Vamos a construirla.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Column: Social Nodes */}
          <div className="space-y-8">
            <div className="p-8 rounded-[32px] border border-white/10 bg-zinc-900/40 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Contenido con Z-Index corregido para permitir clics */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Terminal size={24} className="text-amber-400" />
                  Canales de Transmisión
                </h3>

                <div className="grid gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group/link"
                      whileHover="hover"
                      initial="initial"
                    >
                      {/* Interaction Content */}
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-black/40 text-white group-hover/link:scale-110 transition-transform duration-300">
                            <link.icon size={20} style={{ color: link.color }} />
                          </div>
                          <span className="text-zinc-300 font-medium group-hover/link:text-white transition-colors">
                            {link.name}
                          </span>
                        </div>
                        <Send size={16} className="text-zinc-600 group-hover/link:text-amber-400 -translate-x-2 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-300" />
                      </div>

                      {/* SHINE + STAR ANIMATION */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        variants={{
                          initial: { x: "-100%" },
                          hover: { x: "100%" }
                        }}
                        transition={{ duration: 0.5, ease: "linear" }}
                      >
                        {/* Barra de brillo */}
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />

                        {/* Estrella Brillante */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                          </svg>
                        </div>
                      </motion.div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info / Quote */}
            <div className="p-6 rounded-2xl border-l-4 border-amber-500 bg-zinc-900/50 backdrop-blur-sm">
              <p className="text-zinc-400 italic">
                "La tecnología es mejor cuando une a las personas."
              </p>
            </div>
          </div>

          {/* Right Column: Holographic Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow Effect behind form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-purple-600/20 rounded-[32px] blur-2xl opacity-50 pointer-events-none" />

            <form onSubmit={submit} className="relative rounded-[32px] border border-white/10 bg-zinc-950/70 backdrop-blur-xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-indigo-100/80 ml-1">Aquí va tu nombre:</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="J. Doe"
                    className="bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20 h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-indigo-100/80 ml-1">Aquí tu correo electrónico:</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@ejemplo.com"
                    className="bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20 h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-indigo-100/80 ml-1">Aquí va tu Mensaje:</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe tu visión..."
                    className="min-h-[150px] bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:ring-amber-500/20 rounded-xl resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold text-lg shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-2">
                      Enviar mensaje <FaPaperPlane />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </Section>
  )
}
