// src/pages/Settings/Settings.jsx
import { useState } from "react";
import {
  Settings2,
  User,
  Lock,
  BookOpen,
  Bot,
  Bell,
  ShieldCheck,
  Palette,
  Camera,
  Save,
  Trash2,
  AlertTriangle,
  Eye,
  EyeOff,
  Sparkles,
  Monitor,
  Smartphone,
  KeyRound,
  ShieldAlert,
  Mail,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Reusable primitives                                                 */
/* ------------------------------------------------------------------ */

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-all duration-300 ${
        checked
          ? "border-blue-400/30 bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_12px_rgba(59,130,246,0.45)]"
          : "border-slate-700 bg-slate-800"
      }`}
    >
      <motion.span
        layout
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 550, damping: 34 }}
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-shadow duration-300 ${
          checked ? "shadow-[0_0_8px_rgba(255,255,255,0.6)]" : "shadow-sm"
        }`}
      />
    </button>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 py-4 transition-colors duration-300 first:pt-0 last:border-0 last:pb-0 hover:border-slate-700">
      <div>
        <p className="text-sm font-medium text-gray-200">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        )}
      </div>
      <ToggleSwitch checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

function InputField({ icon, label, type = "text", value, onChange, name, placeholder }) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="group relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-blue-400">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-700 bg-slate-950/80 py-3 ${
            icon ? "pl-12" : "pl-4"
          } pr-4 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]`}
        />
      </div>
    </div>
  );
}

function SectionTitle({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-gray-400">{description}</p>
      )}
    </div>
  );
}

function SettingCard({ title, description, icon, danger = false, children }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 sm:p-8 ${
        danger
          ? "border-red-500/25 bg-red-500/[0.04] hover:border-red-500/45 hover:shadow-lg hover:shadow-red-500/10"
          : "border-slate-800 bg-slate-900/60 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10"
      }`}
    >
      {!danger && (
        <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      )}

      <div className="relative">
        {(title || icon) && (
          <div className="mb-6 flex items-start gap-3">
            {icon && (
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                  danger
                    ? "bg-red-500/10 text-red-400"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                }`}
              >
                {icon}
              </div>
            )}
            <div>
              {title && <h3 className="font-semibold">{title}</h3>}
              {description && (
                <p className="mt-0.5 text-sm text-gray-400">{description}</p>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-95 ${
        active
          ? "border-blue-500/60 bg-gradient-to-r from-blue-600/25 to-cyan-500/25 text-blue-300 shadow-sm shadow-blue-500/20"
          : "border-slate-700 bg-slate-900/50 text-gray-400 hover:border-slate-500 hover:text-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */

const navItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "account", label: "Account", icon: Lock },
  { id: "learning", label: "Learning Preferences", icon: BookOpen },
  { id: "ai", label: "AI Assistant Settings", icon: Bot },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: ShieldCheck },
  { id: "appearance", label: "Appearance", icon: Palette },
];

const goalOptions = [
  "Placement Prep",
  "Skill Building",
  "Higher Studies",
  "Competitive Coding",
];

const subjectOptions = [
  "DSA",
  "Web Development",
  "AI / ML",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
];

const skillLevels = ["Beginner", "Intermediate", "Advanced"];

const responseStyles = ["Concise", "Detailed", "Friendly", "Professional"];

const loginActivity = [
  {
    device: "Windows • Chrome",
    location: "Pune, India",
    time: "Active now",
    current: true,
    icon: Monitor,
  },
  {
    device: "iPhone 14 • Safari",
    location: "Mumbai, India",
    time: "Yesterday",
    current: false,
    icon: Smartphone,
  },
  {
    device: "MacBook • Chrome",
    location: "Pune, India",
    time: "3 days ago",
    current: false,
    icon: Monitor,
  },
];

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

function Settings() {
  const [activeSection, setActiveSection] = useState("profile");

  // Profile
  const [profile, setProfile] = useState({
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    college: "SRM Institute of Technology",
    bio: "Final year CS student passionate about AI and building things that help students learn faster.",
  });

  // Account
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Learning preferences
  const [goals, setGoals] = useState(["Placement Prep"]);
  const [subjects, setSubjects] = useState(["DSA", "Web Development"]);
  const [skillLevel, setSkillLevel] = useState("Intermediate");
  const [careerInterest, setCareerInterest] = useState("Software Engineer");

  // AI assistant
  const [aiEnabled, setAiEnabled] = useState(true);
  const [responseStyle, setResponseStyle] = useState("Detailed");
  const [studyReminders, setStudyReminders] = useState(true);
  const [personalizedRecs, setPersonalizedRecs] = useState(true);

  // Notifications
  const [notifications, setNotifications] = useState({
    email: true,
    assignments: true,
    community: false,
    career: true,
  });

  // Privacy
  const [visibility, setVisibility] = useState("Students Only");
  const [twoFactor, setTwoFactor] = useState(false);

  // Appearance
  const [darkMode] = useState(true);
  const [density, setDensity] = useState("Comfortable");

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const toggleGoal = (value) => {
    setGoals((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const toggleSubject = (value) => {
    setSubjects((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    console.log("Profile saved:", profile);
    alert("Profile updated successfully 🚀");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    console.log("Password update requested:", passwords);
    alert("Password updated successfully 🔒");
  };

  const handleSaveLearning = () => {
    console.log("Learning preferences saved:", {
      goals,
      subjects,
      skillLevel,
      careerInterest,
    });
    alert("Learning preferences saved ✅");
  };

  const handleSavePrivacy = () => {
    console.log("Privacy settings saved:", { visibility, twoFactor });
    alert("Privacy settings saved ✅");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      {/* Background */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-start justify-between gap-6"
        >
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur transition-all duration-300 hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/10">
              <Settings2 size={16} />
              Settings
            </div>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Manage your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                CampusHub AI
              </span>{" "}
              experience
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
              Manage your profile, preferences and account settings — all in
              one place.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-base font-semibold shadow-lg shadow-blue-500/20">
              {profile.name.charAt(0)}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
            </div>
            <div>
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-gray-400">{profile.email}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          {/* Mobile nav — horizontal tabs */}
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 active:scale-95 ${
                    active
                      ? "border-blue-500/60 bg-gradient-to-r from-blue-600/25 to-cyan-500/25 text-blue-300 shadow-sm shadow-blue-500/20"
                      : "border-slate-800 bg-slate-900/60 text-gray-400 hover:border-slate-600 hover:text-gray-200"
                  }`}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop sidebar */}
          <nav className="sticky top-8 hidden h-fit flex-col gap-1 rounded-3xl border border-slate-800 bg-slate-900/60 p-3 backdrop-blur-xl lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/15 text-blue-300 shadow-sm shadow-blue-500/10"
                      : "text-gray-400 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="settings-active"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute left-0 h-6 w-1 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    />
                  )}
                  <Icon
                    size={17}
                    className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                  />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Content */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* PROFILE */}
                {activeSection === "profile" && (
                  <div>
                    <SectionTitle
                      title="Profile"
                      description="Update your personal information and how you appear on CampusHub AI."
                    />

                    <SettingCard>
                      <div className="flex flex-wrap items-center gap-5">
                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-2xl font-semibold shadow-lg shadow-blue-500/25 transition-transform duration-300 hover:scale-105">
                          {profile.name.charAt(0)}
                          <button
                            type="button"
                            aria-label="Change photo"
                            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900 bg-gradient-to-r from-slate-800 to-slate-700 text-gray-300 shadow-md transition-all duration-300 hover:border-blue-500 hover:from-blue-600 hover:to-cyan-500 hover:text-white hover:shadow-blue-500/30 active:scale-95"
                          >
                            <Camera size={14} />
                          </button>
                        </div>
                        <div>
                          <p className="font-semibold">Profile Photo</p>
                          <p className="mt-1 text-sm text-gray-400">
                            JPG or PNG, max 5MB.
                          </p>
                        </div>
                      </div>

                      <form
                        onSubmit={handleSaveProfile}
                        className="mt-8 space-y-5"
                      >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <InputField
                            icon={<User size={18} />}
                            label="Full Name"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            placeholder="Full Name"
                          />
                          <InputField
                            icon={<Mail size={18} />}
                            label="Email"
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            placeholder="Email Address"
                          />
                        </div>

                        <InputField
                          icon={<GraduationCap size={18} />}
                          label="College Name"
                          name="college"
                          value={profile.college}
                          onChange={handleProfileChange}
                          placeholder="College Name"
                        />

                        <div className="group">
                          <label className="mb-2 block text-sm font-medium text-gray-300">
                            Bio
                          </label>
                          <textarea
                            name="bio"
                            rows={4}
                            value={profile.bio}
                            onChange={handleProfileChange}
                            placeholder="Tell us a little about yourself..."
                            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                      </form>
                    </SettingCard>
                  </div>
                )}

                {/* ACCOUNT */}
                {activeSection === "account" && (
                  <div className="space-y-6">
                    <SectionTitle
                      title="Account"
                      description="Manage your password and account security."
                    />

                    <SettingCard
                      title="Change Password"
                      description="Use a strong password you don't use elsewhere."
                      icon={<KeyRound size={18} />}
                    >
                      <form
                        onSubmit={handleUpdatePassword}
                        className="space-y-5"
                      >
                        {["current", "new", "confirm"].map((field) => (
                          <div key={field} className="group relative">
                            <label className="mb-2 block text-sm font-medium capitalize text-gray-300">
                              {field === "current"
                                ? "Current Password"
                                : field === "new"
                                ? "New Password"
                                : "Confirm New Password"}
                            </label>
                            <div className="relative">
                              <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-blue-400"
                              />
                              <input
                                name={field}
                                type={showPasswords[field] ? "text" : "password"}
                                value={passwords[field]}
                                onChange={handlePasswordChange}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-3 pl-12 pr-12 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                              />
                              <button
                                type="button"
                                onClick={() => toggleShowPassword(field)}
                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition-all duration-300 hover:bg-slate-800 hover:text-blue-400"
                              >
                                {showPasswords[field] ? (
                                  <EyeOff size={17} />
                                ) : (
                                  <Eye size={17} />
                                )}
                              </button>
                            </div>
                          </div>
                        ))}

                        <button
                          type="submit"
                          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
                        >
                          Update Password
                        </button>
                      </form>
                    </SettingCard>

                    <SettingCard
                      title="Danger Zone"
                      description="Irreversible and destructive actions."
                      icon={<ShieldAlert size={18} />}
                      danger
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 transition-colors duration-300 hover:border-red-500/35">
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            size={18}
                            className="mt-0.5 shrink-0 text-red-400"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-200">
                              Delete your account
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              This will permanently remove your data. This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            confirm(
                              "Are you sure you want to delete your account? This action cannot be undone."
                            )
                          }
                          className="flex shrink-0 items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-300 hover:bg-red-500/20 active:scale-95"
                        >
                          <Trash2 size={15} />
                          Delete Account
                        </button>
                      </div>
                    </SettingCard>
                  </div>
                )}

                {/* LEARNING PREFERENCES */}
                {activeSection === "learning" && (
                  <div>
                    <SectionTitle
                      title="Learning Preferences"
                      description="Help CampusHub AI personalize your learning path."
                    />

                    <SettingCard>
                      <div className="space-y-8">
                        <div>
                          <p className="mb-3 text-sm font-medium text-gray-300">
                            Learning Goals
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {goalOptions.map((goal) => (
                              <Chip
                                key={goal}
                                label={goal}
                                active={goals.includes(goal)}
                                onClick={() => toggleGoal(goal)}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="mb-3 text-sm font-medium text-gray-300">
                            Preferred Subjects
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {subjectOptions.map((subject) => (
                              <Chip
                                key={subject}
                                label={subject}
                                active={subjects.includes(subject)}
                                onClick={() => toggleSubject(subject)}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="mb-3 text-sm font-medium text-gray-300">
                            Skill Level
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {skillLevels.map((level) => (
                              <Chip
                                key={level}
                                label={level}
                                active={skillLevel === level}
                                onClick={() => setSkillLevel(level)}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="mb-3 block text-sm font-medium text-gray-300">
                            Career Interest
                          </label>
                          <select
                            value={careerInterest}
                            onChange={(e) => setCareerInterest(e.target.value)}
                            className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                          >
                            <option>Software Engineer</option>
                            <option>Data Scientist</option>
                            <option>Product Manager</option>
                            <option>UI/UX Designer</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={handleSaveLearning}
                          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
                        >
                          <Save size={16} />
                          Save Preferences
                        </button>
                      </div>
                    </SettingCard>
                  </div>
                )}

                {/* AI ASSISTANT SETTINGS */}
                {activeSection === "ai" && (
                  <div>
                    <SectionTitle
                      title="AI Assistant Settings"
                      description="Control how your CampusHub AI assistant behaves."
                    />

                    <SettingCard
                      title="Your AI Assistant"
                      description="Fine-tune how the assistant helps you learn."
                      icon={<Bot size={18} />}
                    >
                      <div className="divide-y divide-slate-800/80">
                        <ToggleRow
                          label="Enable AI Assistant"
                          description="Turn your AI assistant on or off across the platform."
                          checked={aiEnabled}
                          onChange={setAiEnabled}
                        />
                        <ToggleRow
                          label="Study Reminders"
                          description="Get gentle nudges to keep your learning streak going."
                          checked={studyReminders}
                          onChange={setStudyReminders}
                        />
                        <ToggleRow
                          label="Personalized Recommendations"
                          description="Let AI suggest notes, roadmaps and resources for you."
                          checked={personalizedRecs}
                          onChange={setPersonalizedRecs}
                        />
                      </div>

                      <div className="mt-6">
                        <p className="mb-3 text-sm font-medium text-gray-300">
                          Response Style
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {responseStyles.map((style) => (
                            <Chip
                              key={style}
                              label={style}
                              active={responseStyle === style}
                              onClick={() => setResponseStyle(style)}
                            />
                          ))}
                        </div>
                      </div>
                    </SettingCard>
                  </div>
                )}

                {/* NOTIFICATIONS */}
                {activeSection === "notifications" && (
                  <div>
                    <SectionTitle
                      title="Notifications"
                      description="Choose what CampusHub AI keeps you updated on."
                    />

                    <SettingCard
                      title="Notification Preferences"
                      icon={<Bell size={18} />}
                    >
                      <div className="divide-y divide-slate-800/80">
                        <ToggleRow
                          label="Email Notifications"
                          description="Receive important updates via email."
                          checked={notifications.email}
                          onChange={(val) =>
                            setNotifications({ ...notifications, email: val })
                          }
                        />
                        <ToggleRow
                          label="Assignment Reminders"
                          description="Get notified before deadlines."
                          checked={notifications.assignments}
                          onChange={(val) =>
                            setNotifications({
                              ...notifications,
                              assignments: val,
                            })
                          }
                        />
                        <ToggleRow
                          label="Community Updates"
                          description="News from discussions and your campus community."
                          checked={notifications.community}
                          onChange={(val) =>
                            setNotifications({
                              ...notifications,
                              community: val,
                            })
                          }
                        />
                        <ToggleRow
                          label="Career Alerts"
                          description="New internships and opportunities matching your profile."
                          checked={notifications.career}
                          onChange={(val) =>
                            setNotifications({ ...notifications, career: val })
                          }
                        />
                      </div>
                    </SettingCard>
                  </div>
                )}

                {/* PRIVACY & SECURITY */}
                {activeSection === "privacy" && (
                  <div className="space-y-6">
                    <SectionTitle
                      title="Privacy & Security"
                      description="Control who can see your activity and how your account is protected."
                    />

                    <SettingCard
                      title="Profile Visibility"
                      icon={<ShieldCheck size={18} />}
                    >
                      <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                        className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:bg-slate-950 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.12)]"
                      >
                        <option>Public</option>
                        <option>Students Only</option>
                        <option>Private</option>
                      </select>
                    </SettingCard>

                    <SettingCard
                      title="Two-Factor Authentication"
                      description="Add an extra layer of security to your account."
                      icon={<Lock size={18} />}
                    >
                      <ToggleRow
                        label="Enable Two-Factor Authentication"
                        description="Require a verification code in addition to your password."
                        checked={twoFactor}
                        onChange={setTwoFactor}
                      />
                      {twoFactor && (
                        <button
                          type="button"
                          className="mt-4 flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600/10 px-5 py-2.5 text-sm font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-600/20 active:scale-95"
                        >
                          Set Up 2FA
                        </button>
                      )}
                    </SettingCard>

                    <SettingCard
                      title="Login Activity"
                      description="Recent devices that accessed your account."
                      icon={<Monitor size={18} />}
                    >
                      <div className="space-y-3">
                        {loginActivity.map((session, index) => {
                          const Icon = session.icon;
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition-colors duration-300 hover:border-slate-700"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-gray-300">
                                  <Icon size={16} />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-200">
                                    {session.device}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {session.location} • {session.time}
                                  </p>
                                </div>
                              </div>
                              {session.current && (
                                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                                  This device
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </SettingCard>

                    <button
                      type="button"
                      onClick={handleSavePrivacy}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
                    >
                      <Save size={16} />
                      Save Privacy Settings
                    </button>
                  </div>
                )}

                {/* APPEARANCE */}
                {activeSection === "appearance" && (
                  <div className="space-y-6">
                    <SectionTitle
                      title="Appearance"
                      description="Customize how CampusHub AI looks for you."
                    />

                    <SettingCard
                      title="Theme"
                      description="CampusHub AI is currently available in dark mode only."
                      icon={<Palette size={18} />}
                    >
                      <ToggleRow
                        label="Dark Mode"
                        description="Always on for the best AI SaaS experience."
                        checked={darkMode}
                        onChange={() => {}}
                      />
                    </SettingCard>

                    <SettingCard
                      title="Interface Density"
                      description="Adjust spacing across the dashboard."
                      icon={<Sparkles size={18} />}
                    >
                      <div className="flex flex-wrap gap-2">
                        {["Comfortable", "Compact"].map((option) => (
                          <Chip
                            key={option}
                            label={option}
                            active={density === option}
                            onClick={() => setDensity(option)}
                          />
                        ))}
                      </div>
                    </SettingCard>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;