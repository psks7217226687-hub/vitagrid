import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SecuritySection from "@/components/SecuritySection";
import DemoSection from "@/components/DemoSection";
import ImpactSection from "@/components/ImpactSection";
import RoadmapSection from "@/components/RoadmapSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>VitaGrid - Your Medical Records. One Grid. Total Control.</title>
        <meta 
          name="description" 
          content="VitaGrid is a secure, patient-owned health wallet that unifies medical records and enables instant, consent-based access — even offline. Take control of your healthcare data." 
        />
        <meta name="keywords" content="medical records, health wallet, patient data, healthcare, digital health, EHR, EMR, emergency access" />
        <link rel="canonical" href="https://vitagrid.health" />
        
        {/* Open Graph */}
        <meta property="og:title" content="VitaGrid - Patient-Owned Medical Records" />
        <meta property="og:description" content="Secure, unified, and accessible medical records. Take control of your healthcare data with VitaGrid." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vitagrid.health" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VitaGrid - Your Medical Records. One Grid. Total Control." />
        <meta name="twitter:description" content="Secure, patient-owned health wallet for unified medical records with offline emergency access." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <FeaturesSection />
          <HowItWorksSection />
          <SecuritySection />
          <DemoSection />
          <ImpactSection />
          <RoadmapSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
