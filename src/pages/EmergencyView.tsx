import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  User,
  Calendar,
  Droplet,
  AlertCircle,
  Pill,
  HeartPulse,
  Phone,
  FileText,
  Home,
  ShieldCheck,
} from "lucide-react";
import vitagridLogo from "@/assets/vitagrid-logo.jpg";

interface EmergencyProfile {
  full_name: string;
  date_of_birth: string | null;
  blood_type: string | null;
  allergies: string[] | null;
  medications: string[] | null;
  medical_conditions: string[] | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  additional_notes: string | null;
}

const EmergencyView = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<EmergencyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    const { data, error } = await supabase.rpc("get_emergency_profile_by_token", {
      token: token,
    });

    if (error) {
      setError("Failed to load profile");
    } else if (!data || data.length === 0) {
      setError("This link has expired or is invalid");
    } else {
      setProfile(data[0]);
    }
    setLoading(false);
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading emergency information...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
          <div className="section-container">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <img
                  src={vitagridLogo}
                  alt="VitaGrid Logo"
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <span className="text-xl font-bold text-foreground">
                  Vita<span className="text-primary">Grid</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="section-container py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Link Unavailable
            </h1>
            <p className="text-muted-foreground mb-6">
              {error || "This emergency profile link has expired or is no longer valid."}
            </p>
            <Button onClick={() => navigate("/")}>
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-destructive/10 sticky top-0 z-50">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <span className="text-lg font-bold text-destructive">
                Emergency Health Information
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span>Temporary Access</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-container py-8 max-w-3xl mx-auto">
        {/* Patient Info */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {profile.full_name}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground">
                {profile.date_of_birth && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(profile.date_of_birth).toLocaleDateString()} (
                      {calculateAge(profile.date_of_birth)} years old)
                    </span>
                  </div>
                )}
                {profile.blood_type && (
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-destructive" />
                    <span className="font-semibold text-destructive">
                      Blood Type: {profile.blood_type}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Critical Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Allergies */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h2 className="font-semibold text-destructive">Allergies</h2>
            </div>
            {profile.allergies && profile.allergies.length > 0 ? (
              <ul className="space-y-2">
                {profile.allergies.map((allergy, index) => (
                  <li
                    key={index}
                    className="bg-destructive/10 text-destructive px-3 py-2 rounded-lg font-medium"
                  >
                    {allergy}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No known allergies</p>
            )}
          </div>

          {/* Medications */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Pill className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-primary">Current Medications</h2>
            </div>
            {profile.medications && profile.medications.length > 0 ? (
              <ul className="space-y-2">
                {profile.medications.map((medication, index) => (
                  <li
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-2 rounded-lg"
                  >
                    {medication}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No current medications</p>
            )}
          </div>
        </div>

        {/* Medical Conditions */}
        {profile.medical_conditions && profile.medical_conditions.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="w-5 h-5 text-foreground" />
              <h2 className="font-semibold text-foreground">Medical Conditions</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.medical_conditions.map((condition, index) => (
                <span
                  key={index}
                  className="bg-muted px-3 py-2 rounded-lg text-foreground"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        {(profile.emergency_contact_name || profile.emergency_contact_phone) && (
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-accent-foreground" />
              <h2 className="font-semibold text-accent-foreground">Emergency Contact</h2>
            </div>
            <div className="space-y-2">
              {profile.emergency_contact_name && (
                <p className="text-foreground font-medium">
                  {profile.emergency_contact_name}
                </p>
              )}
              {profile.emergency_contact_phone && (
                <a
                  href={`tel:${profile.emergency_contact_phone}`}
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {profile.emergency_contact_phone}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Additional Notes */}
        {profile.additional_notes && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-foreground" />
              <h2 className="font-semibold text-foreground">Additional Notes</h2>
            </div>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {profile.additional_notes}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <img
              src={vitagridLogo}
              alt="VitaGrid"
              className="w-6 h-6 rounded object-cover"
            />
            <span>Powered by VitaGrid</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyView;
