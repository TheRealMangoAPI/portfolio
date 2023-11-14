import Link from "next/link";

interface CTAProps {}

const CTA: React.FC<CTAProps> = ({}) => {
  return (
    <section className="cta">
      <p className="cta-text">
        Wanna ask something? <br className="sm:block hidden" />
        Feel free to contact me!
      </p>

      <Link href={"/contact"} className="btn">
        Contact
      </Link>
    </section>
  );
};

export default CTA;
