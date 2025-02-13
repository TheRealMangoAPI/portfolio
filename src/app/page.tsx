import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AboutMeSection from '@/components/sections/AboutMeSection'
import ContactSection from '@/components/sections/ContactSection'

function Page() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AboutMeSection />
      <ContactSection />
      <div className="fixed bottom-0 left-0 right-0 top-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:28px_28px]"></div>
    </>
  )
}

export default Page
