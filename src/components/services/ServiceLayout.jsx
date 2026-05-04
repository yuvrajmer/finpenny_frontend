import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  FileText,
  Target,
  PieChart,
  LineChart,
} from "lucide-react";

const ServiceLayout = ({
  title,
  heroBgImage,
  mainImage,
  mainSubTitle,
  mainDescription,
  keyPoints,
  faqTitle,
  faqs,
  // These props allow you to switch between your 4 service pages
  prevService = { name: "Previous", path: "#" },
  nextService = { name: "Next", path: "#" },
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const { pathname } = useLocation();

  // Automatically scroll to top whenever the service path changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const featureIcons = [
    <FileText size={24} />,
    <Target size={24} />,
    <PieChart size={24} />,
    <LineChart size={24} />,
  ];

  return (
    <main className="bg-white font-sans">
      {/* 1. Hero Section */}
      <section className="relative h-[550px] w-full flex items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="container px-22 relative pt-40 z-10">
          <div className="max-w-4xl">
            <h1 className="text-white text-6xl md:text-6xl font-bold mb-5 tracking-tight">
              {title}
            </h1>
            <div className="flex items-center space-x-3 text-white/90 font-medium text-lg">
              <Link to="/" className="hover:text-white cursor-pointer transition-colors">
                Home
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-[1px] bg-white/60"></div>
                <ChevronRight size={18} className="ml-1" />
              </div>
              <span className="text-white/70">{title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Content Section */}
      <section className="py-24 bg-white mb-25">
        <div className="container mx-auto px-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 relative items-start">
            
            {/* --- LEFT SIDEBAR (STICKY) --- */}
            <aside className="lg:w-1/3 space-y-10 lg:sticky lg:top-28 h-fit self-start">
              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-xl bg-white">
                <div className="bg-[#487199] p-5">
                  <h3 className="text-white text-xl font-bold tracking-wide">Recent Articles</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex gap-4 group cursor-pointer">
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden shadow-md border border-slate-50">
                      <img src="https://finpenny.com/wp-content/uploads/2026/03/Recent-Article-Thumbnail.png" alt="Article" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[#2B5A84] font-bold text-sm leading-tight group-hover:text-red-600 transition-colors">Avoid These Money Mistakes...</h4>
                      <p className="text-xs text-slate-400 font-medium">January 18, 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-12 text-center text-white relative overflow-hidden shadow-2xl min-h-[480px] flex flex-col justify-center items-center" style={{ backgroundImage: `url('https://nexta.themevally.com/wp-content/uploads/2025/05/cta-mix.png')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="relative z-10 space-y-8 flex flex-col items-center w-full">
                  <div className="group bg-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300">
                    <img src="https://nexta.themevally.com/wp-content/uploads/2025/05/icon-infomsg.png" alt="Message Icon" className="w-14 h-14 object-contain group-hover:animate-vibrate" />
                  </div>
                  <h3 className="text-3xl font-bold leading-tight">Get in touch with Finpenny</h3>
                  <button className="bg-white text-[#0b1b2b] font-bold px-10 py-4 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl uppercase tracking-wider text-sm w-full max-w-[200px]">Contact Us</button>
                </div>
              </div>
            </aside>

            {/* --- RIGHT CONTENT AREA --- */}
            <div className="lg:w-2/3 space-y-12">
              <div className="rounded-[30px] overflow-hidden shadow-2xl">
                <img src={mainImage} alt={title} className="w-full h-120 object-cover" />
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl font-extrabold text-[#2B5A84] tracking-tight">{title}</h2>
                <h3 className="text-xl font-bold text-[#487199] border-l-4 border-red-600 pl-4">{mainSubTitle}</h3>
                <p className="text-slate-600 leading-relaxed text-lg text-justify whitespace-pre-line">{mainDescription}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                {keyPoints.map((point, index) => (
                  <div key={index} className="bg-[#F8FDFF] flex items-center gap-5 p-7 rounded-2xl border border-slate-50 hover:border-red-500 hover:bg-white transition-all shadow-sm group">
                    <div className="bg-red-600 text-white p-3 rounded-xl shadow-lg shadow-red-200">
                      {featureIcons[index] || <CheckCircle2 size={24} />}
                    </div>
                    <span className="text-[#2B5A84] font-bold text-[16px]">{point}</span>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="pt-16 space-y-10">
                <h2 className="text-3xl font-bold text-[#2B5A84] flex items-center gap-3">
                  {faqTitle}
                  <div className="h-[2px] flex-grow bg-slate-100 ml-4"></div>
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? "shadow-xl border-slate-200 ring-1 ring-slate-100" : "shadow-sm bg-white"}`}>
                      <button onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} className={`w-full flex justify-between items-center px-8 py-6 text-left font-bold transition-all duration-500 ease-out ${openFaqIndex === index ? "bg-[#487199] text-white" : "bg-white text-[#2B5A84] hover:bg-slate-50"}`}>
                        <span className={`text-lg transition-transform duration-300 ${openFaqIndex === index ? "translate-x-1" : ""}`}>{faq.question}</span>
                        <div className={`p-1 rounded-full transition-all duration-500 ${openFaqIndex === index ? "bg-white/20 rotate-180" : ""}`}>
                          <ChevronDown size={22} />
                        </div>
                      </button>
                      <div className={`grid transition-all duration-500 ease-in-out ${openFaqIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <div className="px-8 py-8 text-slate-600 text-base leading-relaxed bg-slate-50/50 border-t border-slate-100/50">
                            <p className="italic">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4-SERVICE NAVIGATION (PREVIOUS & NEXT) */}
              <div className="pt-20 mt-10 border-t border-slate-100 flex flex-row justify-between items-center">
                {/* Previous Button */}
                <Link 
                  to={prevService.path} 
                  className="flex items-center gap-4 text-slate-400 hover:text-red-600 transition-all duration-300 group/prev"
                >
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover/prev:border-red-600 group-hover/prev:bg-red-50 group-hover/prev:text-red-600 transition-all">
                    <ChevronLeft size={24} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[3px] text-slate-400 group-hover/prev:text-red-400 font-bold">Prev Service</span>
                    <span className="text-md font-extrabold text-[#2B5A84] group-hover/prev:text-red-600 uppercase">{prevService.name}</span>
                  </div>
                </Link>

                {/* Next Button */}
                <Link 
                  to={nextService.path} 
                  className="flex items-center gap-4 text-slate-400 hover:text-red-600 transition-all duration-300 group/next text-right"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[3px] text-slate-400 group-hover/next:text-red-400 font-bold">Next Service</span>
                    <span className="text-md font-extrabold text-[#2B5A84] group-hover/next:text-red-600 uppercase">{nextService.name}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover/next:border-red-600 group-hover/next:bg-red-50 group-hover/next:text-red-600 transition-all">
                    <ChevronRight size={24} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceLayout;