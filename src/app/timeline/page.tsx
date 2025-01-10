import React from 'react'
import { Timeline } from '@/components/ui/Timeline'
import { Image } from '@nextui-org/react'

function Page() {
  const content = [
    {
      title: '2024',
      content: (
        <div>
          <p className="text-md mb-8 font-normal">
            I delved deeper into DevOps, focusing on deployment pipelines,
            Kubernetes, and other related technologies. Alongside this, I continued to
            solidify my existing skills in web development, C++, and full-stack
            application development, ensuring I had a well-rounded understanding of the
            entire software lifecycle.
          </p>
          <Image
            src="https://zerotwo.lol/ZkBhXYgSl97K825X5ONV.png"
            alt="Kubernetes"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      )
    },
    {
      title: '2023',
      content: (
        <div>
          <p className="text-md mb-8 font-normal">
            I started learning C++ to broaden my programming knowledge and explore
            lower-level programming concepts. Around the same time, I also switched from
            using Vite (React) to Next.js, as I wanted to take advantage of its powerful
            features for building full-stack applications.
          </p>
          <div className="flex flex-row space-x-8">
            <Image
              src="https://zerotwo.lol/lMVvxDxSGU6l05R0U3RL.png"
              alt="C++"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <Image
              src="https://zerotwo.lol/CF4hr3PXTtFJgm1RDaSZ.png"
              alt="Next.js"
              width={320}
              height={320}
              className="rounded-lg"
            />
          </div>
        </div>
      )
    },
    {
      title: '2022',
      content: (
        <div>
          <p className="text-md mb-8 font-normal">
            I took my web development skills to the next level by learning React. This
            marked a turning point for me as I started building dynamic and interactive
            web applications.
          </p>
          <Image
            src="https://zerotwo.lol/khAXjAdNh3SBmIS5ewMs.png"
            alt="React Vite TypeScript"
            width={800}
            height={280}
            className="rounded-lg"
          />
        </div>
      )
    },
    {
      title: '2021',
      content: (
        <div>
          <p className="text-md mb-8 font-normal">s
            After some time, I collected all my motivation to start learning programming
            again. This time, I decided to begin with something simpler, so I started
            learning web development with HTML, CSS, and JavaScript.
          </p>
          <Image
            src="https://zerotwo.lol/ter4OUPZW9NTnQVkOFna.png"
            alt="Web Development"
            width={800}
            height={260}
            className="rounded-lg"
          />
        </div>
      )
    },
    {
      title: '2020',
      content: (
        <div>
          <p className="text-md mb-8 font-normal">
            When I was 11 years old, I wanted to learn programming to create games in
            Unity. However, I quickly got frustrated because I found it difficult to wrap
            my head around such a complex topic at that age.
          </p>
          <Image
            src="https://zerotwo.lol/A4AcE7hDkSKEIidh5jAF.png"
            alt="Unity"
            width={800}
            height={400}
            className="rounded-lg"
          />
        </div>
      )
    }
  ]

  const header = (
    <div>
      <p className="animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-300% bg-clip-text text-6xl font-bold text-transparent">
        Timeline
      </p>
      <p className="ml-1 text-lg font-normal">
        This is a timeline of my journey through programming.
      </p>
    </div>
  )

  return <Timeline data={content} header={header} />
}

export default Page
