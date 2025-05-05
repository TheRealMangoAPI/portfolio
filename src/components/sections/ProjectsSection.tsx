'use client'

import React, { useEffect, useRef } from 'react'
import { Section, SectionTitle } from '@/components/ui/Section'
import { Project, ProjectList } from '@/components/ui/Project'
import { ProjectItems } from '@/data/projects'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card') as HTMLElement[]

      cards.forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 93%',
            toggleActions: 'play none none none'
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Section ref={sectionRef} className="flex-col" id="projects">
      <SectionTitle
        subTitle="PROJECTS"
        description="A selection of projects I've worked on recently."
      >
        Featured Projects
      </SectionTitle>
      <ProjectList>
        {ProjectItems.map((project, index) => (
          <div key={index} className="project-card">
            <Project
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
          </div>
        ))}
      </ProjectList>
    </Section>
  )
}

export default ProjectsSection
