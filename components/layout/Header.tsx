'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LangSwitch } from '@/components/ui/LangSwitch';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/basePath';
import { getProfile } from '@/data/profile';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';
import { useHideOnScrollNav } from '@/hooks/useHideOnScrollNav';

// Home-anchored link that also works from project detail pages, with basePath.
const toHome = (id: string) => `${asset('/')}#${id}`;

export function Header() {
  useLocale(); // re-render labels on language switch
  const profile = getProfile();
  const NAV = [
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'systems', label: t('nav.systems') },
    { id: 'projects', label: t('nav.work') },
    { id: 'reviews', label: t('nav.reviews') },
    { id: 'contact', label: t('nav.contact') },
  ];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const { scrolled, hidden } = useHideOnScrollNav();

  // Highlight the section nearest the middle of the viewport.
  useEffect(() => {
    const ids = ['hero', ...NAV.map((n) => n.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* translateY lives on this inner wrapper, never the sticky <header> (iOS safety) */}
      <div
        className={cn(
          'will-change-transform transition-transform duration-300',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div
          className={cn(
            'transition-[background-color,box-shadow,border-color] duration-300',
            scrolled || open
              ? 'border-b border-border bg-header shadow-sm backdrop-blur'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <Container
            className={cn(
              'flex items-center justify-between transition-[height] duration-300',
              scrolled ? 'h-12' : 'h-16',
            )}
          >
            <a
              href={toHome('hero')}
              onClick={() => setOpen(false)}
              className="font-display text-fluid-base font-bold text-text transition-colors hover:text-brand-text"
            >
              {profile.name}
              <span className="text-brand">.</span>
            </a>

            {/* Desktop nav — a frosted segmented pill (active = soft brand pill) + a Contact CTA */}
            <div className="hidden items-center gap-2 md:flex">
              <nav
                aria-label={t('a11y.primaryNav')}
                className="flex items-center gap-0.5 rounded-pill border border-border bg-header px-1.5 py-1 shadow-sm backdrop-blur"
              >
                {NAV.filter((n) => n.id !== 'contact').map((n) => (
                  <a
                    key={n.id}
                    href={toHome(n.id)}
                    aria-current={active === n.id ? 'page' : undefined}
                    className={cn(
                      'rounded-pill px-3.5 py-1.5 text-fluid-sm transition-colors',
                      active === n.id
                        ? 'bg-brand-tint font-medium text-brand-text'
                        : 'text-muted hover:bg-bg-alt hover:text-text',
                    )}
                  >
                    {n.label}
                  </a>
                ))}
              </nav>
              <a
                href={toHome('contact')}
                aria-current={active === 'contact' ? 'page' : undefined}
                className="inline-flex items-center rounded-pill bg-primary px-4 py-2 text-fluid-sm font-medium text-bg shadow-sm transition-colors hover:bg-primary-hover"
              >
                {t('nav.contact')}
              </a>
              <LangSwitch />
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <LangSwitch />
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? t('header.closeMenu') : t('header.openMenu')}
                className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-text transition-colors hover:border-brand-text hover:text-brand-text"
              >
                {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </Container>

          {/* Mobile menu */}
          {open && (
            <nav id="mobile-nav" aria-label={t('a11y.mobileNav')} className="border-t border-border md:hidden">
              <Container className="flex flex-col py-2">
                {NAV.map((n) => (
                  <a
                    key={n.id}
                    href={toHome(n.id)}
                    onClick={() => setOpen(false)}
                    aria-current={active === n.id ? 'page' : undefined}
                    className={cn(
                      'flex min-h-[44px] items-center rounded-lg px-3 text-fluid-base transition-colors',
                      active === n.id
                        ? 'bg-brand-tint font-medium text-brand-text'
                        : 'text-muted hover:bg-bg-alt hover:text-text',
                    )}
                  >
                    {n.label}
                  </a>
                ))}
              </Container>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
