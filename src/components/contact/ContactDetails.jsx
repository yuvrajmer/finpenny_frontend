import React from "react";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

const ContactDetails = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Left Side: Information */}
          <div className="lg:w-2/5 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-1.5 rounded-full text-white">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                  Contact Us
                </span>
              </div>
              <h2 className="text-4xl text-[#2B5A84] leading-tight">
                Get in touch with{" "}
                <span className="text-[#2B5A84] font-bold">Finpenny</span>
              </h2>
              <p className="text-slate-500 text-[16px] leading-relaxed max-w-md">
                Let's discuss your financial goals and build a smarter
                investment plan together.
              </p>
            </div>

            <div className="space-y-8 pt-6 border-t border-slate-100">
              {/* Address */}
              <div className="flex items-start gap-5">
                <div className="bg-[#2B5A84] p-4 rounded-full text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2B5A84] text-lg">
                    Our Address
                  </h3>
                  <p className="text-slate-600 text-[15px] mt-1 leading-relaxed">
                    F-708, Titanium City Center,
                    <br />
                    Satellite, Ahmedabad, Gujarat 380015
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-5">
                <div className="bg-[#2B5A84] p-4 rounded-full text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2B5A84] text-lg">Call us</h3>
                  <p className="text-slate-600 text-[15px] mt-1">
                    +91 94270 49936
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="bg-[#2B5A84] p-4 rounded-full text-white">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#2B5A84] text-lg">
                    Send E-Mail
                  </h3>
                  <p className="text-slate-600 text-[15px] mt-1">
                    nirmitashah15@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-8 pt-10 border-t border-slate-100 font-bold text-[#2B5A84] text-sm">
              <a href="#" className="hover:text-[#D9231D] transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-[#D9231D] transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-[#D9231D] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-3/5 bg-white">
            <h3 className="text-2xl font-semibold text-[#2B5A84] mb-10 mt-15">
              Let’s Contact with us
            </h3>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="First Name *"
                    className="w-full border-b border-slate-300 py-3 focus:border-[#2B5A84] outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full border-b border-slate-300 py-3 focus:border-[#2B5A84] outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full border-b border-slate-300 py-3 focus:border-[#2B5A84] outline-none transition-colors"
                />
              </div>

              <div className="relative flex items-center gap-3 border-b border-slate-300 py-3">
                <span className="text-xl">🇮🇳</span>
                <input
                  type="text"
                  placeholder="Phone Number *"
                  className="w-full focus:border-[#2B5A84] outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder="Message *"
                  rows="4"
                  className="w-full border border-slate-300 p-4 rounded-md focus:border-[#2B5A84] outline-none transition-colors resize-none"
                ></textarea>
                <span className="absolute bottom-2 right-2 text-[10px] text-slate-400">
                  0 / 2000
                </span>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="mt-1 border-slate-300 rounded"
                  />
                  <span>
                    Yes, I agree with the{" "}
                    <a href="#" className="text-[#2B5A84] underline">
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#2B5A84] underline">
                      terms and conditions
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* Placeholder for reCAPTCHA as seen in image */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded flex items-center justify-between w-full max-w-[300px]">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-slate-300 bg-white"></div>
                  <span className="text-sm">I'm not a robot</span>
                </div>
                <img
                  src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                  alt="reCAPTCHA"
                  className="w-8 h-8 opacity-70"
                />
              </div>

              <button
                type="submit"
                className="bg-[#2B5A84] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#1a3a5a] transition-all shadow-lg active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
