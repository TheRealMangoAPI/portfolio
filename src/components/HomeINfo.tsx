import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HomeINfoProps {
  currentStage: number;
}

interface InfoBoxProps {
  text: string;
  link: string;
  btnText: string;
}

const InfoBox = ({ text, link, btnText }: InfoBoxProps) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center">{text}</p>{" "}
    <Link href={link} className="neo-brutalism-white neo-btn">
      {btnText} <ArrowRight />
    </Link>
  </div>
);

const renderContent: { [key: number]: JSX.Element } = {
  0: <p></p>,

  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I&apos;m <span className="font-semibold">MangoAPI</span> 👋
      <br />
      I&apos;m a hobby developer
    </h1>
  ),
  2: (
    <InfoBox
      text="My skills have been largely cultivated through YouTube tutorials."
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Explore the digital creations I've built while learning and growing as a young hobby developer."
      link="/projects"
      btnText="See my projects"
    />
  ),
  4: (
    <InfoBox
      text="Let's connect! Whether you have questions, ideas, or just want to say hi, I'm here and excited to hear from you."
      link="/contact"
      btnText="Get in touch"
    />
  ),
};

const HomeINfo: React.FC<HomeINfoProps> = ({ currentStage }) => {
  return renderContent[currentStage] || null;
};

export default HomeINfo;
