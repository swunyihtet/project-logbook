import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { TechBadge } from './TechBadge';
import { StatusBadge } from './StatusBadge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-card rounded-lg border border-border',
        'shadow-card hover:shadow-card-hover',
        'transition-shadow duration-200'
      )}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        <div className="flex flex-col gap-3">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-foreground leading-tight">
              {project.title}
            </h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 mt-0.5"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.year}</span>
            </div>
            <StatusBadge status={project.status} />
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{project.role}</span>
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-border space-y-4">
              {/* Problem */}
              <section>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Problem
                </h4>
                <ul className="space-y-1.5">
                  {project.problem.map((item, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2">
                      <span className="text-muted-foreground select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Solution */}
              <section>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Solution
                </h4>
                <ul className="space-y-1.5">
                  {project.solution.map((item, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2">
                      <span className="text-muted-foreground select-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Impact */}
              <section>
                <h4 className="text-xs font-semibold text-accent uppercase tracking-wide mb-2 text-xs font-semibold">
                  Impact
                </h4>
                <ul className="space-y-1.5">
                  {project.impact.map((item, idx) => (
                    <li key={idx} className="text-sm text-foreground flex gap-2">
                      <span className="text-accent select-none">▸</span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};
