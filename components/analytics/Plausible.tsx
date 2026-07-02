import Script from 'next/script';

// Privacy-friendly Plausible analytics. Renders NOTHING until you set
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN (your site's domain, e.g. "asad.dev") in the environment,
// so it's completely inert locally and on any deploy that hasn't configured it.
export function Plausible() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
