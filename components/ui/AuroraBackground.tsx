// Soft, slowly-drifting colour blobs that live behind the content and fill the empty
// side gutters on wide screens. Purely decorative; frozen under reduced-motion.
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="aurora aurora-4" />
    </div>
  );
}
