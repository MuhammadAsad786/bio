'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

// Web3Forms access key is PUBLIC by design (it only routes mail to your verified inbox).
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'mt-1.5 min-h-[46px] w-full rounded-lg border border-border bg-bg-alt px-3.5 text-fluid-base text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-brand-text focus:ring-4 focus:ring-brand-text/10';

export function ContactForm() {
  useLocale(); // re-render on language switch
  const INQUIRY_TYPES = [
    t('form.inquiry.project'),
    t('form.inquiry.job'),
    t('form.inquiry.collab'),
    t('form.inquiry.other'),
  ];
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('submitting');
    setMessage('');

    const data = new FormData(form);
    data.append('access_key', ACCESS_KEY);
    data.append('subject', `${t('form.subjectPrefix')}${data.get('inquiry') ?? ''}`);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = (await res.json()) as { success: boolean; message?: string };
      if (json.success) {
        setStatus('success');
        setMessage(t('form.success'));
        form.reset();
      } else {
        setStatus('error');
        setMessage(`${t('form.errPrefix')}${json.message ?? t('form.errGeneric')}`);
      }
    } catch {
      setStatus('error');
      setMessage(`${t('form.errPrefix')}${t('form.errNetwork')}`);
    }
  }

  const disabled = status === 'submitting' || ACCESS_KEY === '';

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-lg sm:p-8"
    >
      {/* Honeypot — bots fill this; humans never see it */}
      <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

      <div className="mb-6">
        <h3 className="text-fluid-lg font-semibold text-text">{t('form.title')}</h3>
        <p className="mt-1 text-fluid-sm text-subtle">{t('form.subtitle')}</p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-fluid-sm font-medium text-subtle">{t('form.name')}</span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder={t('form.namePlaceholder')}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="text-fluid-sm font-medium text-subtle">{t('form.email')}</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={t('form.emailPlaceholder')}
              dir="ltr"
              className={inputClass}
            />
          </label>
        </div>

        <label className="block">
          <span className="text-fluid-sm font-medium text-subtle">{t('form.subject')}</span>
          <select name="inquiry" defaultValue={INQUIRY_TYPES[0]} className={inputClass}>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t} className="bg-surface text-text">
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-fluid-sm font-medium text-subtle">{t('form.message')}</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder={t('form.messagePlaceholder')}
            className={cn(inputClass, 'py-2.5')}
          />
        </label>

        <button
          type="submit"
          disabled={disabled}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 font-semibold text-bg transition-colors hover:bg-primary-hover active:bg-primary-press disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" /> {t('form.sending')}
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" /> {t('form.send')}
            </>
          )}
        </button>

        {/* Always-mounted live region; reserves height to avoid layout shift */}
        <p
          aria-live="polite"
          className={cn(
            'flex min-h-[1.5rem] items-start gap-2 text-fluid-sm',
            status === 'success' && 'text-success',
            status === 'error' && 'text-danger',
          )}
        >
          {status === 'success' && (
            <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 flex-none" />
          )}
          {status === 'error' && (
            <AlertCircle size={18} aria-hidden="true" className="mt-0.5 flex-none" />
          )}
          {message}
        </p>
      </div>
    </form>
  );
}
