import { AlertTriangle, Clock, FileX, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, staggerContainer, staggerItem } from "@/hooks/useScrollAnimation";

const problems = [
  {
    icon: FileX,
    title: "Fragmented Records",
    description: "Medical records are scattered across hospitals, clinics, and labs with no central access point.",
  },
  {
    icon: Clock,
    title: "Critical Delays",
    description: "Patients wait hours or days to retrieve records, leading to repeated tests and delayed treatments.",
  },
  {
    icon: AlertTriangle,
    title: "Medical Errors",
    description: "Incomplete medical history causes misdiagnosis, drug interactions, and preventable complications.",
  },
  {
    icon: Users,
    title: "No Patient Control",
    description: "Patients can't decide who sees their data or track who accessed their sensitive information.",
  },
];

const ProblemSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="problem" className="section-padding bg-secondary/30">
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
          <span className="inline-block text-sm font-semibold text-destructive uppercase tracking-wider mb-4">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Healthcare Data is Broken
          </h2>
          <p className="text-lg text-muted-foreground">
            Every year, millions of patients face delays, errors, and frustration because their 
            medical records are locked away in silos they can't access or control.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              className="card-elevated p-6 text-center group"
              variants={staggerItem}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <problem.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="mt-16 p-8 rounded-3xl bg-foreground text-primary-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">30%</p>
              <p className="text-primary-foreground/70">of tests are repeated due to lost records</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">250K+</p>
              <p className="text-primary-foreground/70">deaths annually from medical errors</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold mb-2">$150B</p>
              <p className="text-primary-foreground/70">wasted on duplicate procedures</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
