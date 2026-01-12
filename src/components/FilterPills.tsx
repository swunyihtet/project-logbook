import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FilterPillsProps<T> {
  label: string;
  options: T[];
  selected: T | null;
  onSelect: (value: T | null) => void;
  getLabel?: (option: T) => string;
}

export function FilterPills<T>({
  label,
  options,
  selected,
  onSelect,
  getLabel = (o) => String(o),
}: FilterPillsProps<T>) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        <motion.button
          onClick={() => onSelect(null)}
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'relative px-4 py-1.5 text-sm rounded-full border transition-all duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            selected === null
              ? 'bg-primary text-primary-foreground border-primary shadow-md'
              : 'bg-muted/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground hover:bg-muted'
          )}
        >
          {selected === null && (
            <motion.span
              layoutId="filter-active-bg"
              className="absolute inset-0 bg-primary rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          All
        </motion.button>
        
        {options.map((option, idx) => {
          const isSelected = selected === option;
          return (
            <motion.button
              key={idx}
              onClick={() => onSelect(isSelected ? null : option)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className={cn(
                'relative px-4 py-1.5 text-sm rounded-full border transition-all duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-muted/50 text-muted-foreground border-border/50 hover:border-primary/30 hover:text-foreground hover:bg-muted'
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId="filter-active-bg"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {getLabel(option)}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
