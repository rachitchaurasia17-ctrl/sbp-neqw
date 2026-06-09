import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { askRachit, GREETING, type ChatMessage } from '../lib/rachitAI';

const SUGGESTIONS = [
  'Best 3 BHK under ₹1 Cr in Mohali?',
  'Show me ready-to-move homes',
  'Commercial options in Zirakpur',
  'Is it a good time to invest?',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading, open]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput('');
    const next = [...messages, { role: 'user' as const, content }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await askRachit(next);
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content:
            "I hit a snag reaching the server. Please try again in a moment — or call SBP directly at +91 93160 04242.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Launcher — !fixed so it overrides btn-gold's position:relative */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open SBP AI"
        className="!fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full pl-4 pr-5 py-3 shadow-2xl text-[var(--bg)] font-semibold tracking-wide"
        style={{
          background: 'linear-gradient(135deg, #e6c98c 0%, #c9a14a 100%)',
          boxShadow: '0 10px 40px rgba(201,161,74,0.45)',
        }}
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        <span className="text-sm">SBP AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="!fixed z-[95] bottom-20 right-4 left-4 sm:left-auto sm:right-5 sm:w-[400px] h-[70vh] sm:h-[560px] max-h-[640px] flex flex-col rounded-2xl overflow-hidden liquid-glass"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--line)] bg-[var(--bg-elev)]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(201,161,74,0.4)] bg-[rgba(201,161,74,0.12)]">
                <Sparkles className="w-5 h-5 text-[var(--gold-soft)]" />
              </div>
              <div className="flex-1">
                <div className="font-display text-xl leading-none text-[var(--ivory)]">SBP AI</div>
                <div className="text-[11px] text-[var(--muted)] mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  SBP Property &amp; Builder Advisor
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--ivory)] hover:bg-white/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-[var(--gold)] text-[var(--bg)] rounded-br-sm font-medium'
                        : 'bg-[var(--bg-elev)] border border-[var(--line)] text-[var(--ivory-dim)] rounded-bl-sm'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[var(--bg-elev)] border border-[var(--line)] rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-[var(--gold-soft)]"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestion chips (only before first user message) */}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs text-[var(--gold-soft)] border border-[rgba(201,161,74,0.3)] rounded-full px-3 py-1.5 hover:bg-[rgba(201,161,74,0.1)] transition-colors text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[var(--line)] p-3 bg-[var(--bg-elev)]">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  rows={1}
                  placeholder="Ask about budget, projects, loans…"
                  className="flex-1 resize-none bg-transparent text-sm text-[var(--ivory)] placeholder-[var(--muted)] outline-none max-h-24 py-2"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="w-10 h-10 shrink-0 rounded-full btn-gold flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[10px] text-[var(--muted)] text-center mt-2">
                SBP AI can make mistakes — confirm details on a site visit.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
