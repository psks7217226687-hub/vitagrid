import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  FileText,
  Calendar,
  Building2,
  Trash2,
  Edit,
  LogOut,
  Home,
  Stethoscope,
  Pill,
  FlaskConical,
  HeartPulse,
  Syringe,
  QrCode,
  AlertTriangle,
} from "lucide-react";
import vitagridLogo from "@/assets/vitagrid-logo.jpg";
import EmergencyProfileForm from "@/components/EmergencyProfileForm";
import QRCodeShare from "@/components/QRCodeShare";

interface HealthRecord {
  id: string;
  title: string;
  record_type: string;
  provider: string | null;
  record_date: string;
  notes: string | null;
  created_at: string;
}

const recordTypes = [
  { value: "consultation", label: "Consultation", icon: Stethoscope },
  { value: "prescription", label: "Prescription", icon: Pill },
  { value: "lab_result", label: "Lab Result", icon: FlaskConical },
  { value: "imaging", label: "Imaging", icon: HeartPulse },
  { value: "vaccination", label: "Vaccination", icon: Syringe },
  { value: "other", label: "Other", icon: FileText },
];

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [hasEmergencyProfile, setHasEmergencyProfile] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    record_type: "consultation",
    provider: "",
    record_date: new Date().toISOString().split("T")[0],
    notes: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchRecords();
        checkEmergencyProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkEmergencyProfile = async (userId: string) => {
    const { data } = await supabase
      .from("emergency_profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();
    setHasEmergencyProfile(!!data);
  };

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("health_records")
      .select("*")
      .order("record_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch records",
        variant: "destructive",
      });
    } else {
      setRecords(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (editingRecord) {
      const { error } = await supabase
        .from("health_records")
        .update({
          title: formData.title.trim(),
          record_type: formData.record_type,
          provider: formData.provider.trim() || null,
          record_date: formData.record_date,
          notes: formData.notes.trim() || null,
        })
        .eq("id", editingRecord.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update record",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Record updated" });
        fetchRecords();
        resetForm();
      }
    } else {
      const { error } = await supabase.from("health_records").insert({
        title: formData.title.trim(),
        record_type: formData.record_type,
        provider: formData.provider.trim() || null,
        record_date: formData.record_date,
        notes: formData.notes.trim() || null,
        user_id: user?.id,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create record",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Record created" });
        fetchRecords();
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("health_records")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete record",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Record deleted" });
      fetchRecords();
    }
  };

  const handleEdit = (record: HealthRecord) => {
    setEditingRecord(record);
    setFormData({
      title: record.title,
      record_type: record.record_type,
      provider: record.provider || "",
      record_date: record.record_date,
      notes: record.notes || "",
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      record_type: "consultation",
      provider: "",
      record_date: new Date().toISOString().split("T")[0],
      notes: "",
    });
    setEditingRecord(null);
    setIsDialogOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getRecordIcon = (type: string) => {
    const recordType = recordTypes.find((r) => r.value === type);
    const Icon = recordType?.icon || FileText;
    return <Icon className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Health Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.email}. Manage your health records securely.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {records.length}
                </p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {records.filter(
                    (r) =>
                      new Date(r.record_date) >
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
                <p className="text-sm text-muted-foreground">Last 30 Days</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(records.map((r) => r.provider).filter(Boolean)).size}
                </p>
                <p className="text-sm text-muted-foreground">Providers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Health Records
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergency Profile
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Share QR Code
            </TabsTrigger>
          </TabsList>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            {/* Records Section */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Your Health Records
              </h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => resetForm()}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Record
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingRecord ? "Edit Record" : "Add New Record"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Annual Checkup"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="record_type">Type</Label>
                      <Select
                        value={formData.record_type}
                        onValueChange={(value) =>
                          setFormData({ ...formData, record_type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {recordTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider</Label>
                      <Input
                        id="provider"
                        placeholder="e.g., City Hospital"
                        value={formData.provider}
                        onChange={(e) =>
                          setFormData({ ...formData, provider: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="record_date">Date</Label>
                      <Input
                        id="record_date"
                        type="date"
                        value={formData.record_date}
                        onChange={(e) =>
                          setFormData({ ...formData, record_date: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Additional notes..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        {editingRecord ? "Update" : "Create"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Records List */}
            {records.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No records yet
                </h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first health record
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Record
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {getRecordIcon(record.record_type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {record.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="capitalize">
                              {record.record_type.replace("_", " ")}
                            </span>
                            {record.provider && (
                              <>
                                <span>•</span>
                                <span>{record.provider}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>
                              {new Date(record.record_date).toLocaleDateString()}
                            </span>
                          </div>
                          {record.notes && (
                            <p className="mt-2 text-sm text-muted-foreground">
                              {record.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(record)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(record.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Emergency Profile Tab */}
          <TabsContent value="emergency">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Emergency Profile
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    This information will be shared when you generate a QR code
                  </p>
                </div>
              </div>
              {user && (
                <EmergencyProfileForm
                  user={user}
                  onSaved={() => checkEmergencyProfile(user.id)}
                />
              )}
            </div>
          </TabsContent>

          {/* QR Code Share Tab */}
          <TabsContent value="share">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Share with Doctors
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Generate a temporary QR code to share your emergency health info
                  </p>
                </div>
              </div>
              {user && <QRCodeShare user={user} hasProfile={hasEmergencyProfile} />}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
