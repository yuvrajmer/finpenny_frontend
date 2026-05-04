import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, ArrowRight, Wand2, Target, BarChart3 } from 'lucide-react';

const commitments = [
  {
    title: "Smart Scheme Selection",
    desc: "We help you choose suitable mutual fund schemes based on your financial goals, investment horizon, and risk comfort.",
    icon: <Wand2 className="w-6 h-6" />
  },
  {
    title: "Goal-Based Portfolio Planning",
    desc: "Your investments are mapped to specific financial goals, ensuring a structured approach toward long-term wealth creation.",
    icon: <Target className="w-6 h-6" />
  },
  {
    title: "Portfolio Review & Continuous Support",
    desc: "Regular portfolio reviews and ongoing guidance help keep your investments aligned with your goals and changing market conditions.",
    icon: <BarChart3 className="w-6 h-6" />
  }
];

const WhyFinpenny = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT CONTENT */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center space-x-3">
              <div className="bg-[#D9231D] p-1.5 rounded-full shadow-lg shadow-red-200">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <span className="uppercase tracking-[0.2em] font-bold text-[12px] text-[#D9231D]">Why Finpenny</span>
            </div>

            <h2 className="text-5xl font-playfair font-bold text-[#2B5A84] leading-tight">
              Trusted Guidance for <br />
              <span className="text-[#2B5A84]">Smarter Investing</span>
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed max-w-lg">
              With professional financial expertise and a structured advisory approach, 
              Finpenny supports investors in making smarter financial choices for the future.
            </p>

            <ul className="space-y-4">
              {['Start Your Investment Journey Today', 'Build Wealth with the Right Strategy'].map((text, i) => (
                <li key={i} className="flex items-center space-x-3 text-[#2B5A84] font-bold">
                  <CheckCircle2 size={20} className="text-[#D9231D]" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <button className="flex items-center space-x-3 bg-[#2B5A84] text-white px-8 py-4 rounded-full font-bold hover:bg-[#D9231D] transition-all duration-300 group shadow-xl">
              <span className="text-sm uppercase tracking-widest">More About</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* RIGHT CONTENT - COMMITMENTS */}
          <div className="space-y-10">
            {/* Top Commitment Header */}
            <div className={`flex items-start space-x-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mt-1">
                <CheckCircle2 size={32} className="text-[#D9231D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2B5A84] leading-snug max-w-xs">
                We Are Committed to Your Financial Growth
              </h3>
            </div>

            <div className="w-full h-[1px] bg-slate-100"></div>

            {/* Staggered List */}
            <div className="space-y-12">
              {commitments.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-6 transition-all duration-700 ease-out`}
                  style={{ 
                    transitionDelay: `${(index + 4) * 150}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl border border-slate-200 flex items-center justify-center text-[#2B5A84] bg-slate-50 group-hover:bg-[#2B5A84] transition-colors duration-500">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-[#2B5A84]">{item.title}</h4>
                    <p className="text-slate-500 leading-relaxed text-[15px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyFinpenny;