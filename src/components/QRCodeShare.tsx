import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Clock, Trash2, Copy, Check } from "lucide-react";

interface SharedLink {
  id: string;
  access_token: string;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

interface QRCodeShareProps {
  user: User;
  hasProfile: boolean;
}

const expirationOptions = [
  { value: "1", label: "1 hour" },
  { value: "6", label: "6 hours" },
  { value: "24", label: "24 hours" },
  { value: "72", label: "3 days" },
  { value: "168", label: "1 week" },
];

const QRCodeShare = ({ user, hasProfile }: QRCodeShareProps) => {
  const [links, setLinks] = useState<SharedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [expiration, setExpiration] = useState("24");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchLinks();
  }, [user]);

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from("shared_access_links")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch shared links",
        variant: "destructive",
      });
    } else {
      setLinks(data || []);
    }
    setLoading(false);
  };

  const createLink = async () => {
    if (!hasProfile) {
      toast({
        title: "Error",
        description: "Please create your emergency profile first",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + parseInt(expiration));

    const { error } = await supabase.from("shared_access_links").insert({
      user_id: user.id,
      expires_at: expiresAt.toISOString(),
    });

    setCreating(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create share link",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Share link created" });
      fetchLinks();
    }
  };

  const deactivateLink = async (id: string) => {
    const { error } = await supabase
      .from("shared_access_links")
      .update({ is_active: false })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate link",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Link deactivated" });
      fetchLinks();
    }
  };

  const getShareUrl = (token: string) => {
    return `${window.location.origin}/emergency/${token}`;
  };

  const copyToClipboard = async (token: string) => {
    try {
      await navigator.clipboard.writeText(getShareUrl(token));
      setCopied(token);
      setTimeout(() => setCopied(null), 2000);
      toast({ title: "Copied", description: "Link copied to clipboard" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const formatExpiration = (expiresAt: string) => {
    const date = new Date(expiresAt);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      return `${Math.floor(hours / 24)} days left`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    } else {
      return `${minutes}m left`;
    }
  };

  if (loading) {
    return <div className="text-muted-foreground p-4">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create New Link */}
      <div className="bg-muted/50 rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Generate QR Code</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Label>Link Expiration</Label>
            <Select value={expiration} onValueChange={setExpiration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {expirationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              onClick={createLink}
              disabled={creating || !hasProfile}
              className="w-full sm:w-auto"
            >
              <QrCode className="w-4 h-4 mr-2" />
              {creating ? "Creating..." : "Generate QR Code"}
            </Button>
          </div>
        </div>
        {!hasProfile && (
          <p className="text-sm text-muted-foreground mt-2">
            Please create your emergency profile before generating QR codes.
          </p>
        )}
      </div>

      {/* Active Links */}
      {links.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Active Share Links</h3>
          <div className="grid gap-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* QR Code */}
                  <div className="flex-shrink-0 flex justify-center">
                    <div className="bg-white p-4 rounded-xl">
                      <QRCodeSVG
                        value={getShareUrl(link.access_token)}
                        size={160}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Share URL</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm bg-muted px-3 py-2 rounded-lg overflow-hidden text-ellipsis">
                          {getShareUrl(link.access_token)}
                        </code>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(link.access_token)}
                        >
                          {copied === link.access_token ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{formatExpiration(link.expires_at)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deactivateLink(link.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Revoke Access
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {links.length === 0 && hasProfile && (
        <div className="text-center py-8 text-muted-foreground">
          <QrCode className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No active share links. Generate a QR code to share your emergency info.</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeShare;
