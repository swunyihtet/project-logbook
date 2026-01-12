import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  tech: string;
  className?: string;
  index?: number;
  animated?: boolean;
}

export const TechBadge = ({ tech, className, index = 0, animated = false }: TechBadgeProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        delay: index * 0.03,
        duration: 0.3,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.08,
        y: -2,
        transition: { duration: 0.2 }
      }}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium',
        'bg-tech-badge text-tech-badge-text',
        'border border-transparent',
        'transition-all duration-200 cursor-default',
        animated && 'border-accent/20 shadow-sm',
        className
      )}
    >
      {tech}
    </motion.span>
  );
};
