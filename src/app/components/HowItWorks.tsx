"use client";

import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";
import StoreBadges from "./StoreBadges";

const STEPS = [
  {
    title: "Film your shot",
    description:
      "Record from the side or a slight angle so we can see your full body, stick, and follow-through.",
    image: "/v2-upload.png",
    alt: "Puck Buddy upload screen showing video selection",
  },
  {
    title: "Get your scorecard",
    description:
      "Computer vision scores key mechanics and highlights what to fix — usually in about a minute.",
    image: "/v2-scorecard.png",
    alt: "Puck Buddy scorecard with shot analysis metrics",
  },
  {
    title: "Improve with coaching",
    description:
      "Read clear coaching feedback and track progress rep by rep, at the rink or in the driveway.",
    image: "/v2-coach-feedback.png",
    alt: "Puck Buddy coach feedback screen with improvement tips",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-gray-100 bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              How it works
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Three steps from video upload to actionable coaching — no sensors, no lab setup.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <ScrollAnimation key={step.title} delay={index * 0.08}>
              <article className="flex h-full flex-col text-center">
                <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-[1.75rem] border border-black/5 bg-gray-50 shadow-md ring-1 ring-black/5">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={440}
                    height={952}
                    className="h-auto w-full object-cover object-top"
                    sizes="(min-width: 768px) 220px, 55vw"
                  />
                </div>
                <p className="mt-5 text-sm font-semibold text-blue-700">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
              </article>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={0.2}>
          <div
            id="get-app"
            className="mx-auto mt-14 flex max-w-3xl scroll-mt-24 flex-col items-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-6 py-8 text-center shadow-sm sm:px-10"
          >
            <h3 className="text-2xl font-bold text-gray-900">Ready to train?</h3>
            <p className="mt-2 max-w-lg text-gray-600">
              Download Puck Buddy free and upload your first shooting video today.
            </p>
            <StoreBadges location="how_it_works" theme="light" className="mt-6" />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
