import React from 'react'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Project, ProjectList } from '@/components/ui/Project'
import { ProjectItems } from '@/data/projects'

function ProjectsSection() {
  return (
    <Section className="flex-col" id="projects">
      <SectionTitle
        subTitle="PROJECTS"
        description="A selection of projects I've worked on recently."
      >
        Featured Projects
      </SectionTitle>
      <ProjectList>
        {ProjectItems.map((project, index) => (
          <Project
            key={index}
            title={project.title}
            image={project.image}
            idx={index}
            projectLinks={project.projectLinks}
            imageBorder={project.imageBorder}
            notice={project.notice}
            overrides={project.overrides}
            mentions={project.mentions}
          >
            {project.children}
          </Project>
        ))}
      </ProjectList>
    </Section>
  )
}

export default ProjectsSection
