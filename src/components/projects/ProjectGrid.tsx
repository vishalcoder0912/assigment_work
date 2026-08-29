import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/types/domain";
import { ProjectCard } from "./ProjectCard";
import { LuxButton } from "@/components/ui/lux";

interface ProjectGridProps {
  projects: Project[];
  onReset?: () => void;
}

export function ProjectGrid({ projects, onReset }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="border-t border-hairline py-28 text-center">
        <h3 className="display text-[clamp(1.9rem,4.4vw,3.4rem)] text-ivory">Nothing here yet.</h3>
        <p className="mt-4 text-sm text-muted-foreground">Try another category or search term.</p>
        {onReset ? (
          <div className="mt-8 flex justify-center">
            <LuxButton variant="outline" onClick={onReset}>
              Reset filters
            </LuxButton>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.7, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className={
              project.scale === "sm"
                ? "md:col-span-4"
                : project.scale === "lg"
                  ? "md:col-span-8"
                  : project.scale === "full"
                    ? "md:col-span-12"
                    : "md:col-span-6"
            }
          >
            <ProjectCard
              project={{ ...project, scale: project.scale ?? "md" }}
              offset={index % 5 === 2}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
