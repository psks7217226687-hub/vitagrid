import { Heart, DollarSign, Wifi, HandHeart } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation, fadeInUp, staggerContainer, staggerItem } from "@/hooks/useScrollAnimation";

const impacts = [
  {
    icon: Heart,
    title: "Saves Lives in Emergencies",
    description: "Instant access to critical health info when seconds count. No more waiting for records.",
    stat: "Lives Saved",
    gradient: "from-destructive to-destructive/70",
  },
  {
    icon: DollarSign,
    title: "Reduces Healthcare Costs",
    description: "Eliminates duplicate tests and unnecessary procedures by providing complete history.",
    stat: "$150B+ Saved",
    gradient: "from-accent to-lime-600",
  },
  {
    icon: Wifi,
    title: "Works in Low-Connectivity Areas",
    description: "Offline emergency profile ensures access even in remote or disaster situations.",
    stat: "Always On",
    gradient: "from-primary to-teal-600",
  },
  {
    icon: HandHeart,
    title: "Improves Patient Trust",
    description: "Transparency and control build confidence between patients and healthcare providers.",
    stat: "Trust Built",
    gradient: "from-primary to-accent",
  },
];

const ImpactSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="impact" className="section-padding bg-secondary/30">
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
            Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Real-World <span className="gradient-text">Outcomes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            VitaGrid isn't just a technology — it's a movement toward patient empowerment 
            and better healthcare outcomes for everyone.
          </p>
        </motion.div>

        {/* Impact Cards */}
        <motion.div 
          className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {impacts.map((impact) => (
            <motion.div
              key={impact.title}
              className="card-elevated p-6 group overflow-hidden relative"
              variants={staggerItem}
            >
              {/* Background gradient accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${impact.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative">
                <div className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${impact.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <impact.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {impact.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {impact.description}
                </p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {impact.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
