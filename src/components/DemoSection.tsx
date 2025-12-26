import { QrCode, Smartphone, Clock, CheckCircle2 } from "lucide-react";

const DemoSection = () => {
  return (
    <section id="demo" className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
        </div>

        {/* Demo Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6 items-start">
            {/* Step 1 */}
            <div className="card-elevated p-6 text-center relative">
              <div className="step-number mx-auto mb-4">1</div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-50 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Doctor Scans QR</h3>
              <p className="text-sm text-muted-foreground">
                ER doctor scans patient's VitaGrid QR code on phone or bracelet
              </p>
              {/* Arrow */}
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary">
                →
              </div>
            </div>

            {/* Step 2 */}
            <div className="card-elevated p-6 text-center relative">
              <div className="step-number mx-auto mb-4">2</div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lime-50 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Emergency Info Opens</h3>
              <p className="text-sm text-muted-foreground">
                Critical data appears instantly: blood type, allergies, medications
              </p>
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary">
                →
              </div>
            </div>

            {/* Step 3 */}
            <div className="card-elevated p-6 text-center relative">
              <div className="step-number mx-auto mb-4">3</div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-50 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Full History Access</h3>
              <p className="text-sm text-muted-foreground">
                Doctor can request extended access to full medical history
              </p>
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-primary">
                →
              </div>
            </div>

            {/* Step 4 */}
            <div className="card-elevated p-6 text-center">
              <div className="step-number mx-auto mb-4">4</div>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-lime-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Auto-Expires</h3>
              <p className="text-sm text-muted-foreground">
                Access automatically expires after the emergency window
              </p>
            </div>
          </div>

          {/* Emergency Card Visual */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="card-elevated p-6 border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 to-background">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
