import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Plus, X } from "lucide-react";

interface EmergencyProfile {
  id: string;
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

interface EmergencyProfileFormProps {
  user: User;
  onSaved: () => void;
}

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const EmergencyProfileForm = ({ user, onSaved }: EmergencyProfileFormProps) => {
  const [profile, setProfile] = useState<EmergencyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    blood_type: "",
    allergies: [] as string[],
    medications: [] as string[],
    medical_conditions: [] as string[],
    emergency_contact_name: "",
    emergency_contact_phone: "",
    additional_notes: "",
  });
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("emergency_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profile",
        variant: "destructive",
      });
    } else if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name,
        date_of_birth: data.date_of_birth || "",
        blood_type: data.blood_type || "",
        allergies: data.allergies || [],
        medications: data.medications || [],
        medical_conditions: data.medical_conditions || [],
        emergency_contact_name: data.emergency_contact_name || "",
        emergency_contact_phone: data.emergency_contact_phone || "",
        additional_notes: data.additional_notes || "",
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name.trim()) {
      toast({
        title: "Error",
        description: "Full name is required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const profileData = {
      user_id: user.id,
      full_name: formData.full_name.trim(),
      date_of_birth: formData.date_of_birth || null,
      blood_type: formData.blood_type || null,
      allergies: formData.allergies.length > 0 ? formData.allergies : null,
      medications: formData.medications.length > 0 ? formData.medications : null,
      medical_conditions: formData.medical_conditions.length > 0 ? formData.medical_conditions : null,
      emergency_contact_name: formData.emergency_contact_name.trim() || null,
      emergency_contact_phone: formData.emergency_contact_phone.trim() || null,
      additional_notes: formData.additional_notes.trim() || null,
    };

    let error;
    if (profile) {
      const result = await supabase
        .from("emergency_profiles")
        .update(profileData)
        .eq("id", profile.id);
      error = result.error;
    } else {
      const result = await supabase
        .from("emergency_profiles")
        .insert(profileData);
      error = result.error;
    }

    setSaving(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Emergency profile saved" });
      fetchProfile();
      onSaved();
    }
  };

  const addItem = (type: "allergies" | "medications" | "medical_conditions", value: string, setValue: (v: string) => void) => {
    if (value.trim()) {
      setFormData({
        ...formData,
        [type]: [...formData[type], value.trim()],
      });
      setValue("");
    }
  };

  const removeItem = (type: "allergies" | "medications" | "medical_conditions", index: number) => {
    setFormData({
      ...formData,
      [type]: formData[type].filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="text-muted-foreground p-4">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            placeholder="John Doe"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_of_birth">Date of Birth</Label>
          <Input
            id="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="blood_type">Blood Type</Label>
          <Select
            value={formData.blood_type}
            onValueChange={(value) => setFormData({ ...formData, blood_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              {bloodTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Allergies */}
      <div className="space-y-2">
        <Label>Allergies</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add allergy..."
            value={newAllergy}
            onChange={(e) => setNewAllergy(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem("allergies", newAllergy, setNewAllergy);
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => addItem("allergies", newAllergy, setNewAllergy)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.allergies.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm"
            >
              {item}
              <button type="button" onClick={() => removeItem("allergies", index)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Medications */}
      <div className="space-y-2">
        <Label>Current Medications</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add medication..."
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem("medications", newMedication, setNewMedication);
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => addItem("medications", newMedication, setNewMedication)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.medications.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
            >
              {item}
              <button type="button" onClick={() => removeItem("medications", index)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="space-y-2">
        <Label>Medical Conditions</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add condition..."
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem("medical_conditions", newCondition, setNewCondition);
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => addItem("medical_conditions", newCondition, setNewCondition)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.medical_conditions.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-accent/10 text-accent-foreground px-3 py-1 rounded-full text-sm"
            >
              {item}
              <button type="button" onClick={() => removeItem("medical_conditions", index)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
          <Input
            id="emergency_contact_name"
            placeholder="Jane Doe"
            value={formData.emergency_contact_name}
            onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
          <Input
            id="emergency_contact_phone"
            placeholder="+1 234 567 8900"
            value={formData.emergency_contact_phone}
            onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div className="space-y-2">
        <Label htmlFor="additional_notes">Additional Notes</Label>
        <Textarea
          id="additional_notes"
          placeholder="Any other important medical information..."
          value={formData.additional_notes}
          onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
          rows={3}
        />
      </div>

      <Button type="submit" disabled={saving} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : profile ? "Update Profile" : "Create Profile"}
      </Button>
    </form>
  );
};

export default EmergencyProfileForm;
