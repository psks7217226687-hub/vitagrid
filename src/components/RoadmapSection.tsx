import { Sparkles, Watch, IdCard, Globe } from "lucide-react";

const roadmapItems = [
  {
    icon: Sparkles,
    title: "AI-Generated Medical Summaries",
    description: "Smart summaries of your health history, generated securely using AI.",
    status: "In Development",
    quarter: "Q1 2025",
  },
  {
    icon: Watch,
    title: "Wearable Data Integration",
    description: "Connect smartwatches and fitness trackers for real-time health monitoring.",
    status: "Planned",
    quarter: "Q2 2025",
  },
  {
    icon: IdCard,
    title: "Government Health ID Support",
    description: "Integration with national digital health ID systems worldwide.",
    status: "Research",
    quarter: "Q3 2025",
  },
  {
    icon: Globe,
    title: "Multilingual Accessibility",
    description: "Full support for 20+ languages to reach patients globally.",
    status: "Planned",
    quarter: "Q2 2025",
  },
];

const RoadmapSection = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development":
        return "bg-primary text-primary-foreground";
      case "Planned":
        return "bg-accent text-accent-foreground";
      case "Research":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Future Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What's <span className="gradient-text">Coming Next</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We're constantly evolving VitaGrid to better serve patients and healthcare providers worldwide.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            
            {roadmapItems.map((item, index) => (
              <div key={item.title} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Timeline dot */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 card-elevated p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {item.description}
                  </p>
                  <span className="text-sm font-medium text-primary">
                    Target: {item.quarter}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
