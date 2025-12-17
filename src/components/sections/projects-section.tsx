import { Project, ProjectList } from '@/components/ui/project'
import { Section, SectionTitle } from '@/components/ui/section'
import { PROJECT_ITEMS } from '@/data/projects'

export function ProjectsSection() {
  return (
    <Section className="flex-col pt-8 sm:pt-12 lg:pt-16">
      <SectionTitle
        title="Featured Projects"
        subTitle="PROJECTS"
        description="A selection of projects I've worked on recently."
      />
      <ProjectList>
        {PROJECT_ITEMS.map((item, idx) => (
          <Project
            key={item.title}
            idx={idx}
            {...item}
          />
        ))}
      </ProjectList>
    </Section>
  )
}
