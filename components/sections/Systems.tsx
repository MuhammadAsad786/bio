'use client';

import { CheckCircle, Layers } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { icons } from '@/lib/icons';
import { getSystems } from '@/data/systems';
import { t } from '@/lib/i18n';
import { useLocale } from '@/components/i18n/useLocale';

export function Systems() {
  useLocale();
  const systemsList = getSystems();

  return (
    <Section id="systems">
      <SectionHeading
        icon={Layers}
        eyebrow={t('systems.eyebrow')}
        title={t('systems.title')}
        description={t('systems.description')}
      />

      <div className="mt-12 flex flex-col gap-10">
        {systemsList.map((project) => (
          <Reveal key={project.slug}>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="grid gap-0 lg:grid-cols-2">
                {/* Left — placeholder / image */}
                <div className="relative flex min-h-52 items-center justify-center bg-bg-alt lg:min-h-72">
                  {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <SystemPlaceholder title={project.title} stack={project.stack} />
                  )}
                </div>

                {/* Right — content */}
                <div className="flex flex-col justify-center gap-5 p-7 lg:p-9">
                  {/* Badge + title */}
                  <div>
                    <span className="inline-block rounded-full bg-brand-tint px-3 py-0.5 text-fluid-xs font-medium text-brand-text">
                      {project.subtitle}
                    </span>
                    <h3 className="mt-2 text-fluid-xl font-bold text-text">{project.title}</h3>
                    <p className="mt-3 text-fluid-base leading-relaxed text-subtle">
                      {project.description}
                    </p>
                  </div>

                  {/* Stack chips */}
                  <div>
                    <p className="mb-2 text-fluid-xs font-semibold uppercase tracking-widest text-muted">
                      {t('systems.stack')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((key) => {
                        const Icon = icons[key];
                        return (
                          <span
                            key={key}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-tile px-2.5 py-1 text-fluid-xs font-medium text-text ring-1 ring-border"
                          >
                            {Icon && <Icon size={13} aria-hidden="true" />}
                            {key}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="mb-2 text-fluid-xs font-semibold uppercase tracking-widest text-muted">
                      {t('systems.highlights')}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-fluid-sm text-subtle">
                          <CheckCircle
                            size={15}
                            className="mt-0.5 shrink-0 text-brand-text"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  {project.protoHref && (
                    <div>
                      <Button href={project.protoHref} variant="primary">
                        {t('systems.viewPrototype')}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function SystemPlaceholder({ title, stack }: { title: string; stack: string[] }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex flex-wrap justify-center gap-2">
        {stack.slice(0, 4).map((key) => {
          const Icon = icons[key];
          return Icon ? (
            <span
              key={key}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-tile text-text shadow-sm ring-1 ring-border"
            >
              <Icon size={20} aria-hidden="true" />
            </span>
          ) : null;
        })}
      </div>
      <p className="text-fluid-sm font-medium text-muted">{title}</p>
    </div>
  );
}
