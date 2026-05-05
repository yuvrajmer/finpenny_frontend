import React, { useState, useCallback, useEffect } from "react";
import { MapPin, Phone, Mail, CheckCircle2, Send, Loader2, ShieldCheck, AlertCircle, X, CheckCircle } from "lucide-react";

// ══════════════════════════════════════════════════════════════
//  SECURITY & VALIDATION HELPERS
// ══════════════════════════════════════════════════════════════
const SQL_PATTERNS = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|FROM|WHERE|TABLE|DATABASE|SCRIPT)\b|--|;|\/\*|\*\/|xp_|0x[0-9a-f]+)/gi;
const XSS_PATTERNS = /<[^>]*>|javascript:|on\w+\s*=|eval\s*\(|document\.|window\.|alert\s*\(|confirm\s*\(|prompt\s*\(|fetch\s*\(|XMLHttpRequest/gi;
const SPAM_PATTERNS = /\b(viagra|cialis|casino|poker|loan|crypto|bitcoin|forex|click here|buy now|free money|make money fast|work from home)\b/gi;

function isSuspicious(value) {
  return SQL_PATTERNS.test(value) || XSS_PATTERNS.test(value);
}
function sanitize(value) {
  return String(value).replace(/<[^>]*>/g, "").replace(/[<>"'`]/g, "").trim();
}
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
}
function isValidPhone(phone) {
  const digits = phone.replace(/[\s\-\(\)+]/g, "");
  return /^[6-9]\d{9}$/.test(digits);
}
function isValidName(name) {
  return /^[a-zA-Z\s'\-\.]{2,50}$/.test(name.trim());
}
function isSpam(message) {
  return SPAM_PATTERNS.test(message);
}
const SUBMIT_LOG = [];
function isRateLimited() {
  const now = Date.now();
  const window = 10 * 60 * 1000;
  return SUBMIT_LOG.filter(t => now - t < window).length >= 3;
}
function logSubmit() { SUBMIT_LOG.push(Date.now()); }

function validateField(name, value) {
  const v = typeof value === "string" ? value.trim() : value;
  switch (name) {
    case "firstName":
      if (!v) return "First name is required.";
      if (v.length < 2) return "First name must be at least 2 characters.";
      if (v.length > 50) return "First name must be under 50 characters.";
      if (!isValidName(v)) return "Only letters, spaces, hyphens, or apostrophes allowed.";
      if (isSuspicious(v)) return "Invalid characters detected.";
      return null;
    case "lastName":
      if (v && v.length > 50) return "Last name must be under 50 characters.";
      if (v && !isValidName(v)) return "Only letters, spaces, hyphens, or apostrophes allowed.";
      if (v && isSuspicious(v)) return "Invalid characters detected.";
      return null;
    case "email":
      if (!v) return "Email address is required.";
      if (v.length > 100) return "Email address is too long.";
      if (!isValidEmail(v)) return "Enter a valid email (e.g. name@example.com).";
      if (isSuspicious(v)) return "Invalid characters detected.";
      return null;
    case "phone":
      if (!v) return "Phone number is required.";
      if (isSuspicious(v)) return "Invalid characters detected.";
      if (!isValidPhone(v)) return "Enter a valid 10-digit mobile number (starts with 6–9).";
      return null;
    case "message":
      if (!v) return "Please enter your message.";
      if (v.length < 10) return "Message must be at least 10 characters.";
      if (v.length > 2000) return "Message exceeds 2000 characters.";
      if (isSuspicious(v)) return "Message contains invalid or harmful content.";
      if (isSpam(v)) return "Message appears to contain spam. Please rephrase.";
      return null;
    case "agreeToPolicy":
      if (!value) return "You must agree to the privacy policy.";
      return null;
    case "robotCheck":
      if (!value) return "Please confirm you are not a robot.";
      return null;
    default:
      return null;
  }
}

// ══════════════════════════════════════════════════════════════
//  SUCCESS POPUP COMPONENT
// ══════════════════════════════════════════════════════════════
const SuccessPopup = ({ show, onClose, name }) => {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 5000);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(10, 20, 40, 0.45)",
          backdropFilter: "blur(4px)",
          zIndex: 9998,
          animation: "fadeIn 0.25s ease",
        }}
      />

      {/* Popup */}
      <div style={{
        position: "fixed",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        width: "90%", maxWidth: "420px",
        animation: "popupIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.04)",
        }}>

          {/* Top accent bar */}
          <div style={{
            height: "5px",
            background: "linear-gradient(90deg, #2B5A84, #4a9fd4, #2B5A84)",
          }} />

          {/* Body */}
          <div style={{ padding: "36px 32px 28px", textAlign: "center" }}>

            {/* Icon circle */}
            <div style={{
              width: "72px", height: "72px",
              background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 8px 24px rgba(34, 197, 94, 0.2)",
            }}>
              <CheckCircle size={36} color="#16a34a" strokeWidth={2} />
            </div>

            {/* Heading */}
            <h3 style={{
              fontSize: "20px", fontWeight: "700",
              color: "#1a2332", marginBottom: "8px",
              fontFamily: "Inter, sans-serif",
            }}>
              Message Sent! 🎉
            </h3>

            {/* Subtext */}
            <p style={{
              fontSize: "14px", color: "#6b7a8d",
              lineHeight: "1.6", marginBottom: "6px",
            }}>
              Thank you{name ? `, ${name}` : ""}! Your message has been received.
            </p>
            <p style={{
              fontSize: "13px", color: "#9ca3af",
              lineHeight: "1.6", marginBottom: "28px",
            }}>
              Our team will get back to you within <strong style={{ color: "#2B5A84" }}>24–48 hours</strong>.
            </p>

            {/* Divider */}
            <div style={{ height: "1px", background: "#f0f4f8", marginBottom: "20px" }} />

            {/* Info row */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "24px",
              marginBottom: "24px",
            }}>
              {[
                { icon: "📧", text: "Email confirmation sent" },
                { icon: "🔒", text: "Data secured" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "14px" }}>{item.icon}</span>
                  <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "500" }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, #2B5A84, #1a3a5a)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "0.3px",
                transition: "opacity 0.2s",
              }}
              onMouseOver={e => e.target.style.opacity = "0.9"}
              onMouseOut={e => e.target.style.opacity = "1"}
            >
              Done
            </button>

            {/* Auto-close hint */}
            <p style={{ fontSize: "11px", color: "#d1d5db", marginTop: "12px" }}>
              This will close automatically in 5 seconds
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes popupIn {
          from { transform: translate(-50%, -45%); opacity: 0; }
          to   { transform: translate(-50%, -50%); opacity: 1; }
        }
      `}</style>
    </>
  );
};

// ══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════
const ContactDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", message: "", agreeToPolicy: false, robotCheck: false,
  });
  const [errors, setErrors]             = useState({});
  const [touched, setTouched]           = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup]       = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [charCount, setCharCount]       = useState(0);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newVal }));
    if (name === "message") setCharCount(value.length);
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, newVal) }));
    }
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, val) }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFields = ["firstName","lastName","email","phone","message","agreeToPolicy","robotCheck"];
    setTouched(Object.fromEntries(allFields.map(f => [f, true])));
    const newErrors = {};
    allFields.forEach(f => {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    if (isRateLimited()) {
      setErrors({ firstName: "Too many submissions. Please wait 10 minutes." });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        firstName: sanitize(formData.firstName),
        lastName:  sanitize(formData.lastName),
        email:     sanitize(formData.email).toLowerCase(),
        phone:     formData.phone.replace(/[\s\-\(\)+]/g, "").slice(0, 10),
        message:   sanitize(formData.message),
      };
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        logSubmit();
        setSubmittedName(sanitize(formData.firstName));
        setShowPopup(true);
        setFormData({ firstName:"", lastName:"", email:"", phone:"", message:"", agreeToPolicy:false, robotCheck:false });
        setErrors({}); setTouched({}); setCharCount(0);
      } else {
        setErrors({ firstName: data.message || "Server error. Please try again." });
      }
    } catch {
      setErrors({ firstName: "Cannot connect to the server. Make sure the backend is running." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FieldError = ({ name }) =>
    touched[name] && errors[name] ? (
      <div className="flex items-center gap-1.5 mt-1.5">
        <AlertCircle size={12} className="text-red-500 flex-shrink-0" />
        <span className="text-red-500 text-xs">{errors[name]}</span>
      </div>
    ) : null;

  const fieldClass = (name) =>
    `w-full border-b py-3 outline-none transition-all duration-200 text-sm ${
      touched[name] && errors[name]  ? "border-red-400 text-red-600 placeholder-red-300"
      : touched[name] && !errors[name] ? "border-green-400"
      : "border-slate-300 focus:border-[#2B5A84]"
    }`;

  return (
    <>
      <SuccessPopup show={showPopup} onClose={() => setShowPopup(false)} name={submittedName} />

      <section className="py-24 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* ── Left Info ── */}
            <div className="lg:w-2/5 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-red-600 p-1.5 rounded-full text-white"><CheckCircle2 size={18}/></div>
                  <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
                </div>
                <h2 className="text-4xl text-[#2B5A84] leading-tight">
                  Get in touch with <span className="font-bold">Finpenny</span>
                </h2>
                <p className="text-slate-500 text-[16px] leading-relaxed max-w-md">
                  Let's discuss your financial goals and build a smarter investment plan together.
                </p>
              </div>
              <div className="space-y-8 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-5">
                  <div className="bg-[#2B5A84] p-4 rounded-full text-white"><MapPin size={24}/></div>
                  <div>
                    <h3 className="font-semibold text-[#2B5A84] text-lg">Our Address</h3>
                    <p className="text-slate-600 text-[15px] mt-1 leading-relaxed">F-708, Titanium City Center,<br/>Satellite, Ahmedabad, Gujarat 380015</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-[#2B5A84] p-4 rounded-full text-white"><Phone size={24}/></div>
                  <div>
                    <h3 className="font-semibold text-[#2B5A84] text-lg">Call us</h3>
                    <p className="text-slate-600 text-[15px] mt-1">+91 94270 49936</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-[#2B5A84] p-4 rounded-full text-white"><Mail size={24}/></div>
                  <div>
                    <h3 className="font-semibold text-[#2B5A84] text-lg">Send E-Mail</h3>
                    <p className="text-slate-600 text-[15px] mt-1">nirmitashah15@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-8 pt-10 border-t border-slate-100 font-bold text-[#2B5A84] text-sm">
                <a href="#" className="hover:text-[#D9231D] transition-colors">Facebook</a>
                <a href="#" className="hover:text-[#D9231D] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#D9231D] transition-colors">LinkedIn</a>
              </div>
            </div>

            {/* ── Right Form ── */}
            <div className="lg:w-3/5 bg-white">
              <h3 className="text-2xl font-semibold text-[#2B5A84] mb-10 mt-15">Let's Contact with us</h3>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur}
                      placeholder="First Name *" maxLength={50} className={fieldClass("firstName")} />
                    <FieldError name="firstName"/>
                  </div>
                  <div>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Last Name" maxLength={50} className={fieldClass("lastName")} />
                    <FieldError name="lastName"/>
                  </div>
                </div>

                <div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur}
                    placeholder="Email Address *" maxLength={100} className={fieldClass("email")} />
                  <FieldError name="email"/>
                </div>

                <div>
                  <div className={`flex items-center gap-3 border-b py-3 transition-all duration-200 ${
                    touched.phone && errors.phone ? "border-red-400" : touched.phone && !errors.phone ? "border-green-400" : "border-slate-300"
                  }`}>
                    <span className="text-xl flex-shrink-0">🇮🇳</span>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                      placeholder="10-digit Mobile Number *" maxLength={10} className="w-full outline-none text-sm bg-transparent" />
                  </div>
                  <FieldError name="phone"/>
                </div>

                <div>
                  <div className="relative">
                    <textarea name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Your Message * (min 10 characters)" rows="4" maxLength={2000}
                      className={`w-full border p-4 rounded-md outline-none transition-all duration-200 resize-none text-sm ${
                        touched.message && errors.message ? "border-red-400"
                        : touched.message && !errors.message ? "border-green-400"
                        : "border-slate-300 focus:border-[#2B5A84]"
                      }`} />
                    <span className={`absolute bottom-2 right-2 text-[10px] ${charCount > 1800 ? "text-red-400" : "text-slate-400"}`}>
                      {charCount} / 2000
                    </span>
                  </div>
                  <FieldError name="message"/>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer text-sm text-slate-600">
                    <input type="checkbox" name="agreeToPolicy" checked={formData.agreeToPolicy}
                      onChange={handleChange} onBlur={handleBlur}
                      className="mt-0.5 w-4 h-4 accent-[#2B5A84] cursor-pointer" />
                    <span>
                      I agree to the{" "}
                      <a href="/privacy-policy" className="text-[#2B5A84] underline hover:text-[#D9231D]">privacy policy</a>
                      {" "}and{" "}
                      <a href="#" className="text-[#2B5A84] underline hover:text-[#D9231D]">terms and conditions</a>.
                    </span>
                  </label>
                  <FieldError name="agreeToPolicy"/>
                </div>

                <div>
                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 select-none ${
                      formData.robotCheck ? "border-green-400 bg-green-50"
                      : touched.robotCheck && errors.robotCheck ? "border-red-300 bg-red-50"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }`}
                    style={{ maxWidth: "300px" }}
                  >
                    <div className="flex items-center gap-3">
                      <input type="checkbox" name="robotCheck" checked={formData.robotCheck}
                        onChange={handleChange} onBlur={handleBlur}
                        className="w-5 h-5 accent-[#2B5A84] cursor-pointer" />
                      <span className={`text-sm font-medium ${formData.robotCheck ? "text-green-700" : "text-slate-600"}`}>
                        {formData.robotCheck ? "✓ Verified" : "I'm not a robot"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" className="w-8 h-8 opacity-60"/>
                      <span className="text-[9px] text-slate-400 mt-0.5">reCAPTCHA</span>
                    </div>
                  </label>
                  <FieldError name="robotCheck"/>
                </div>

                <button type="submit" disabled={isSubmitting}
                  className="bg-[#2B5A84] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#1a3a5a] transition-all shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3">
                  {isSubmitting
                    ? <><Loader2 size={18} className="animate-spin"/> Sending...</>
                    : <><Send size={18}/> Send Message</>
                  }
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactDetails;