import { useState, useEffect } from "react";
import {
  FiUser,
  FiShield,
  FiBell,
  FiLock,
  FiMail,
  FiSave,
  FiEye,
  FiEyeOff,
  FiSmartphone,
  FiMonitor,
  FiMapPin,
  FiClock,
  FiLogOut,
  FiCheckCircle,
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiKey,
  FiX,
} from "react-icons/fi";

const settingsTabs = [
  {
    id: "profile",
    label: "Profile Settings",
    description: "Manage your personal information",
    icon: FiUser,
  },
  {
    id: "security",
    label: "Security",
    description: "Password, 2FA & sessions",
    icon: FiShield,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Control alerts & emails",
    icon: FiBell,
  },
  {
    id: "permissions",
    label: "Permissions",
    description: "Access control settings",
    icon: FiLock,
  },
];

const avatarSeeds = [
  "Admin",
  "Nova",
  "Orion",
  "Luna",
  "Atlas",
  "Phoenix",
];

const avatarOptions = avatarSeeds.map(
  (seed) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
);

const ToggleSwitch = ({
  enabled,
  onChange,
  label,
  description,
  disabled = false,
}) => (
  <div className="flex items-center justify-between gap-4 py-4 border-b border-white/5 last:border-b-0">
    <div className="min-w-0">
      <p className="text-white text-sm font-medium">{label}</p>

      {description && (
        <p className="text-slate-500 text-xs mt-0.5">
          {description}
        </p>
      )}
    </div>

    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      aria-label={`Toggle ${label}`}
      className={`relative shrink-0 h-6 w-11 rounded-full transition-all duration-300 ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "cursor-pointer"
      } ${
        enabled
          ? "bg-gradient-to-r from-blue-500 to-purple-500"
          : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  </div>
);

const SettingsSection = ({ title, children }) => (
  <div className="mb-8 last:mb-0">
    {title && (
      <h3 className="text-white font-semibold text-base mb-3">
        {title}
      </h3>
    )}

    <div className="rounded-2xl border border-white/10 bg-white/5 px-5">
      {children}
    </div>
  </div>
);

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // ============================================================
  // TOAST
  // ============================================================

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const showToast = (text) => {
    setMessage(text);
  };

  // ============================================================
  // PROFILE
  // ============================================================

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@campushubai.com",
  });

  const [avatar, setAvatar] = useState(avatarOptions[0]);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [profileErrors, setProfileErrors] = useState({});

  // ============================================================
  // SECURITY
  // ============================================================

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [twoFA, setTwoFA] = useState(true);

  const loginActivity = [
    {
      device: "Chrome on Windows",
      location: "Pune, India",
      time: "Today, 10:24 AM",
      current: true,
    },
    {
      device: "Safari on iPhone",
      location: "Pune, India",
      time: "Yesterday, 8:10 PM",
      current: false,
    },
    {
      device: "Chrome on macOS",
      location: "Mumbai, India",
      time: "3 days ago",
      current: false,
    },
  ];

  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  const [notifications, setNotifications] = useState({
    email: true,
    newUser: true,
    newNotes: false,
    systemUpdates: true,
  });

  // ============================================================
  // PERMISSIONS
  // ============================================================

  const [permissions, setPermissions] = useState({
    manageUsers: true,
    manageNotes: true,
    viewAnalytics: false,
  });

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

    setProfileErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));

    setPasswordError("");
  };

  const toggleNotification = (key, value) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const togglePermission = (key, value) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSelectAvatar = (url) => {
    setAvatar(url);
    setAvatarPickerOpen(false);

    showToast("Avatar selected successfully ✨");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ============================================================
  // PROFILE SAVE
  // ============================================================

  const handleSaveProfile = () => {
    const errors = {};

    if (!profile.name.trim()) {
      errors.name = "Name is required";
    }

    if (!profile.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(profile.email)) {
      errors.email = "Enter a valid email address";
    }

    setProfileErrors(errors);

    if (Object.keys(errors).length > 0) {
      showToast("Please fix the highlighted fields ❌");
      return;
    }

    showToast("Profile updated successfully 🚀");
  };

  // ============================================================
  // PASSWORD
  // ============================================================

  const handleUpdatePassword = () => {
    if (
      !passwords.current ||
      !passwords.next ||
      !passwords.confirm
    ) {
      setPasswordError("All password fields are required");
      showToast("Please fill all password fields ❌");
      return;
    }

    if (passwords.next.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters"
      );
      showToast("Password is too short ❌");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setPasswordError(
        "New password and confirm password do not match"
      );
      showToast("Password does not match ❌");
      return;
    }

    setPasswordError("");

    setPasswords({
      current: "",
      next: "",
      confirm: "",
    });

    showToast("Password changed successfully 🔐");
  };

  // ============================================================
  // 2FA
  // ============================================================

  const handleToggle2FA = (value) => {
    setTwoFA(value);

    showToast(
      value
        ? "Two-factor authentication enabled 🔐"
        : "Two-factor authentication disabled"
    );
  };

  // ============================================================
  // LOGOUT OTHER DEVICES
  // ============================================================

  const handleLogoutOtherDevices = () => {
    showToast(
      "All other sessions logged out successfully ✅"
    );
  };

  // ============================================================
  // NOTIFICATION SAVE
  // ============================================================

  const handleSavePreferences = () => {
    showToast(
      "Notification preferences saved successfully 🔔"
    );
  };

  // ============================================================
  // PERMISSION SAVE
  // ============================================================

  const handleSavePermissions = () => {
    showToast("Permissions updated successfully 🛡️");
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <div className="mb-8 animate-[fadeIn_0.5s_ease-out]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Settings
          </h1>

          <p className="text-slate-400 text-sm sm:text-base mt-1">
            Manage your account, security and platform
            preferences
          </p>
        </div>

        {/* ====================================================
            MAIN SETTINGS GRID
        ==================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
          {/* ==================================================
              LEFT SIDEBAR
          ================================================== */}

          <div className="space-y-3">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left relative overflow-hidden rounded-3xl p-[1px] transition-all duration-300 ${
                    isActive
                      ? "scale-[1.01]"
                      : "hover:scale-[1.01]"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br transition-opacity duration-300 ${
                      isActive
                        ? "from-blue-500 via-purple-500 to-cyan-400 opacity-100"
                        : "from-white/10 to-white/5 opacity-100"
                    }`}
                  />

                  <div
                    className={`relative rounded-3xl px-5 py-4 flex items-center gap-4 backdrop-blur-xl transition-colors duration-300 ${
                      isActive
                        ? "bg-slate-900/60"
                        : "bg-slate-900/80 hover:bg-slate-900/60"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-11 w-11 rounded-2xl shrink-0 transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      <Icon className="text-lg" />
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold truncate ${
                          isActive
                            ? "text-white"
                            : "text-slate-200"
                        }`}
                      >
                        {tab.label}
                      </p>

                      <p className="text-slate-500 text-xs truncate">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ==================================================
              RIGHT CONTENT
          ================================================== */}

          <div className="relative rounded-3xl p-[1px] overflow-hidden">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-400/30" />

            <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 min-h-[500px] animate-[fadeIn_0.4s_ease-out]">
              {/* ==================================================
                  PROFILE SETTINGS
              ================================================== */}

              {activeTab === "profile" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Profile Settings
                  </h2>

                  <p className="text-slate-400 text-sm mb-6">
                    Update your personal admin information
                  </p>

                  {/* AVATAR */}

                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold border border-white/10 shadow-lg shadow-black/30 overflow-hidden">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Admin avatar"
                          className="h-full w-full object-cover animate-[fadeIn_0.3s_ease-out]"
                        />
                      ) : profile.name ? (
                        profile.name
                          .charAt(0)
                          .toUpperCase()
                      ) : (
                        "A"
                      )}
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          setAvatarPickerOpen(true)
                        }
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-200"
                      >
                        Change Avatar
                      </button>

                      <p className="text-slate-500 text-xs mt-2">
                        Choose from our premium avatar set.
                      </p>
                    </div>
                  </div>

                  {/* FORM */}

                  <div className="space-y-5">
                    {/* NAME */}

                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-2">
                        Admin Name
                      </label>

                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          handleProfileChange(
                            "name",
                            e.target.value
                          )
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder-slate-500 focus:outline-none focus:bg-white/[0.07] transition-all duration-200 ${
                          profileErrors.name
                            ? "border-red-500/50 focus:border-red-500/70"
                            : "border-white/10 focus:border-blue-500/50"
                        }`}
                        placeholder="Enter your name"
                      />

                      {profileErrors.name && (
                        <p className="text-red-400 text-xs mt-1.5">
                          {profileErrors.name}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}

                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-2">
                        Email Address
                      </label>

                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />

                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            handleProfileChange(
                              "email",
                              e.target.value
                            )
                          }
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border text-white text-sm placeholder-slate-500 focus:outline-none focus:bg-white/[0.07] transition-all duration-200 ${
                            profileErrors.email
                              ? "border-red-500/50 focus:border-red-500/70"
                              : "border-white/10 focus:border-blue-500/50"
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>

                      {profileErrors.email && (
                        <p className="text-red-400 text-xs mt-1.5">
                          {profileErrors.email}
                        </p>
                      )}
                    </div>

                    {/* ROLE */}

                    <div>
                      <label className="block text-slate-400 text-xs font-medium mb-2">
                        Role
                      </label>

                      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                        <FiShield className="text-purple-300 text-sm" />

                        <span className="text-purple-300 text-sm font-semibold">
                          Administrator
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FiSave className="text-base" />
                    Save Profile
                  </button>
                </div>
              )}

              {/* ==================================================
                  SECURITY
              ================================================== */}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Security
                  </h2>

                  <p className="text-slate-400 text-sm mb-6">
                    Manage your password, 2FA and active
                    sessions
                  </p>

                  {/* CHANGE PASSWORD */}

                  <SettingsSection title="Change Password">
                    <div className="py-4 space-y-4">
                      {/* CURRENT */}

                      <div className="relative">
                        <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />

                        <input
                          type={
                            showPasswords
                              ? "text"
                              : "password"
                          }
                          value={passwords.current}
                          onChange={(e) =>
                            handlePasswordChange(
                              "current",
                              e.target.value
                            )
                          }
                          placeholder="Current password"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                        />
                      </div>

                      {/* NEW */}

                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />

                        <input
                          type={
                            showPasswords
                              ? "text"
                              : "password"
                          }
                          value={passwords.next}
                          onChange={(e) =>
                            handlePasswordChange(
                              "next",
                              e.target.value
                            )
                          }
                          placeholder="New password"
                          className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords(
                              (prev) => !prev
                            )
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors duration-200"
                        >
                          {showPasswords ? (
                            <FiEyeOff className="text-sm" />
                          ) : (
                            <FiEye className="text-sm" />
                          )}
                        </button>
                      </div>

                      {/* CONFIRM */}

                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />

                        <input
                          type={
                            showPasswords
                              ? "text"
                              : "password"
                          }
                          value={passwords.confirm}
                          onChange={(e) =>
                            handlePasswordChange(
                              "confirm",
                              e.target.value
                            )
                          }
                          placeholder="Confirm new password"
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all duration-200"
                        />
                      </div>

                      {passwordError && (
                        <p className="text-red-400 text-xs">
                          {passwordError}
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleUpdatePassword}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <FiSave className="text-sm" />
                        Update Password
                      </button>
                    </div>
                  </SettingsSection>

                  {/* 2FA */}

                  <SettingsSection title="Two-Factor Authentication">
                    <ToggleSwitch
                      enabled={twoFA}
                      onChange={handleToggle2FA}
                      label="Enable 2FA"
                      description="Add an extra layer of security to your account"
                    />

                    <div className="pb-4 pt-1">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          twoFA
                            ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                            : "bg-red-500/10 text-red-300 border-red-500/30"
                        }`}
                      >
                        <FiCheckCircle className="text-sm" />

                        {twoFA
                          ? "2FA is active"
                          : "2FA is disabled"}
                      </div>
                    </div>
                  </SettingsSection>

                  {/* LOGIN ACTIVITY */}

                  <SettingsSection title="Login Activity">
                    <div className="py-4 space-y-3">
                      {loginActivity.map((login, index) => (
                        <div
                          key={index}
                          className="flex items-start sm:items-center justify-between gap-3 flex-wrap rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/[0.08] transition-colors duration-200"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-blue-500/10 text-blue-300 shrink-0">
                              <FiMonitor className="text-sm" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {login.device}
                              </p>

                              <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <FiMapPin className="text-[10px]" />
                                  {login.location}
                                </span>

                                <span className="flex items-center gap-1">
                                  <FiClock className="text-[10px]" />
                                  {login.time}
                                </span>
                              </div>
                            </div>
                          </div>

                          {login.current && (
                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                              This device
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </SettingsSection>

                  {/* SESSION MANAGEMENT */}

                  <SettingsSection title="Session Management">
                    <div className="py-4 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-purple-500/10 text-purple-300 shrink-0">
                          <FiSmartphone className="text-sm" />
                        </div>

                        <div>
                          <p className="text-white text-sm font-medium">
                            2 other active sessions
                          </p>

                          <p className="text-slate-500 text-xs">
                            Sign out from all other devices
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={
                          handleLogoutOtherDevices
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-300 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:text-white transition-all duration-200"
                      >
                        <FiLogOut className="text-sm" />
                        Logout Other Devices
                      </button>
                    </div>
                  </SettingsSection>
                </div>
              )}

              {/* ==================================================
                  NOTIFICATIONS
              ================================================== */}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Notification Settings
                  </h2>

                  <p className="text-slate-400 text-sm mb-6">
                    Choose what you want to be notified about
                  </p>

                  <SettingsSection>
                    <ToggleSwitch
                      enabled={notifications.email}
                      onChange={(value) =>
                        toggleNotification(
                          "email",
                          value
                        )
                      }
                      label="Email Notifications"
                      description="Receive important updates via email"
                    />

                    <ToggleSwitch
                      enabled={notifications.newUser}
                      onChange={(value) =>
                        toggleNotification(
                          "newUser",
                          value
                        )
                      }
                      label="New User Registration Alert"
                      description="Get notified when a new user signs up"
                    />

                    <ToggleSwitch
                      enabled={notifications.newNotes}
                      onChange={(value) =>
                        toggleNotification(
                          "newNotes",
                          value
                        )
                      }
                      label="New Notes Upload Alert"
                      description="Get notified when notes are uploaded"
                    />

                    <ToggleSwitch
                      enabled={
                        notifications.systemUpdates
                      }
                      onChange={(value) =>
                        toggleNotification(
                          "systemUpdates",
                          value
                        )
                      }
                      label="System Update Notifications"
                      description="Stay informed about platform updates"
                    />
                  </SettingsSection>

                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FiSave className="text-base" />
                    Save Preferences
                  </button>
                </div>
              )}

              {/* ==================================================
                  PERMISSIONS
              ================================================== */}

              {activeTab === "permissions" && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Permissions
                  </h2>

                  <p className="text-slate-400 text-sm mb-6">
                    Control what admins can access and manage
                  </p>

                  <SettingsSection title="Access Permissions">
                    <ToggleSwitch
                      enabled={permissions.manageUsers}
                      onChange={(value) =>
                        togglePermission(
                          "manageUsers",
                          value
                        )
                      }
                      label="Manage Users"
                      description="Add, edit, or remove platform users"
                    />

                    <ToggleSwitch
                      enabled={permissions.manageNotes}
                      onChange={(value) =>
                        togglePermission(
                          "manageNotes",
                          value
                        )
                      }
                      label="Manage Notes"
                      description="Approve, edit, or delete uploaded notes"
                    />

                    <ToggleSwitch
                      enabled={
                        permissions.viewAnalytics
                      }
                      onChange={(value) =>
                        togglePermission(
                          "viewAnalytics",
                          value
                        )
                      }
                      label="View Analytics"
                      description="Access platform usage and growth data"
                    />
                  </SettingsSection>

                  <SettingsSection title="Admin Access Control">
                    <div className="py-4 space-y-3">
                      {/* USERS */}

                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-blue-500/10 text-blue-300 shrink-0">
                          <FiUsers className="text-sm" />
                        </div>

                        <div>
                          <p className="text-white text-sm font-medium">
                            User Management
                          </p>

                          <p className="text-slate-500 text-xs">
                            Full control over student and admin
                            accounts
                          </p>
                        </div>
                      </div>

                      {/* NOTES */}

                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-purple-500/10 text-purple-300 shrink-0">
                          <FiFileText className="text-sm" />
                        </div>

                        <div>
                          <p className="text-white text-sm font-medium">
                            Notes Management
                          </p>

                          <p className="text-slate-500 text-xs">
                            Review and moderate uploaded study
                            material
                          </p>
                        </div>
                      </div>

                      {/* ANALYTICS */}

                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-300 shrink-0">
                          <FiBarChart2 className="text-sm" />
                        </div>

                        <div>
                          <p className="text-white text-sm font-medium">
                            Analytics Access
                          </p>

                          <p className="text-slate-500 text-xs">
                            View platform-wide statistics and
                            trends
                          </p>
                        </div>
                      </div>
                    </div>
                  </SettingsSection>

                  <button
                    type="button"
                    onClick={handleSavePermissions}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FiSave className="text-base" />
                    Save Permissions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================
          AVATAR PICKER MODAL
      ======================================================== */}

      {avatarPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setAvatarPickerOpen(false)}
          />

          {/* MODAL */}

          <div className="relative w-full max-w-md rounded-3xl p-[1px] overflow-hidden animate-[fadeIn_0.25s_ease-out]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-cyan-400/40" />

            <div className="relative rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold text-base">
                  Choose an Avatar
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setAvatarPickerOpen(false)
                  }
                  className="flex items-center justify-center h-8 w-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {avatarOptions.map((url) => (
                  <button
                    type="button"
                    key={url}
                    onClick={() =>
                      handleSelectAvatar(url)
                    }
                    className={`relative rounded-2xl p-2 border transition-all duration-200 hover:scale-105 hover:bg-white/5 ${
                      avatar === url
                        ? "border-blue-500/60 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                        : "border-white/10"
                    }`}
                  >
                    <img
                      src={url}
                      alt="Avatar option"
                      className="h-16 w-16 rounded-full mx-auto"
                    />

                    {avatar === url && (
                      <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border border-white/20">
                        <FiCheckCircle className="text-white text-[10px]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TOAST
      ======================================================== */}

      {message && (
        <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className="relative rounded-xl p-[1px] overflow-hidden shadow-2xl shadow-black/40">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />

            <div className="relative rounded-xl bg-slate-900/90 backdrop-blur-xl px-5 py-3.5 flex items-center gap-3 min-w-[260px]">
              <FiCheckCircle className="text-emerald-400 shrink-0" />

              <span className="text-white text-sm font-medium">
                {message}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          ANIMATIONS
      ======================================================== */}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSettings;