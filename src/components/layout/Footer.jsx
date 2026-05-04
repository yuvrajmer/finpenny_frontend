import React from "react";
import { Mail, Send, Bell, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Fixes the issue where the page doesn't reset position on route change
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-0 font-sans">
      {/* Red Call to Action Banner */}
      <div className="container mx-auto px-4 relative z-20 -mt-20">
        <a
          href="mailto:nirmitashah15@gmail.com"
          className="bg-[#D9231D] rounded-xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center text-white shadow-2xl overflow-hidden relative group block transition-transform hover:scale-[1.01]"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <div className="w-64 h-64 border-[40px] border-white rounded-full"></div>
          </div>
          <div className="absolute bottom-0 left-0 opacity-10 transform -translate-x-1/4 translate-y-1/4">
            <div className="w-48 h-48 border-[30px] border-white rounded-full"></div>
          </div>

          <h2 className="text-3xl font-bold mb-6 md:mb-0 relative z-10">
            Do you need free Consultation?
          </h2>

          <div className="flex items-center space-x-5 relative z-10">
            <div className="bg-white p-4 rounded-full text-[#D9231D] group-hover:bg-gray-100 transition-colors shadow-lg">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-sm opacity-90 font-medium uppercase tracking-wider">
                Send e-Mail
              </p>
              <p className="text-xl font-bold">nirmitashah15@gmail.com</p>
            </div>
          </div>
        </a>
      </div>

      {/* Main Footer (Blue Section) */}
      <div className="bg-[#3A6791] pt-32 pb-10 text-white -mt-12 relative z-0">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-20">
            
            {/* Column 1 - Brand & Socials */}
            <div className="md:col-span-2 space-y-8 border-r border-white/10 pr-12">
              <Link to="/" onClick={scrollToTop}>
                <img
                  src="https://finpenny.com/wp-content/uploads/2024/12/Copy-of-FOOD.png"
                  alt="Finpenny Logo"
                  className="h-16 w-auto object-contain" 
                />
              </Link>
              <p className="text-[15px] text-gray-200 leading-relaxed max-w-sm">
                Helping you invest with clarity, discipline, and long-term
                financial vision.
              </p>
              <div className="flex space-x-4 text-xs font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-red-400 transition-colors">FB.</a>
                <a href="#" className="hover:text-red-400 transition-colors">IG.</a>
                <a href="#" className="hover:text-red-400 transition-colors">LN.</a>
              </div>
            </div>

            {/* Column 2 - Navigation */}
            <div className="pl-0 md:pl-4">
              <h3 className="text-2xl font-bold mb-8">Company</h3>
              <ul className="space-y-4 text-gray-300 text-[15px]">
                {["Home", "About Us", "Essentials", "Latest Blog", "Contact Us"].map((link) => (
                  <li key={link} className="hover:text-white transition-all">
                    <Link 
                      to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
                      onClick={scrollToTop}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Service Link</h3>
              <ul className="space-y-4 text-gray-300 text-[15px]">
                {["Mutual Fund Investments", "SIP Planning", "ELSS (Tax Saving)", "Goal Based Investments"].map((link) => (
                  <li key={link} className="hover:text-white transition-all">
                    <Link 
                      to={`/${link.toLowerCase().replace(" ", "-")}`}
                      onClick={scrollToTop}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Newsletter</h3>
              <p className="text-[15px] text-gray-300 mb-6">Don't miss the latest news</p>
              <div className="relative mb-6">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full py-4 px-6 pr-14 rounded-xl text-gray-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 bg-[#D9231D] p-2.5 rounded-full text-white hover:bg-red-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-3 text-[14px] text-gray-400">
                <div className="bg-white/10 p-2 rounded-full">
                  <Bell size={16} />
                </div>
                <span>Please sign up for notify any updates</span>
              </div>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[14px] text-gray-300">
            <p>© 2026 Finpenny. All Rights Reserved. | Design & Developed by <span className="font-semibold text-white">Sattvion Digi Solutions</span></p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/disclaimer" onClick={scrollToTop} className="hover:text-white">Disclaimer</Link>
              <span className="opacity-30">|</span>
              <Link to="/privacy-policy" onClick={scrollToTop} className="hover:text-white">Privacy Policy</Link>
              <span className="opacity-30">|</span>
              <a 
                href="https://finpenny.com/wp-content/uploads/2026/04/codeOfConduct.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white"
              >
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- WHITE RISK SECTION --- */}
      <div className="bg-white py-12 relative border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="max-w-full">
            <p className="text-[14px] leading-[1.8] text-gray-800 mb-10 text-justify">
              <span className="font-bold">Risk Factors –</span> Investments in
              Mutual Funds are subject to Market Risks. Read all scheme related
              documents carefully before investing. Mutual Fund Schemes do not
              assure or guarantee any returns. Past performances of any Mutual
              Fund Scheme may or may not be sustained in future. There is no
              guarantee that the investment objective of any suggested scheme
              shall be achieved. All existing and prospective investors are
              advised to check and evaluate the Exit loads and other cost
              structure (TER) applicable at the time of making the investment
              before finalizing on any investment decision for Mutual Funds
              schemes. We deal in Regular Plans only for Mutual Fund Schemes and
              earn a Trailing Commission on client investments. Disclosure For
              Commission earnings is made to clients at the time of investments.
              Option of Direct Plan for every Mutual Fund Scheme is available to
              investors offering advantage of lower expense ratio. We are not
              entitled to earn any commission on Direct plans. Hence we do not
              deal in Direct Plans.
            </p>

            {/* Contact Row */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 text-[14px] font-bold text-gray-700 border-t border-gray-100 pt-8">
              <span>AMFI Registered Mutual Fund Distributor</span>
              <span className="hidden md:inline opacity-30">|</span>
              <span>ARN- 150869</span>
              <span className="hidden md:inline opacity-30">|</span>
              <span>Grievance Officer – Ms. Nirmita Shah</span>
              <span className="hidden md:inline opacity-30">|</span>
              <span>Mobile: +91 94270 49936</span>
              <span className="hidden md:inline opacity-30">|</span>
              <span className="text-gray-600">nirmitashah15@gmail.com</span>
            </div>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;