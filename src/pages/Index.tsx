import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, Sparkles } from 'lucide-react';
import { projects, years, statuses, categories, type ProjectStatus } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { FilterPills } from '@/components/FilterPills';
import { AnimatedBackground } from '@/components/AnimatedBackground';

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedYear && project.year !== selectedYear) return false;
      if (selectedStatus && project.status !== selectedStatus) return false;
      if (selectedCategory && project.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedYear, selectedStatus, selectedCategory]);

  const hasActiveFilters = selectedYear || selectedStatus || selectedCategory;

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedStatus(null);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          {/* Page header */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-3">
              <motion.div 
                className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Briefcase className="w-6 h-6 text-accent" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                  Project Experience
                </h1>
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground text-sm mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{projects.length} documented projects</span>
                </motion.div>
              </div>
            </div>
            <motion.p 
              className="text-muted-foreground text-base max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              A log of technical projects I've led or contributed to. Each entry captures the 
              problem context, approach taken, and measurable outcomes.
            </motion.p>
          </motion.header>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 space-y-4 p-6 glass rounded-2xl"
          >
            <div className="flex flex-wrap gap-8">
              <FilterPills
                label="Year"
                options={years}
                selected={selectedYear}
                onSelect={setSelectedYear}
              />
              <FilterPills
                label="Status"
                options={statuses}
                selected={selectedStatus}
                onSelect={setSelectedStatus}
              />
              <FilterPills
                label="Category"
                options={categories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between pt-4 border-t border-border/50"
                >
                  <motion.span 
                    className="text-sm text-muted-foreground"
                    key={filteredProjects.length}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> of {projects.length} projects
                  </motion.span>
                  <motion.button
                    onClick={clearFilters}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-sm text-accent hover:text-accent/80 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-accent/10"
                  >
                    Clear filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Project list */}
          <motion.div 
            className="space-y-5"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 glass rounded-2xl"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Briefcase className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                </motion.div>
                <p className="text-muted-foreground text-lg">
                  No projects match the current filters.
                </p>
                <motion.button
                  onClick={clearFilters}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 text-sm text-accent hover:text-accent/80 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-accent/10"
                >
                  Clear filters
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Footer note */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border/30"
          >
            <p className="text-xs text-muted-foreground text-center">
              {projects.length} projects documented • Last updated 2024
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
