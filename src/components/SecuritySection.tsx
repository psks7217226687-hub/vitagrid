import { Shield, Key, Lock, RefreshCw, Eye, Server } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, staggerContainer, staggerItem } from "@/hooks/useScrollAnimation";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Your data is encrypted before it leaves your device. Only you hold the keys.",
  },
  {
    icon: Server,
    title: "Zero-Knowledge Storage",
    description: "We can't read your data. Even our servers only see encrypted information.",
  },
  {
    icon: Key,
    title: "Patient-Owned Access Control",
    description: "You decide who sees what, when, and for how long. Full control, always.",
  },
  {
    icon: RefreshCw,
    title: "Access Revocation Anytime",
    description: "Changed your mind? Revoke access instantly with a single tap.",
  },
  {
    icon: Eye,
    title: "Complete Audit Trail",
    description: "Every access is logged. See who viewed your records and when.",
  },
  {
    icon: Shield,
    title: "Healthcare Compliant",
    description: "Built to meet healthcare data protection standards and regulations.",
  },
];

const SecuritySection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="security" className="section-padding bg-foreground text-primary-foreground">
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
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Security & Privacy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Your Privacy is{" "}
            <span className="text-primary">Non-Negotiable</span>
          </h2>
          <p className="text-lg text-primary-foreground/70">
            VitaGrid is built on a foundation of zero-trust security. Your health data 
            is protected by the same encryption used by banks and governments.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {securityFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors duration-300 group"
              variants={staggerItem}
            >
              <div className="w-12 h-12 mb-4 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badge */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-primary/20 border border-primary/30">
            <Shield className="w-10 h-10 text-primary" />
            <div className="text-left">
              <p className="font-bold">Enterprise-Grade Security</p>
              <p className="text-sm text-primary-foreground/70">256-bit AES encryption • Zero-knowledge architecture</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;
