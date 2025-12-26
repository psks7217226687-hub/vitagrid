import { ArrowRight, Smartphone, Shield, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="section-container py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 mb-6 animate-fade-in-up">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Patient-Owned Health Records
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in-up delay-100">
              Your Medical Records.{" "}
              <span className="gradient-text">One Grid.</span>{" "}
              Total Control.
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
              VitaGrid is a secure, patient-owned health wallet that unifies medical records 
              and enables instant, consent-based access — even offline.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <a href="#how-it-works" className="btn-primary">
                See How It Works
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#demo" className="btn-secondary">
                <Zap className="w-5 h-5 text-accent" />
                Emergency Access Demo
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-10 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Works Offline</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Mock Dashboard */}
          <div className="relative animate-fade-in-up delay-200">
            <div className="relative">
              {/* Main card */}
              <div className="card-elevated p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Patient Health Wallet</p>
                    <h3 className="text-xl font-bold text-foreground">Sarah Johnson</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                    SJ
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded-xl bg-teal-50">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground">Records</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-lime-50">
                    <p className="text-2xl font-bold text-accent">3</p>
                    <p className="text-xs text-muted-foreground">Doctors</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-secondary">
                    <p className="text-2xl font-bold text-foreground">5</p>
                    <p className="text-xs text-muted-foreground">Shares</p>
                  </div>
                </div>

                {/* Recent Records */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-lg">🔬</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">Blood Test Report</p>
                      <p className="text-xs text-muted-foreground">City Hospital • Dec 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <span className="text-lg">🏥</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">X-Ray Results</p>
                      <p className="text-xs text-muted-foreground">Metro Clinic • Nov 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating QR card */}
              <div className="absolute -bottom-6 -right-6 card-elevated p-4 animate-float shadow-glow">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-foreground rounded-lg flex items-center justify-center">
                    <div className="w-10 h-10 bg-background rounded grid grid-cols-3 gap-0.5 p-1">
                      {[...Array(9)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`rounded-sm ${i % 2 === 0 ? 'bg-foreground' : 'bg-transparent'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">Emergency QR</p>
                    <p className="text-xs text-muted-foreground">Scan for access</p>
                  </div>
                </div>
              </div>

              {/* Floating shield */}
              <div className="absolute -top-4 -left-4 card-elevated p-3 animate-pulse-soft">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
