import { cn } from '@/lib/utils';

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export const TechBadge = ({ tech, className }: TechBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium',
        'bg-tech-badge text-tech-badge-text',
        'transition-colors duration-150',
        className
      )}
    >
      {tech}
    </span>
  );
};
