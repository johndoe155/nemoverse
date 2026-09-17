import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { MagneticButton } from '@/components/ui/MagneticButton'
import './sections.css'

interface Msg {
  role: 'persona' | 'user'
  text: string
}

const SEED: Msg[] = [
  {
    role: 'persona',
    text: 'You’re early. The next seam in the Multiverse hasn’t opened yet — but I can smell the gold in the fracture. Ask me about a universe, or what it feels like to be twelve of me at once.',
  },
]

const REPLIES: Record<string, string> = {
  default:
    'In every timeline I’m still the anchor. Some of me tend glass orchards. Some host mirrors. All of me are waiting for you to pull the next number.',
  '001':
    'Void Orchard — dusk inverted gravity. I harvest black glass fruit under dead stars. Each bite is a memory someone else forgot.',
  '008':
    'Null Garden is quiet on purpose. I plant absences. Collectors hear different songs in the holes. You might not be ready.',
  drop: 'Bloom Protocol is next. Flowers that execute only when a promise is kept on-chain. Holders see it first. Always.',
  hold: 'Holding isn’t fandom. It’s a key. First access, quieter rooms, brighter sigils. Connect and I’ll know you.',
}

function replyFor(input: string): string {
  const t = input.toLowerCase()
  if (t.includes('001') || t.includes('orchard') || t.includes('void')) return REPLIES['001']
  if (t.includes('008') || t.includes('null') || t.includes('secret')) return REPLIES['008']
  if (t.includes('drop') || t.includes('next') || t.includes('bloom') || t.includes('upcoming'))
    return REPLIES.drop
  if (t.includes('hold') || t.includes('wallet') || t.includes('nft') || t.includes('access'))
    return REPLIES.hold
  return REPLIES.default
}

export function VoiceSection() {
  const [messages, setMessages] = useState<Msg[]>(SEED)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const setCursorState = useAppStore((s) => s.setCursorState)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (e?: FormEvent) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text || typing) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text }])
    setTyping(true)
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'persona', text: replyFor(text) }])
      setTyping(false)
    }, 900 + Math.random() * 700)
  }

  return (
    <section id="voice" data-section="voice" className="section voice-section">
      <div className="section-inner">
        <header className="section-header">
          <p className="eyebrow">Pillar · Voice</p>
          <h2>The OC speaks between drops.</h2>
          <p>
            An in-character presence that teases universes, banters across timelines, and keeps the
            Multiverse alive when you’re offline. Guardrailed. On-brand. Always teasing what’s next.
          </p>
        </header>

        <div className="voice-layout">
          <div className="voice-presence">
            <div className="voice-orb" aria-hidden />
            <h3>Nemo</h3>
            <p>The Anchor Between Worlds — public chat, Multiverse-aware.</p>
            <MagneticButton
              variant="outline"
              size="sm"
              onClick={() =>
                setMessages((m) => [
                  ...m,
                  {
                    role: 'persona',
                    text: 'Something is blooming behind the veil. Universe #011 prefers promises kept in public. Holders already feel the draft.',
                  },
                ])
              }
            >
              Request teaser
            </MagneticButton>
          </div>

          <div className="chat-panel glass-panel">
            <div className="chat-header">
              <span className="badge badge-accent">
                <span className="badge-dot" /> Live persona
              </span>
              <span className="eyebrow" style={{ margin: 0 }}>
                Hub embed · MVP
              </span>
            </div>

            <div className="chat-messages" data-lenis-prevent>
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.role}`}>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="chat-bubble persona" style={{ opacity: 0.6 }}>
                  ···
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form className="chat-input-row" onSubmit={send}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a universe, a drop, a hold…"
                onFocus={() => setCursorState('hidden')}
                onBlur={() => setCursorState('default')}
                aria-label="Message Nemo"
              />
              <MagneticButton type="submit" size="sm" magnetic={false}>
                Send
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
