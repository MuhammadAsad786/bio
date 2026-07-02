'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { t } from '@/lib/i18n';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? t('copy.copied') : t('copy.copy')}
      className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-sm border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
    </button>
  );
}
