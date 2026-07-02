import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

// Consistent vertical rhythm + container for every page section.
export function Section({
  id,
  children,
  className,
  containerClassName,
  wide = false,
  divided = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  wide?: boolean;
  divided?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 sm:py-28',
        // A single centered fading hairline + whisper shadow to separate adjacent
        // white sections (hairline alone is invisible on white — pair with a shadow).
        divided &&
          'relative before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-border before:to-transparent [box-shadow:0_1px_0_rgba(24,24,27,0.02)]',
        className,
      )}
    >
      <Container wide={wide} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
