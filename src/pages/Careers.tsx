import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { SponsorshipFooter } from "@/components/SponsorshipFooter";
import { Briefcase, Users, GraduationCap, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";
import { sanitizeInput, sanitizeOnChange } from "@/lib/sanitize";

const openings = [
  { type: "internship", title: "Software Development Intern", desc: "3-6 month internship in full-stack development. React, Node.js, Supabase.", location: "Buea / Remote" },
  { type: "internship", title: "Graphic Design Intern", desc: "Work on real client projects — branding, social media, and print.", location: "Douala" },
  { type: "freelance", title: "Freelance Videographer", desc: "Project-based cinematography and editing for events and commercials.", location: "Cameroon-wide" },
  { type: "partnership", title: "Strategic Partner — Dance Events", desc: "Collaborate on large-scale dance events, competitions, and workshops.", location: "Pan-African" },
  { type: "internship", title: "Automotive Sales Intern", desc: "Learn vehicle sales, customer relations, and fleet management.", location: "Douala / Buea" },
  { type: "freelance", title: "Freelance Web Developer", desc: "Build client websites, landing pages, and e-commerce solutions.", location: "Remote" },
];

const typeConfig = {
  internship: { icon: <GraduationCap size={16} />, label: "Internship", color: "text-primary" },
  freelance: { icon: <Briefcase size={16} />, label: "Freelance", color: "text-secondary" },
  partnership: { icon: <Users size={16} />, label: "Partnership", color: "text-accent" },
};

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().min(8, "Phone number too short").max(20, "Phone number too long").regex(/^[+\d\s()-]+$/, "Invalid phone format"),
  position: z.string().min(1, "Please select a position"),
  message: z.string().trim().max(500, "Message too long").optional(),
});

type FormErrors = Partial<Record<keyof z.infer<typeof applicationSchema>, string>>;

const Careers = () => {
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", position: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (title: string) => {
    setSelectedPosition(title);
    setFormData((prev) => ({ ...prev, position: title }));
    setShowForm(true);
    setSubmitted(false);
    setErrors({});
  };

  const handleSubmit = () => {
    const result = applicationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((e) => {
        const field = e.path[0] as keyof FormErrors;
        fieldErrors[field] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    // Build WhatsApp message with application data
    const safe = {
      position: sanitizeInput(formData.position),
      fullName: sanitizeInput(formData.fullName),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      message: formData.message ? sanitizeInput(formData.message) : "",
    };

    const parts = [
      `📋 New Application — OS9 Hub`,
      `Position: ${safe.position}`,
      `Name: ${safe.fullName}`,
      `Email: ${safe.email}`,
      `Phone: ${safe.phone}`,
      safe.message ? `Note: ${safe.message}` : "",
      cvFile ? `CV: ${cvFile.name} (will be sent separately)` : "CV: Not attached",
    ].filter(Boolean);

    window.open(getWhatsAppUrl(parts.join("\n")), "_blank");
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File must be under 5MB");
        return;
      }
      setCvFile(file);
    }
  };

  return (
    <div className="min-h-screen pt-[calc(1.75rem+6rem)]">
      <div className="container px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground text-glow">
            {theme === "wave" ? "// RECRUIT" : "Join the Team"}
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            {theme === "wave" ? "We're assembling operatives." : "Internships, freelance & partnerships."}
          </p>
        </motion.div>

        {/* Openings */}
        <div className="mt-10 space-y-4">
          {openings.map((o, i) => {
            const cfg = typeConfig[o.type as keyof typeof typeConfig];
            return (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-lg border border-border bg-card hover:box-glow hover:border-glow transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cfg.color}>{cfg.icon}</span>
                  <span className="font-display text-[10px] uppercase tracking-widest text-muted-foreground">{cfg.label}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground font-body">{o.location}</span>
                </div>
                <h3 className="font-display text-base font-bold text-card-foreground">{o.title}</h3>
                <p className="text-xs text-muted-foreground font-body mt-1 mb-4">{o.desc}</p>
                <Button variant="hero" size="sm" onClick={() => handleApply(o.title)}>
                  {theme === "wave" ? "Apply" : "Submit Interest"}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Application Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 p-6 rounded-lg border border-border bg-card"
            id="application-form"
          >
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="mx-auto text-primary mb-4" />
                <h3 className="font-display text-lg font-bold text-card-foreground">
                  {theme === "wave" ? "Transmission Sent" : "Application Submitted!"}
                </h3>
                <p className="text-sm text-muted-foreground font-body mt-2">
                  Your application for <span className="text-foreground font-semibold">{selectedPosition}</span> has been sent via WhatsApp.
                </p>
                <Button variant="heroOutline" size="sm" className="mt-4" onClick={() => { setShowForm(false); setSubmitted(false); }}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-lg font-bold text-card-foreground text-glow mb-1 text-center">
                  {theme === "wave" ? "// INTAKE FORM" : "Application Form"}
                </h3>
                <p className="text-xs text-muted-foreground font-body text-center mb-6">
                  Applying for: <span className="text-foreground font-semibold">{selectedPosition}</span>
                </p>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Full Name *</label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: sanitizeOnChange(e.target.value) })}
                      placeholder="Your full name"
                      className="bg-background"
                    />
                    {errors.fullName && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: sanitizeOnChange(e.target.value) })}
                      placeholder="your@email.com"
                      className="bg-background"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Phone *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: sanitizeOnChange(e.target.value) })}
                      placeholder="+237 6XX XXX XXX"
                      className="bg-background"
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Cover Note (Optional)</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: sanitizeOnChange(e.target.value) })}
                      placeholder="Tell us about yourself..."
                      maxLength={500}
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className="block font-display text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Upload CV / Resume</label>
                    <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-border bg-background cursor-pointer hover:border-primary/50 transition-colors">
                      <Upload size={16} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-body">
                        {cvFile ? cvFile.name : "Click to upload (PDF, DOC — max 5MB)"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Submit */}
                  <Button variant="hero" size="lg" className="w-full mt-2" onClick={handleSubmit}>
                    {theme === "wave" ? "Transmit Application" : "Submit Application"}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      <SponsorshipFooter />
    </div>
  );
};

export default Careers;
