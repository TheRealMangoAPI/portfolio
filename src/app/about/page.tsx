/* eslint-disable @next/next/no-img-element */
import CTA from "@/components/CTA";
import { skills } from "@/constants";
import { div } from "three/examples/jsm/nodes/Nodes.js";

function About() {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Greetings! I&apos;m{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          MangoAPI
        </span>
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          I&apos;m a passionate hobby developer based in the picturesque
          landscapes of Switzerland. With an eagerness to explore the realms of
          coding, I find joy in turning ideas into digital reality. My journey
          is fueled by curiosity, creativity, and the ever-growing world of
          technology.
        </p>
      </div>

      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>

        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill, idx) => (
            <div key={idx} className="block-container w-20 h-20">
              <div className="btn-back rounded-xl" />
              <div className="btn-front rounded-xl flex justify-center items-center">
                <img
                  src={skill.imageUrl.src}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain mb-3 ml-3"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
}

export default About;
