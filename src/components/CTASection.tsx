import { ArrowRight, Play } from "lucide-react";

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 text-center"
          style={{ background: "var(--gradient-primary)" }}>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Healthcare Data, Finally{" "}
              <span className="underline decoration-4 underline-offset-8 decoration-primary-foreground/50">
                Patient-Owned
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join the movement to put patients back in control of their health data. 
              Experience secure, unified, and accessible medical records.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#demo" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-primary-foreground text-foreground hover:bg-primary-foreground/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5" />
                View Demo
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
              >
                Join the Pilot
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
