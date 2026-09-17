import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { specs } from '../data'
import { BlurWords, Reveal } from '../fx'

export function Specs() {
  const [open, setOpen] = useState<string | null>('01')
  return (
    <section id="specs" className="specs section-pad">
      <div className="section-head">
        <Reveal>
          <p className="eyebrow"><span className="eyebrow-rule" />06 — THE FINE PRINT</p>
          <h2><BlurWords text="Trust, made" /> <em><BlurWords text="legible." base={180} /></em></h2>
        </Reveal>
        <Reveal delay={140} className="section-intro-wrap">
          <p className="section-intro">
            The Multiverse funds its own growth. Every split, edition rule, and guardrail is written down here —
            and on-chain — so nobody has to take our word for it.
          </p>
        </Reveal>
      </div>

      <div className="spec-list">
        {specs.map((s, i) => {
          const isOpen = open === s.n
          return (
            <Reveal key={s.n} delay={i * 60}>
              <div className={isOpen ? 'spec-row open' : 'spec-row'}>
                <button
                  className="spec-toggle"
                  onClick={() => setOpen(isOpen ? null : s.n)}
                  aria-expanded={isOpen}
                  aria-controls={`spec-${s.n}`}
                >
                  <span className="spec-n technical">{s.n}</span>
                  <strong>{s.title}</strong>
                  <span className="spec-tag technical">{s.tag}</span>
                  <span className={`spec-plus ${isOpen ? 'x' : ''}`} aria-hidden="true"><Plus size={16} /></span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`spec-${s.n}`} className="spec-body"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="spec-body-inner">
                        <p>{s.body}</p>
                        <div className="spec-cells">
                          {s.cells.map(([k, v]) => (
                            <div key={k} className="spec-cell">
                              <span className="technical dim">{k}</span>
                              <strong className="technical">{v}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
