import { Upload, Lock, WifiOff, QrCode, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: Upload,
    title: "Patient Uploads Records",
    description: "Upload medical records, lab results, prescriptions from any hospital or clinic.",
  },
  {
    icon: Lock,
    title: "Data Encrypted & Stored",
    description: "All data is encrypted with your personal key. Stored securely in the cloud.",
  },
  {
    icon: WifiOff,
    title: "Emergency Info Available Offline",
    description: "Critical health info saved locally for access even without internet.",
  },
  {
    icon: QrCode,
    title: "Doctor Requests Access via QR",
    description: "Healthcare provider scans your QR code to request access to your records.",
  },
  {
    icon: CheckCircle2,
    title: "Patient Grants Time-Limited Consent",
    description: "You approve access for a specific duration. Access expires automatically.",
  },
];

const HowItWorksSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="how-it-works" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <motion.div 
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple, Secure, <span className="gradient-text">Seamless</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From upload to consent, VitaGrid makes managing your health records effortless.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary lg:-translate-x-1/2" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step number circle */}
              <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10">
                <div className="step-number shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              {/* Content card */}
              <div className={`ml-20 lg:ml-0 lg:w-5/12 ${
                index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left lg:ml-auto'
              }`}>
                <div className="card-elevated p-6">
                  <div className={`flex items-center gap-3 mb-3 ${
                    index % 2 === 0 ? 'lg:justify-end' : ''
                  }`}>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center lg:order-2">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground lg:order-1">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
