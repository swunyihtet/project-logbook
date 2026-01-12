import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { projects, years, statuses, categories, type ProjectStatus } from '@/data/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { FilterPills } from '@/components/FilterPills';

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
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Page header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Project Experience
            </h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">
            A log of technical projects I've led or contributed to. Each entry captures the 
            problem context, approach taken, and measurable outcomes.
          </p>
        </motion.header>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8 space-y-3 p-4 bg-card rounded-lg border border-border"
        >
          <div className="flex flex-wrap gap-6">
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
          
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Project list */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">
                No projects match the current filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 text-sm text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer note */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-border"
        >
          <p className="text-xs text-muted-foreground text-center">
            {projects.length} projects documented • Last updated 2024
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
