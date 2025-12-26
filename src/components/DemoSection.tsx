import { QrCode, Smartphone, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, staggerContainer, staggerItem } from "@/hooks/useScrollAnimation";

const demoSteps = [
  {
    icon: QrCode,
    title: "Doctor Scans QR",
    description: "ER doctor scans patient's VitaGrid QR code on phone or bracelet",
    bgColor: "bg-teal-50",
    iconColor: "text-primary",
  },
  {
    icon: Smartphone,
    title: "Emergency Info Opens",
    description: "Critical data appears instantly: blood type, allergies, medications",
    bgColor: "bg-lime-50",
    iconColor: "text-accent",
  },
  {
    icon: Clock,
    title: "Full History Access",
    description: "Doctor can request extended access to full medical history",
    bgColor: "bg-teal-50",
    iconColor: "text-primary",
  },
  {
    icon: CheckCircle2,
    title: "Auto-Expires",
    description: "Access automatically expires after the emergency window",
    bgColor: "bg-lime-50",
    iconColor: "text-accent",
  },
];

const DemoSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="demo" className="section-padding">
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
            Emergency Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            When Every Second{" "}
            <span className="gradient-text">Counts</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See how VitaGrid enables instant, secure access to critical health information 
            in emergency situations — even without internet.
          </p>
        </motion.div>

        {/* Demo Flow */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="grid lg:grid-cols-4 gap-6 items-start"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {demoSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="card-elevated p-6 text-center relative"
                variants={staggerItem}
              >
                <div className="step-number mx-auto mb-4">{index + 1}</div>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${step.bgColor} flex items-center justify-center`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                {/* Arrow */}
                {index < demoSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Emergency Card Visual */}
          <motion.div 
            className="mt-12 max-w-md mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="card-elevated p-6 border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 to-background">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-destructive"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-bold text-destructive">EMERGENCY PROFILE</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blood Type</span>
                  <span className="font-bold text-foreground">O+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Allergies</span>
                  <span className="font-bold text-destructive">Penicillin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medications</span>
                  <span className="font-bold text-foreground">Metformin 500mg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Conditions</span>
                  <span className="font-bold text-foreground">Type 2 Diabetes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emergency Contact</span>
                  <span className="font-bold text-foreground">John D. (Spouse)</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border text-center">
                <span className="text-xs text-muted-foreground">
                  Access expires in <span className="font-bold text-primary">24:00:00</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
