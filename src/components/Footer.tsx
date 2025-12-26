import { Shield, Github, Mail } from "lucide-react";
import vitagridLogo from "@/assets/vitagrid-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <img 
                src={vitagridLogo} 
                alt="VitaGrid Logo" 
                className="w-10 h-10 rounded-xl object-cover"
              />
              <span className="text-xl font-bold">
                Vita<span className="text-primary">Grid</span>
              </span>
            </div>
            <p className="text-primary-foreground/60 flex items-center justify-center md:justify-start gap-2">
              <Shield className="w-4 h-4" />
              Secure. Patient-Owned. Emergency-Ready.
            </p>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">GitHub</span>
            </a>
            <a 
              href="mailto:hello@vitagrid.health" 
              className="flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm">Contact</span>
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-primary-foreground/10 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
            <p className="text-sm text-primary-foreground/50">
              © 2024 VitaGrid. Built with ❤️ for healthcare innovation.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium">Hackathon Project</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
