import { Upload, Lock, Share2, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload",
    description: "Easily upload all your medical records, prescriptions, and lab reports to your personal health wallet.",
    color: "primary",
  },
  {
    icon: Lock,
    number: "02",
    title: "Control",
    description: "Your data is encrypted and stored securely. You decide who can see it and for how long.",
    color: "accent",
  },
  {
    icon: Share2,
    number: "03",
    title: "Share",
    description: "Grant instant access to doctors via QR code. Revoke access anytime with one tap.",
    color: "primary",
  },
];

const SolutionSection = () => {
  return (
    <section id="solution" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            The Solution
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Meet <span className="gradient-text">VitaGrid</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A patient-first health data grid that puts you in complete control of your medical records. 
            Secure, unified, and accessible — even when you're offline.
          </p>
        </div>

        {/* 3-Step Flow */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20 -translate-y-1/2" />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="card-elevated p-8 text-center h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold">
                    Step {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-20 h-20 mx-auto mt-4 mb-6 rounded-3xl flex items-center justify-center ${
                    step.color === 'primary' ? 'bg-teal-50' : 'bg-lime-50'
                  }`}>
                    <step.icon className={`w-10 h-10 ${
                      step.color === 'primary' ? 'text-primary' : 'text-accent'
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow between cards */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-teal-50 border border-teal-100">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <span className="text-2xl">🔐</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Complete Ownership</h4>
              <p className="text-sm text-muted-foreground">Your data, your rules</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-lime-50 border border-lime-100">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Instant Access</h4>
              <p className="text-sm text-muted-foreground">Share in seconds via QR</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary border border-border">
            <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center shrink-0">
              <span className="text-2xl">📴</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Offline Ready</h4>
              <p className="text-sm text-muted-foreground">Works without internet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
