import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleLoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleSuccess = () => {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");

      if (!token) {
        console.error("Google login response is missing token.");
        navigate("/login?error=google-login-failed", {
          replace: true,
        });
        return;
      }

      const user = {
        id: params.get("id"),
        name: params.get("name") || "",
        email: params.get("email") || "",
        college: params.get("college") || "",
        branch: params.get("branch") || "",
        year: params.get("year") || "",
        role: params.get("role") || "student",
        avatar: params.get("avatar") || "",
      };

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate("/dashboard", {
          replace: true,
        });
      }
    };

    handleGoogleSuccess();
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] px-4 text-white">
      <div className="w-full max-w-sm rounded-3xl border border-white/[0.08] bg-[#0a1020]/90 p-8 text-center shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>

        <h1 className="text-xl font-bold">
          Signing you in...
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Please wait while we complete your Google login.
        </p>
      </div>
    </main>
  );
}

export default GoogleLoginSuccess;