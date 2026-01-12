import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Calendar, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/data/projects';
import { TechBadge } from './TechBadge';
import { StatusBadge } from './StatusBadge';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className="perspective-1000">
      <motion.article
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'glass rounded-xl preserve-3d',
          'transition-all duration-300 ease-out',
          'relative overflow-hidden',
          isHovered && 'shadow-[var(--glass-shadow-hover)]'
        )}
      >
        {/* Subtle gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow effect */}
        <motion.div
          className={cn(
            "absolute -inset-px rounded-xl opacity-0 pointer-events-none blur-sm",
            project.status === 'Production' && "bg-gradient-to-r from-status-production/20 to-status-production/10",
            project.status === 'UAT' && "bg-gradient-to-r from-status-uat/20 to-status-uat/10",
            project.status === 'POC' && "bg-gradient-to-r from-status-poc/20 to-status-poc/10"
          )}
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl relative z-10"
        >
          <div className="flex flex-col gap-4">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4">
              <motion.h3 
                className="text-lg font-semibold text-foreground leading-tight"
                layout="position"
              >
                {project.title}
              </motion.h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0 mt-0.5 p-1.5 rounded-full bg-muted/50"
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <motion.div 
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.02 }}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">{project.year}</span>
              </motion.div>
              <StatusBadge status={project.status} animated={isHovered} />
              <motion.div 
                className="flex items-center gap-1.5"
                whileHover={{ scale: 1.02 }}
              >
                <User className="w-3.5 h-3.5" />
                <span>{project.role}</span>
              </motion.div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <TechBadge 
                  key={tech} 
                  tech={tech} 
                  index={idx}
                  animated={isHovered}
                />
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
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden relative z-10"
            >
              <div className="px-6 pb-6 pt-2 border-t border-border/50 space-y-5">
                {/* Problem */}
                <motion.section
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-destructive" />
                    Problem
                  </h4>
                  <ul className="space-y-2">
                    {project.problem.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-sm text-foreground/90 flex gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.05 }}
                      >
                        <span className="text-muted-foreground/60 select-none">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>

                {/* Solution */}
                <motion.section
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    Solution
                  </h4>
                  <ul className="space-y-2">
                    {project.solution.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-sm text-foreground/90 flex gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + idx * 0.05 }}
                      >
                        <span className="text-muted-foreground/60 select-none">•</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>

                {/* Impact */}
                <motion.section
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-xs font-semibold text-accent uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <Sparkles className="w-3 h-3" />
                    Impact
                  </h4>
                  <ul className="space-y-2">
                    {project.impact.map((item, idx) => (
                      <motion.li 
                        key={idx} 
                        className="text-sm text-foreground flex gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + idx * 0.05 }}
                      >
                        <span className="text-accent select-none">▸</span>
                        <span className="font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </div>
  );
};
