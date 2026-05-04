import React, { useState, useEffect, useRef } from "react";
import {
  UserCircle2,
  MessageSquare,
  LineChart,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Understand Your Goals",
    desc: "We begin by understanding your financial goals, investment horizon, and risk comfort to create the right investment direction.",
    icon: <UserCircle2 size={48} strokeWidth={1.5} />,
  },
  {
    id: "02",
    title: "Build Your SIP Strategy",
    desc: "Based on your goals, we recommend suitable mutual funds and design a disciplined SIP investment strategy.",
    icon: <MessageSquare size={48} strokeWidth={1.5} />,
  },
  {
    id: "03",
    title: "Track & Review Progress",
    desc: "Regular portfolio tracking and reviews help ensure your investments stay aligned with your financial goals.",
    icon: <LineChart size={48} strokeWidth={1.5} />,
  },
];

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We reset isVisible to false when out of view if you want
        // the animation to replay every time you scroll back up/down
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Split heading into words for the "Wave Reveal" effect
  const headingText = "Start Your Investment Journey in 3 Simple Steps ";
  const words = headingText.split(" ");

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <style>
        {`
          @keyframes waveReveal {
            from {
              clip-path: inset(0 100% 0 0);
              transform: translateX(-20px);
              opacity: 0;
            }
            to {
              clip-path: inset(0 0 0 0);
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-wave {
            display: inline-block;
            animation: waveReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            opacity: 0;
          }
        `}
      </style>

      <div className="container mx-auto px-10">
        {/* Header with Wave Typing Animation */}
        <div className="text-center mb-20 space-y-4">
          <div
            className={`flex items-center justify-center space-x-3 text-[#D9231D] transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="bg-[#D9231D] p-1.5 rounded-full shadow-md">
              <ShieldCheck size={14} className="text-white" />
            </div>
            <span className="uppercase tracking-[0.2em] font-bold text-[12px]">
              Simple Process
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl  text-[#2B5A84] leading-tight">
            {words.map((word, i) => (
              <span
                key={i}
                className={`animate-wave ${isVisible ? "inline-block" : "hidden"}`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  marginRight: "0.25em",
                }}
              >
                {/* Specific color for the '3 Simple Steps' part as per your image */}
                <span className={i >= words.length - 3 ? "text-[#2B5A84]" : ""}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group flex flex-col items-center text-center space-y-6 cursor-default transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${(index + 2) * 200}ms` }}
            >
              <div
                className={`text-[#2B5A84] transition-all duration-500 ${hoveredIndex === index ? "scale-110 -translate-y-2" : "scale-100"}`}
              >
                {step.icon}
              </div>

              <div className="space-y-4 px-4">
                <h3 className="text-2xl font-bold text-[#2B5A84]">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-[15.5px]">
                  {step.desc}
                </p>
              </div>

              <div className="relative pt-16 w-full flex flex-col items-center">
                <div
                  className={`w-[2px] bg-[#2B5A84] transition-all duration-700 ease-in-out absolute top-0 ${hoveredIndex === index ? "h-12 opacity-100" : "h-0 opacity-0"}`}
                >
                  <div className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-[#2B5A84]" />
                </div>
                <span
                  className={`text-lg font-bold transition-all duration-500 mt-4 ${hoveredIndex === index ? "text-[#2B5A84] scale-110" : "text-slate-300"}`}
                >
                  {step.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
