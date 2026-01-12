import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/data/projects';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const statusStyles: Record<ProjectStatus, string> = {
  Production: 'bg-status-production/15 text-status-production border-status-production/30',
  DR: 'bg-status-dr/15 text-status-dr border-status-dr/30',
  POC: 'bg-status-poc/15 text-status-poc border-status-poc/30',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
};
