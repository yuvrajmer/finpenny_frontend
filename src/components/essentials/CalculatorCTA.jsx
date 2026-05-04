import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const CalculatorCTA = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-10 ">
        <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
          
          {/* Left Side: Image with Rounded Corners */}
          <div className="w-full md:w-1/2">
            <div className="rounded-[40px] overflow-hidden shadow-lg">
              <img 
                src="https://finpenny.com/wp-content/uploads/2026/03/4-1-1536x449.png" 
                alt="Wealth Calculation" 
                className="w-full h-85 object-cover"
              />
            </div>
          </div>

          {/* Right Side: Content and Buttons */}
          <div className="w-full md:w-1/2 space-y-5">
            {/* Wealth Tools Badge */}
            <div className="flex items-center gap-3">
              <div className="bg-red-600 p-1.5 rounded-full text-white">
                <CheckCircle2 size={18} />
              </div>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                Wealth Tools
              </span>
            </div>

            {/* Heading with specific two-tone style */}
            <p className="text-4xl md:text-5xl  text-[#2B5A84] leading-tight">
              Calculate <span className="text-[#2B5A84] font-bold">Your Wealth</span>
            </p>
            {/* Paragraph with justified alignment */}
            <p className="text-slate-600 leading-relaxed text-[16px] text-justify">
              Use our calculators to visualize your investment growth and returns. Make 
              informed decisions with clarity on how much you need to invest.
            </p>

            {/* Button Grid */}
            <div className="pt-4 flex flex-wrap gap-4">
              <button className="bg-[#0077B6] hover:bg-[#005F92] text-white px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wide transition-colors">
                SIP Calculator
              </button>
              <button className="bg-[#0077B6] hover:bg-[#005F92] text-white px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wide transition-colors">
                Goal SIP Calculator
              </button>
              <button className="bg-[#0077B6] hover:bg-[#005F92] text-white px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wide transition-colors">
                Inflation Calculator
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CalculatorCTA;