import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { apps, getAppBySlug, appSlug } from '@/data/apps';
import { translate } from '@/lib/i18n';
import { AppDetailView } from '@/components/sections/AppDetailView';

// Server shell: static params + English metadata (SEO). The page body is the client
// <AppDetailView>, which switches language at runtime via the locale store.
export function generateStaticParams() {
  return apps.map((a) => ({ slug: appSlug(a) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return {};
  return { title: translate('en', 'app.metaTitle', { name: app.name }), description: app.summary };
}

export default async function AppDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getAppBySlug(slug)) notFound();
  return <AppDetailView slug={slug} />;
}
