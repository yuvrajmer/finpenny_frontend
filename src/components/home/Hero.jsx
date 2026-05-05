import React from "react";
import { Link } from 'react-router-dom';
import { Check } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[620px] flex items-center overflow-hidden">
      {/* Background Layer: This fixes the "Blurred Window" look from the screenshot */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://finpenny.com/wp-content/uploads/2026/03/Untitled-design-1-1.png')`, // Using the main image as a background
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(40px) brightness(1.1)", // Creates that soft blurred office look
          opacity: 0.15,
        }}
      />

      {/* Light Blue Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9FF] via-[#F4F9FF]/0 to-transparent z-1" />

      <div className="container mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center relative z-10">
        {/* Left Content Section */}
        <div className="max-w-2xl space-y-10">
          <div className="space-y-5">
            <h4 className="text-[18px] text-[#2B5A84] tracking-[0.05em] uppercase text-sm">
              Start Your Investment Journey Today
            </h4>

            {/* Heading: Using Playfair with specific weight and line height */}
            <p className="text-[31px] font-bold text-[#2B5A84] leading-[1.5]  ">
              Guidance That Helps Your Money Grow Smarter
            </p>

            <p className="text-[#4A5568] text-[17px] max-w-[900px] leading-relaxed ">
              Clear strategies, disciplined SIPs, and ongoing portfolio support
              to help you stay on track with your financial goals.
            </p>
          </div>

          {/* Button: Fixed padding and rounded corners */}
          <Link to="/contact">
            <button className="bg-[#2B5A84] text-white px-7 py-3 rounded-md font-bold text-lg hover:bg-[#D9231D] transition-all shadow-md shadow-blue-900/20">
              Free Consultation
            </button>
          </Link>

          {/* Features: Smaller text and red checkmarks */}
          <div className="flex items-center space-x-12 pt-4">
            <div className="flex items-center space-x-2 text-[#2B5A84] text-[15px] font-bold">
              <Check size={18} className="text-[#D9231D] stroke-[4px]" />
              <span>Expert Investment Guidance</span>
            </div>
            <div className="flex items-center space-x-2 text-[#2B5A84] text-[15px] font-bold">
              <Check size={18} className="text-[#D9231D] stroke-[4px]" />
              <span>Structured Investment Approach</span>
            </div>
          </div>
        </div>

        {/* Right Image Section: Moved slightly higher and right */}
        <div className=" relative flex justify-end">
          <img
            src="https://finpenny.com/wp-content/uploads/2026/03/Untitled-design-1-1.png"
            alt="Financial Shield"
            className="w-full max-w-[580px] drop-shadow-[-20px_20px_50px_rgba(0,0,0,0.1)] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
