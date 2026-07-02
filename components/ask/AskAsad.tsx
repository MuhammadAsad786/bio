'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { X, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { cn } from '@/lib/cn';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';
import {
  getAskNodes,
  getAskCategories,
  getAskGreeting,
  getAskConfig,
  askIntroNodes,
  type AskNode,
} from '@/data/ask-asad';

// "Ask Asad" — a fully LOCAL, no-AI assistant. Visitors tap pre-written questions and the
// bot replies from authored, portfolio-grounded copy (data/ask-asad.ts), styled to feel like
// a professional assistant (avatar, typing dots, streamed bubbles). It doubles as a lead
// funnel: the "Work with Asad" path confirms availability and, once the visitor says they
// want to collaborate, reveals the contact card. No network, no API key, no config.

type Role = 'bot' | 'user';
type Msg = { id: string; role: Role; text?: string; kind?: 'contact' };
type Chip = { kind: 'q' | 'cat' | 'act'; id: string; label: string };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function AskAsad() {
  // Subscribe to the language; all script content is derived for the current locale and re-seeded
  // on switch (see the effect below). Bubble-tail corner flips with the reading direction.
  const { locale, dir } = useLocale();
  const askConfig = getAskConfig();
  const askGreeting = useMemo(() => getAskGreeting(), [locale]);
  const askCategories = useMemo(() => getAskCategories(), [locale]);
  const USER_TAIL = dir === 'rtl' ? 'rounded-bl-sm' : 'rounded-br-sm';
  const BOT_TAIL = dir === 'rtl' ? 'rounded-br-sm' : 'rounded-bl-sm';

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [typing, setTyping] = useState(false);

  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const mountedRef = useRef(true);
  const runRef = useRef(0); // cancels a pending typing sequence if a newer one starts/unmounts
  const idRef = useRef(0);
  const uid = () => `m${++idRef.current}`;

  const nodeMap = useMemo(() => new Map(getAskNodes().map((n) => [n.id, n])), [locale]);

  const append = useCallback((m: Msg) => setMessages((prev) => [...prev, m]), []);

  // Chips to offer after a node's answer: its follow-ups + persistent anchors.
  const chipsFor = useCallback(
    (node: AskNode): Chip[] => {
      if (node.reveal) {
        return [
          { kind: 'act', id: 'menu', label: t('ask.browseTopics') },
          { kind: 'act', id: 'restart', label: t('ask.startOver') },
        ];
      }
      const follow: Chip[] = (node.follow ?? [])
        .map((id) => nodeMap.get(id))
        .filter((n): n is AskNode => Boolean(n))
        .map((n) => ({ kind: 'q' as const, id: n.id, label: n.q }));
      const anchors: Chip[] = [{ kind: 'act', id: 'menu', label: t('ask.browseTopics') }];
      if (node.id !== 'available') anchors.push({ kind: 'act', id: 'work', label: t('ask.workWith') });
      return [...follow, ...anchors];
    },
    [nodeMap],
  );

  // Greeting + first chips (also used by "Start over").
  const seed = useCallback(() => {
    runRef.current++;
    setTyping(false);
    setMessages(askGreeting.map((t) => ({ id: uid(), role: 'bot', text: t })));
    setChips(
      askIntroNodes
        .map((id) => nodeMap.get(id))
        .filter((n): n is AskNode => Boolean(n))
        .map((n) => ({ kind: 'q' as const, id: n.id, label: n.q })),
    );
  }, [nodeMap, askGreeting]);

  // Answer a question: echo it, "type", then reveal the bot bubbles (and contact card).
  const answer = useCallback(
    async (node: AskNode) => {
      const token = ++runRef.current;
      append({ id: uid(), role: 'user', text: node.q });
      setChips([]); // no chips while typing → no double-taps
      for (let i = 0; i < node.a.length; i++) {
        setTyping(true);
        await sleep(i === 0 ? 480 : 640);
        if (!mountedRef.current || runRef.current !== token) return;
        setTyping(false);
        append({ id: uid(), role: 'bot', text: node.a[i] });
      }
      if (node.reveal) {
        setTyping(true);
        await sleep(480);
        if (!mountedRef.current || runRef.current !== token) return;
        setTyping(false);
        append({ id: uid(), role: 'bot', kind: 'contact' });
      }
      setChips(chipsFor(node));
    },
    [append, chipsFor],
  );

  const showMenu = useCallback(() => {
    runRef.current++;
    setTyping(false);
    append({ id: uid(), role: 'bot', text: t('ask.menuPrompt') });
    setChips(askCategories.map((c) => ({ kind: 'cat' as const, id: c.id, label: c.label })));
  }, [append, askCategories]);

  const selectCategory = useCallback(
    (catId: string) => {
      const cat = askCategories.find((c) => c.id === catId);
      if (!cat) return;
      runRef.current++;
      setTyping(false);
      append({ id: uid(), role: 'bot', text: cat.intro });
      const items: Chip[] = cat.nodes
        .map((id) => nodeMap.get(id))
        .filter((n): n is AskNode => Boolean(n))
        .map((n) => ({ kind: 'q' as const, id: n.id, label: n.q }));
      setChips([...items, { kind: 'act', id: 'menu', label: t('ask.topics') }]);
    },
    [append, nodeMap, askCategories],
  );

  const openPanel = useCallback(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setOpen(false);
    restoreFocusRef.current?.focus?.();
  }, []);

  const goContact = useCallback(() => {
    closePanel();
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, [closePanel]);

  const dispatchChip = useCallback(
    (chip: Chip) => {
      if (chip.kind === 'q') {
        const n = nodeMap.get(chip.id);
        if (n) void answer(n);
      } else if (chip.kind === 'cat') {
        selectCategory(chip.id);
      } else if (chip.id === 'menu') {
        showMenu();
      } else if (chip.id === 'work') {
        const n = nodeMap.get('available');
        if (n) void answer(n);
      } else if (chip.id === 'restart') {
        seed();
      }
    },
    [nodeMap, answer, selectCategory, showMenu, seed],
  );

  // Track mount for async safety.
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Seed on mount AND whenever the language switches — resets the chat to the greeting in the new
  // language so the chips and answers match the active locale.
  useEffect(() => {
    seed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  // Keep the transcript pinned to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, chips]);

  // On open: focus into the dialog + lock background scroll.
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 80);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Escape closes; Tab is trapped within the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePanel();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (f.length === 0) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, closePanel]);

  return (
    <>
      {/* Floating launcher — hidden while the panel is open (the panel owns its own close). */}
      <button
        type="button"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="ask-asad-panel"
        aria-label={t('ask.launcherAria', { name: askConfig.name })}
        data-cursor={t('cursor.ask')}
        style={{
          insetInlineEnd: 'max(env(safe-area-inset-right), 1.25rem)',
          bottom: 'max(env(safe-area-inset-bottom), 1.25rem)',
        }}
        className={cn(
          'fixed z-40 inline-flex items-center gap-2 rounded-pill bg-primary py-3 ps-4 pe-5 text-bg shadow-lg transition-[opacity,transform,background-color] duration-200 hover:bg-primary-hover',
          open && 'pointer-events-none scale-90 opacity-0',
        )}
      >
        <Image
          src={asset('/images/profile/asad.jpg')}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
          aria-hidden="true"
        />
        <span className="text-fluid-sm font-medium">{askConfig.name}</span>
      </button>

      {/* Scrim */}
      <div
        aria-hidden="true"
        onClick={closePanel}
        className={cn(
          'fixed inset-0 z-[70] bg-black/50 transition-opacity duration-200',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Dialog: a corner card on desktop, a near-full sheet on mobile. */}
      <div
        id="ask-asad-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('ask.dialogAria', { name: askConfig.name })}
        inert={!open}
        style={{ bottom: 'max(env(safe-area-inset-bottom), 1rem)' }}
        className={cn(
          'fixed inset-x-3 top-16 z-[70] flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-lg',
          'transition-[opacity,transform] duration-200 ease-out will-change-transform',
          'sm:inset-x-auto sm:top-auto sm:end-6 sm:h-[600px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px] sm:max-w-[calc(100vw-2rem)]',
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        )}
      >
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Image
            src={asset('/images/profile/asad.jpg')}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 flex-none rounded-full object-cover"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <p className="font-display text-fluid-base font-semibold leading-tight text-text">
              {askConfig.name}
            </p>
            <p className="flex items-center gap-1.5 text-fluid-sm text-muted">
              <span className="h-2 w-2 flex-none rounded-pill bg-success" aria-hidden="true" />
              {askConfig.status}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closePanel}
            aria-label={t('ask.close')}
            data-cursor={t('cursor.close')}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-pill border border-border text-text transition-colors hover:border-brand-text hover:text-brand-text"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        {/* Transcript */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.map((m) =>
            m.kind === 'contact' ? (
              <div key={m.id} className="ask-msg-in flex justify-start">
                <div className={cn('max-w-[90%] rounded-lg border border-border bg-surface-2 p-3.5', BOT_TAIL)}>
                  <p className="text-fluid-sm text-text" dir="auto">
                    {askConfig.contactLead}
                  </p>
                  <a
                    href={`mailto:${askConfig.email}?subject=Project%20inquiry`}
                    className="mt-2.5 inline-flex items-center gap-1.5 break-all text-fluid-sm font-medium text-brand-text transition-colors hover:text-brand-strong"
                  >
                    <Mail size={15} aria-hidden="true" />
                    <bdi>{askConfig.email}</bdi>
                  </a>
                  <button
                    type="button"
                    onClick={goContact}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-pill bg-primary px-4 py-2 text-fluid-sm font-medium text-bg transition-colors hover:bg-primary-hover"
                  >
                    {t('ask.sendRequirements')}
                    <ArrowRight size={15} aria-hidden="true" className="rtl-flip" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={m.id}
                className={cn('ask-msg-in flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <p
                  dir="auto"
                  className={cn(
                    'max-w-[85%] whitespace-pre-wrap break-words rounded-lg px-3.5 py-2 text-fluid-sm',
                    m.role === 'user'
                      ? `${USER_TAIL} bg-primary text-bg`
                      : `${BOT_TAIL} bg-surface-2 text-text`,
                  )}
                >
                  {m.text}
                </p>
              </div>
            ),
          )}

          {typing && (
            <div className="ask-msg-in flex justify-start" aria-hidden="true">
              <div className={cn('flex items-center gap-1 rounded-lg bg-surface-2 px-3.5 py-3', BOT_TAIL)}>
                <span className="ask-dot" />
                <span className="ask-dot" />
                <span className="ask-dot" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions (the only input — no free text, by design) */}
        {chips.length > 0 && (
          <div className="max-h-[42%] flex-none overflow-y-auto border-t border-border bg-bg-alt px-3 py-3">
            <div className="flex flex-wrap gap-2">
              {chips.map((c, i) => (
                <button
                  key={`${c.kind}-${c.id}-${i}`}
                  type="button"
                  onClick={() => dispatchChip(c)}
                  className="ask-msg-in rounded-pill border border-border bg-surface px-3 py-1.5 text-start text-fluid-sm text-text transition-colors hover:border-brand-text hover:text-brand-text"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
