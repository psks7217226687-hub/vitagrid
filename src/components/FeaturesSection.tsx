import { Wallet, QrCode, WifiOff, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, staggerContainer, staggerItem } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Wallet,
    title: "Patient-Controlled Health Wallet",
    description: "All your medical records, prescriptions, and health data in one secure digital wallet that only you control.",
    gradient: "from-primary to-teal-600",
  },
  {
    icon: QrCode,
    title: "Consent-Based Record Sharing",
    description: "Share records instantly via QR code. Set time limits — access expires automatically after the duration you choose.",
    gradient: "from-accent to-lime-600",
  },
  {
    icon: WifiOff,
    title: "Offline Emergency Profile",
    description: "Critical health info available even without internet. Blood type, allergies, medications — always accessible.",
    gradient: "from-teal-600 to-primary",
  },
  {
    icon: Clock,
    title: "Doctor-Friendly Timeline View",
    description: "Healthcare providers see a clean chronological view of your medical history for faster, better decisions.",
    gradient: "from-lime-600 to-accent",
  },
  {
    icon: Eye,
    title: "Full Access Audit & Transparency",
    description: "See exactly who accessed your records, when, and what they viewed. Complete visibility into your data.",
    gradient: "from-primary to-accent",
  },
];

const FeaturesSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="features" className="section-padding bg-secondary/30">
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
            Key Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="gradient-text">Own Your Health</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed with privacy-first principles and real-world healthcare needs in mind.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`card-elevated p-6 group ${
                index === features.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              variants={staggerItem}
            >
              {/* Icon */}
              <div className={`w-14 h-14 mb-5 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
