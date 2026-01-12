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
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onSelect(null)}
          className={cn(
            'px-3 py-1 text-sm rounded-full border transition-all duration-150',
            selected === null
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
          )}
        >
          All
        </button>
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(selected === option ? null : option)}
            className={cn(
              'px-3 py-1 text-sm rounded-full border transition-all duration-150',
              selected === option
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
            )}
          >
            {getLabel(option)}
          </button>
        ))}
      </div>
    </div>
  );
}
