"use client";

import { ChangeEventHandler, Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import LoaderC from "@/components/LoaderC";
import FOx from "@/models/Fox";
import useAlert from "@/hooks/useAlert";
import Alert from "@/components/Alert";

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        // @ts-ignore
        {
          from_name: form.name,
          to_name: "MangoAPI",
          from_email: form.email,
          to_email: "contact@mangoapi.dev",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      )
      .then(() => {
        setIsLoading(false);
        console.log(alert);
        showAlert({ show: true, text: "Message sent! 🫡", type: "success" });

        setTimeout(() => {
          hideAlert();
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, 3000);

        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setCurrentAnimation("idle");
        showAlert({
          show: true,
          text: "Oops something went wrong! 😕",
          type: "danger",
        });
      });
  };

  const handleFocus = (e: any) => {
    setCurrentAnimation("walk");
  };
  const handleBlur = (e: any) => {
    setCurrentAnimation("idle");
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && (
        <Alert text={alert.text} type={alert.type} show={alert.show} />
      )}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className="head-text">Get in Touch</h1>

        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label className="text-black-500">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John Smith"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="john.smith@shadow-garden.com"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500">
            Message
            <textarea
              name="message"
              rows={5}
              className="textarea"
              placeholder="I am John Smith."
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={<LoaderC />}>
            <FOx
              currentAnimation={currentAnimation}
              // @ts-ignore
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.75, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

export default Contact;
