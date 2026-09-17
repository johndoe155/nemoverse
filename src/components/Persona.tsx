import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle, PenLine, Send, ShieldCheck, X } from 'lucide-react'
import { draftTweets, personaReply, teasers } from '../data'
import { BlurWords, Reveal } from '../fx'
import { PersonaCanvas } from '../scenes'
import { useApp } from '../state'

type Msg = { from: 'nemo' | 'you'; text: string }

export function Persona() {
  const { chatOpen, setChatOpen, reducedMotion } = useApp()
  const [tab, setTab] = useState<'chat' | 'draft'>('chat')
  const [speaking, setSpeaking] = useState(false)

  return (
    <section id="persona" className="persona section-pad">
      <div className="persona-stage">
        <div className="persona-canvas-wrap" aria-hidden="true">
          <PersonaCanvas speaking={speaking || chatOpen} reduced={reducedMotion} />
          <img className="persona-bust" src="/art/persona-loop.jpg" alt="" />
          <span className="p-coord technical">SIGNAL 43.117 / −72.004</span>
          <span className={`p-state technical ${speaking || chatOpen ? 'live' : ''}`}>
            <i />{speaking ? 'SPEAKING' : chatOpen ? 'LISTENING' : 'IDLE — DREAMING OF #005'}
          </span>
        </div>

        <div className="persona-copy">
          <Reveal>
            <p className="eyebrow blue"><span className="eyebrow-rule" />05 — THE AI PERSONA</p>
            <h2><BlurWords text="Ask NEMO" /><br /><em><BlurWords text="what comes next." base={180} /></em></h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-intro">
              A voice built on the Claude API that remembers every universe, teases every drop before it lands,
              and stays awake when you're not. In character, always — on this Hub, on X, and in the community's Discord.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="persona-actions">
              <button className="button button-blue" onClick={() => { setTab('chat'); setChatOpen(true) }}>
                <MessageCircle size={14} /> Talk to NEMO
              </button>
              <button className="button button-ghost" onClick={() => { setTab('draft'); setChatOpen(true) }}>
                <PenLine size={14} /> Draft room <span className="technical dim">PRIVATE</span>
              </button>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="guardrail technical">
              <ShieldCheck size={13} />
              <span>GUARDRAILS — IN CHARACTER · NO FINANCIAL ADVICE · NO AUTO-POSTING · NO MEMORY OF YOU · RATE-LIMITED</span>
            </div>
          </Reveal>
        </div>

        <aside className="teaser-column" aria-label="Recent teasers">
          <span className="technical dim">TRANSMISSIONS — X / @NEMO</span>
          {teasers.map((t, i) => (
            <Reveal key={t.date} delay={i * 90}>
              <blockquote className="teaser">
                <span className="technical dim">{t.date}</span>
                <p>“{t.text}”</p>
              </blockquote>
            </Reveal>
          ))}
          <span className="technical dim teaser-foot">ALSO LIVE AS A DISCORD / TELEGRAM BOT FOR THE INNER CIRCLE</span>
        </aside>
      </div>

      <div className="persona-ticker" aria-hidden="true">
        <div className="ticker-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>THE SIGNAL IS NEVER SILENT — UNIVERSE #005 · SEPT 20 —&nbsp;</span>
          ))}
        </div>
      </div>

      <ChatPanel tab={tab} setTab={setTab} onSpeaking={setSpeaking} />
    </section>
  )
}

function ChatPanel({ tab, setTab, onSpeaking }: { tab: 'chat' | 'draft'; setTab: (t: 'chat' | 'draft') => void; onSpeaking: (v: boolean) => void }) {
  const { chatOpen, setChatOpen } = useApp()
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'nemo', text: 'You found the frequency. I\u2019m the version of NEMO that answers questions — ask me about any universe, the artists, or what holding the original unlocks.' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [topic, setTopic] = useState('')
  const [drafts, setDrafts] = useState<string[] | null>(null)
  const [drafting, setDrafting] = useState(false)
  const [approved, setApproved] = useState<number | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing, drafts])

  useEffect(() => {
    if (!chatOpen) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setChatOpen(false) }
    addEventListener('keydown', fn)
    return () => removeEventListener('keydown', fn)
  }, [chatOpen, setChatOpen])

  const send = () => {
    const text = input.trim()
    if (!text || typing) return
    setMsgs(m => [...m, { from: 'you', text }])
    setInput('')
    setTyping(true)
    onSpeaking(false)
    setTimeout(() => {
      setMsgs(m => [...m, { from: 'nemo', text: personaReply(text) }])
      setTyping(false)
      onSpeaking(true)
      setTimeout(() => onSpeaking(false), 2600)
    }, 1100 + Math.random() * 600)
  }

  const runDraft = () => {
    if (!topic.trim() || drafting) return
    setDrafting(true)
    setDrafts(null)
    setApproved(null)
    setTimeout(() => { setDrafts(draftTweets(topic)); setDrafting(false) }, 1200)
  }

  return (
    <AnimatePresence>
      {chatOpen && (
        <motion.div
          className="chat-panel" role="dialog" aria-label="NEMO persona panel"
          initial={{ y: 40, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 30, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="chat-head">
            <div className="chat-id">
              <span className="chat-avatar" aria-hidden="true"><img src="/art/persona-loop.jpg" alt="" /><i /></span>
              <div>
                <strong>NEMO — persona</strong>
                <span className="technical dim">{tab === 'chat' ? 'PUBLIC · IN CHARACTER · NO MEMORY' : 'PRIVATE · DRAFTS FOR YOUR REVIEW'}</span>
              </div>
            </div>
            <div className="chat-tabs" role="tablist">
              <button role="tab" aria-selected={tab === 'chat'} className={tab === 'chat' ? 'active' : ''} onClick={() => setTab('chat')}>Chat</button>
              <button role="tab" aria-selected={tab === 'draft'} className={tab === 'draft' ? 'active' : ''} onClick={() => setTab('draft')}>Draft room</button>
            </div>
            <button className="close-button static" onClick={() => setChatOpen(false)} aria-label="Close persona panel"><X size={16} /></button>
          </div>

          {tab === 'chat' ? (
            <>
              <div className="chat-body" ref={bodyRef}>
                {msgs.map((m, i) => (
                  <motion.div
                    key={i} className={`bubble ${m.from}`}
                    initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.4 }}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {typing && <div className="bubble nemo typing" aria-label="NEMO is typing"><i /><i /><i /></div>}
              </div>
              <div className="chat-input">
                <input
                  value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Ask about Universe #004…" aria-label="Message NEMO"
                />
                <button onClick={send} aria-label="Send message" disabled={!input.trim() || typing}><Send size={15} /></button>
              </div>
            </>
          ) : (
            <div className="draft-room" ref={bodyRef}>
              <p className="draft-hint">Give the persona a topic — it returns three in-voice drafts. Nothing posts without your approval.</p>
              <div className="chat-input inset">
                <input
                  value={topic} onChange={e => setTopic(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && runDraft()}
                  placeholder="e.g. the Mirror Drift drop on Sept 20" aria-label="Draft topic"
                />
                <button onClick={runDraft} aria-label="Generate drafts" disabled={!topic.trim() || drafting}><PenLine size={15} /></button>
              </div>
              {drafting && <div className="bubble nemo typing"><i /><i /><i /></div>}
              {drafts?.map((d, i) => (
                <motion.div key={i} className={`draft-card ${approved === i ? 'approved' : ''}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}>
                  <span className="technical dim">DRAFT {String(i + 1).padStart(2, '0')} · {280 - d.length} CHARS LEFT</span>
                  <p>{d}</p>
                  <div className="draft-actions">
                    {approved === i ? (
                      <span className="technical gold">✦ APPROVED — READY TO POST FROM @NEMO</span>
                    ) : (
                      <button className="text-link small" onClick={() => setApproved(i)}>Approve for posting <ArrowUpRight size={12} /></button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="chat-foot technical">CLAUDE API · CUSTOM SYSTEM PROMPT · RATE-LIMITED · GUARDRAILED</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
