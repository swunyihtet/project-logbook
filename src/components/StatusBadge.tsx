import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/data/projects';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
  animated?: boolean;
}

const statusConfig: Record<ProjectStatus, { bg: string; text: string; glow: string; border: string }> = {
  Production: {
    bg: 'bg-status-production/15',
    text: 'text-status-production',
    border: 'border-status-production/40',
    glow: 'shadow-[0_0_12px_hsl(142_71%_45%_/_0.4)]',
  },
  UAT: {
    bg: 'bg-status-uat/15',
    text: 'text-status-uat',
    border: 'border-status-uat/40',
    glow: 'shadow-[0_0_12px_hsl(217_91%_60%_/_0.4)]',
  },
  POC: {
    bg: 'bg-status-poc/15',
    text: 'text-status-poc',
    border: 'border-status-poc/40',
    glow: 'shadow-[0_0_12px_hsl(38_92%_50%_/_0.4)]',
  },
};

export const StatusBadge = ({ status, className, animated = false }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      animate={animated ? { 
        boxShadow: [
          '0 0 0px transparent',
          status === 'Production' ? '0 0 12px hsl(142 71% 45% / 0.4)' :
          status === 'UAT' ? '0 0 12px hsl(217 91% 60% / 0.4)' :
          '0 0 12px hsl(38 92% 50% / 0.4)',
          '0 0 0px transparent'
        ]
      } : {}}
      transition={animated ? { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      } : { duration: 0.2 }}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
        config.bg,
        config.text,
        config.border,
        'transition-all duration-300',
        className
      )}
    >
      <motion.span 
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === 'Production' && "bg-status-production",
          status === 'UAT' && "bg-status-uat",
          status === 'POC' && "bg-status-poc"
        )}
        animate={animated ? { 
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1]
        } : {}}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {status}
    </motion.span>
  );
};
