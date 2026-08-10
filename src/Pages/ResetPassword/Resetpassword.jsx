import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import API from "../../services/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      console.log(
        "RESET PASSWORD:",
        response.data
      );

      setSuccess(
        response.data.message ||
          "Password reset successful."
      );

      setPassword("");
      setConfirmPassword("");

      // Login page par bhej do
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(
        "RESET PASSWORD ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-white">

      {/* Background Glow */}

      <div
        className="
          pointer-events-none absolute
          -top-24 -left-24
          h-80 w-80
          rounded-full
          bg-blue-600/20
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24 -right-24
          h-80 w-80
          rounded-full
          bg-cyan-500/20
          blur-[120px]
        "
      />

      {/* Grid */}

      <div
        className="
          pointer-events-none absolute inset-0
          opacity-[0.04]
          [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)]
          [background-size:56px_56px]
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-slate-800
          bg-slate-900/80
          p-8
          backdrop-blur-xl
          shadow-2xl
          shadow-blue-500/20
        "
      >

        {/* Icon */}

        <div className="flex justify-center">
          <div
            className="
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              p-4
            "
          >
            <Sparkles size={30} />
          </div>
        </div>

        <h1
          className="
            mt-6
            text-center
            text-3xl
            font-bold
          "
        >
          Create New Password
        </h1>

        <p
          className="
            mt-3
            text-center
            text-gray-400
          "
        >
          Create a strong new password for
          your CampusHub AI account.
        </p>

        {/* Security Badge */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-blue-500/20
            bg-blue-500/10
            py-3
            text-sm
            text-blue-400
          "
        >
          <ShieldCheck size={18} />

          Secure Password Reset
        </div>

        {/* Success */}

        {success && (
          <div
            className="
              mt-5
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-green-500/20
              bg-green-500/10
              p-4
              text-sm
              text-green-400
            "
          >
            <CheckCircle
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>
          </div>
        )}

        {/* Error */}

        {error && (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              p-4
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {/* New Password */}

          <div className="relative">

            <Lock
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              minLength={6}
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="New password"
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                py-3
                pl-12
                pr-12
                text-white
                outline-none
                transition-all
                focus:border-blue-500
                focus:shadow-lg
                focus:shadow-blue-500/20
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-blue-400
              "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Confirm Password */}

          <div className="relative">

            <Lock
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                py-3
                pl-12
                pr-12
                text-white
                outline-none
                transition-all
                focus:border-blue-500
                focus:shadow-lg
                focus:shadow-blue-500/20
                disabled:opacity-60
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                hover:text-blue-400
              "
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="
              group
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              py-3.5
              font-semibold
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-blue-500/30
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? (
              "Updating Password..."
            ) : (
              <>
                Update Password

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </>
            )}
          </button>
        </form>

        <p
          className="
            mt-6
            text-center
            text-sm
            text-gray-400
          "
        >
          Remember your password?

          <Link
            to="/login"
            className="
              ml-2
              text-blue-400
              hover:text-cyan-400
            "
          >
            Back to Login
          </Link>
        </p>

      </motion.div>
    </section>
  );
}

export default ResetPassword;