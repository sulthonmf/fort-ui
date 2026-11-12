import { Badge } from '@/registry/web/ui/badge';
import { DonateButton } from '@/components/donate-button';

export interface ProCalloutProps {
  title?: string;
}

/**
 * Marks a Pro-tier component in docs with a clear support/donation trigger.
 */
export function ProCallout({ title = 'Pro Component' }: ProCalloutProps) {
  return (
    <div className="not-prose fort-ui my-5 flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-[var(--fort-separator)] bg-[var(--fort-surface)] p-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="filled">Pro</Badge>
          <span className="text-[15px] font-semibold text-[var(--fort-label)]">
            {title}
          </span>
        </div>
        <p className="text-[13px] text-[var(--fort-label-secondary)]">
          Interactive preview is open to test. Support development to unlock the
          full Pro release bundle.
        </p>
      </div>
      <DonateButton label="Buy Me a Coffee" size="sm" />
    </div>
  );
}

