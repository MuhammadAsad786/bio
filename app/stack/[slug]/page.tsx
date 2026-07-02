import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allSkills, getSkillBySlug, skillSlug } from '@/data/skills';
import { translate } from '@/lib/i18n';
import { StackDetailView } from '@/components/sections/StackDetailView';

// Server shell: generates the static params + English metadata (for SEO). The visible content is
// rendered by the client <StackDetailView>, which switches language at runtime via the locale store.
export function generateStaticParams() {
  return allSkills.map((s) => ({ slug: skillSlug(s.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};
  return {
    title: translate('en', 'stack.metaTitle', { name: skill.name }),
    description: skill.tech?.description?.slice(0, 160),
  };
}

export default async function StackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getSkillBySlug(slug)) notFound();
  return <StackDetailView slug={slug} />;
}
