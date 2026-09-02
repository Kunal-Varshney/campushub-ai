import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
ArrowLeft,
ArrowRight,
Check,
CheckCircle2,
Clock3,
Mail,
RefreshCw,
ShieldCheck,
Sparkles,
X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function VerifyEmail() {
const location = useLocation();
const navigate = useNavigate();

const stateEmail = location.state?.email?.trim().toLowerCase() || "";

const storedEmail =
sessionStorage.getItem("verificationEmail")?.trim().toLowerCase() || "";

const email = stateEmail || storedEmail;

const [otp, setOtp] = useState(() =>
Array(OTP_LENGTH).fill("")
);

const [isVerifying, setIsVerifying] = useState(false);
const [isResending, setIsResending] = useState(false);
const [isVerified, setIsVerified] = useState(false);

const [error, setError] = useState("");
const [success, setSuccess] = useState("");

const [secondsLeft, setSecondsLeft] =
useState(RESEND_COOLDOWN);

const inputRefs = useRef([]);

const otpValue = otp.join("");
const isOtpComplete =
otpValue.length === OTP_LENGTH &&
otp.every((digit) => digit !== "");

const canResend =
secondsLeft === 0 && !isResending && !isVerifying;

// ============================================================
// INITIAL FOCUS
// ============================================================

useEffect(() => {
const timer = setTimeout(() => {
inputRefs.current[0]?.focus();
}, 100);

return () => clearTimeout(timer);

}, []);

// ============================================================
// SAVE EMAIL
// ============================================================

useEffect(() => {
if (email) {
sessionStorage.setItem("verificationEmail", email);
}
}, [email]);

// ============================================================
// RESEND COUNTDOWN
// ============================================================

useEffect(() => {
if (secondsLeft <= 0) {
return undefined;
}

const timer = window.setInterval(() => {
  setSecondsLeft((previous) => {
    if (previous <= 1) {
      window.clearInterval(timer);
      return 0;
    }

    return previous - 1;
  });
}, 1000);

return () => window.clearInterval(timer);

}, [secondsLeft]);

// ============================================================
// HELPERS
// ============================================================

const clearMessages = () => {
setError("");
setSuccess("");
};

const focusInput = (index) => {
if (index >= 0 && index < OTP_LENGTH) {
inputRefs.current[index]?.focus();
inputRefs.current[index]?.select();
}
};

const clearOtp = () => {
setOtp(Array(OTP_LENGTH).fill(""));
};

const formatTime = (seconds) => {
const minutes = Math.floor(seconds / 60)
.toString()
.padStart(2, "0");

const remainingSeconds = (seconds % 60)
  .toString()
  .padStart(2, "0");

return `${minutes}:${remainingSeconds}`;


};

// ============================================================
// OTP INPUT
// ============================================================

const handleChange = (index, value) => {
clearMessages();

const digits = value.replace(/\D/g, "");

if (!digits) {
  setOtp((previous) => {
    const next = [...previous];
    next[index] = "";
    return next;
  });

  return;
}

// Paste/multiple characters into one input
if (digits.length > 1) {
  const next = Array(OTP_LENGTH).fill("");

  digits
    .slice(0, OTP_LENGTH)
    .split("")
    .forEach((digit, digitIndex) => {
      next[digitIndex] = digit;
    });

  setOtp(next);

  const focusIndex = Math.min(
    digits.length,
    OTP_LENGTH - 1
  );

  focusInput(focusIndex);

  return;
}

setOtp((previous) => {
  const next = [...previous];
  next[index] = digits;
  return next;
});

if (index < OTP_LENGTH - 1) {
  focusInput(index + 1);
}

};

// ============================================================
// KEYBOARD
// ============================================================

const handleKeyDown = (index, event) => {
if (event.key === "Backspace") {
event.preventDefault();
clearMessages();

  if (otp[index]) {
    setOtp((previous) => {
      const next = [...previous];
      next[index] = "";
      return next;
    });

    return;
  }

  if (index > 0) {
    setOtp((previous) => {
      const next = [...previous];
      next[index - 1] = "";
      return next;
    });

    focusInput(index - 1);
  }

  return;
}

if (
  event.key === "ArrowLeft" &&
  index > 0
) {
  event.preventDefault();
  focusInput(index - 1);
  return;
}

if (
  event.key === "ArrowRight" &&
  index < OTP_LENGTH - 1
) {
  event.preventDefault();
  focusInput(index + 1);
}

};

// ============================================================
// PASTE
// ============================================================

const handlePaste = (event) => {
event.preventDefault();

const pasted = event.clipboardData
  .getData("text")
  .replace(/\D/g, "")
  .slice(0, OTP_LENGTH);

if (!pasted) {
  return;
}

const next = Array(OTP_LENGTH).fill("");

pasted.split("").forEach((digit, index) => {
  next[index] = digit;
});

setOtp(next);
clearMessages();

focusInput(
  Math.min(pasted.length, OTP_LENGTH - 1)
);

};

// ============================================================
// VERIFY EMAIL
// ============================================================

const handleVerify = async (event) => {
event.preventDefault();

clearMessages();

if (!email) {
  setError(
    "Email address is missing. Please go back and create your account again."
  );
  return;
}

if (!isOtpComplete) {
  setError("Please enter the complete 6-digit verification code.");
  focusInput(
    otp.findIndex((digit) => !digit)
  );
  return;
}

if (isVerifying) {
  return;
}

try {
  setIsVerifying(true);

  const response = await API.post(
    "/auth/verify-email",
    {
      email,
      otp: otpValue,
    }
  );

  const data = response.data;

  console.log("VERIFY EMAIL RESPONSE:", data);

  if (!data?.success) {
    setError(
      data?.message ||
        "Email verification failed. Please try again."
    );
    return;
  }

  setIsVerified(true);

  setSuccess(
    data.message ||
      "Email verified successfully!"
  );

  sessionStorage.removeItem(
    "verificationEmail"
  );

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  if (data.user) {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  }

  window.setTimeout(() => {
    navigate("/dashboard", {
      replace: true,
    });
  }, 1400);
} catch (err) {
  console.error(
    "VERIFY EMAIL ERROR:",
    err.response?.data || err
  );

  const status = err.response?.status;
  const serverMessage =
    err.response?.data?.message;

  if (status === 400) {
    setError(
      serverMessage ||
        "Invalid verification code. Please check the OTP and try again."
    );
  } else if (status === 401) {
    setError(
      serverMessage ||
        "The verification code is incorrect."
    );
  } else if (status === 404) {
    setError(
      serverMessage ||
        "Verification service could not be found."
    );
  } else if (status === 410) {
    setError(
      serverMessage ||
        "This verification code has expired. Please request a new one."
    );
  } else if (status === 429) {
    setError(
      serverMessage ||
        "Too many verification attempts. Please try again later."
    );
  } else {
    setError(
      serverMessage ||
        "Unable to verify your email right now. Please try again."
    );
  }
} finally {
  setIsVerifying(false);
}

};

// ============================================================
// RESEND OTP
// ============================================================

const handleResend = async () => {
clearMessages();

if (!email) {
  setError(
    "Email address is missing. Please signup again."
  );
  return;
}

if (!canResend) {
  return;
}

try {
  setIsResending(true);

  const response = await API.post(
    "/auth/resend-otp",
    {
      email,
    }
  );

  const data = response.data;

  console.log("RESEND OTP RESPONSE:", data);

  if (!data?.success) {
    setError(
      data?.message ||
        "Unable to resend the verification code."
    );
    return;
  }

  clearOtp();
  setSecondsLeft(RESEND_COOLDOWN);

  setSuccess(
    data.message ||
      "A new verification code has been sent to your email."
  );

  window.setTimeout(() => {
    focusInput(0);
  }, 100);
} catch (err) {
  console.error(
    "RESEND OTP ERROR:",
    err.response?.data || err
  );

  const status = err.response?.status;
  const serverMessage =
    err.response?.data?.message;

  if (status === 404) {
    setError(
      serverMessage ||
        "Verification service is unavailable."
    );
  } else if (status === 429) {
    setError(
      serverMessage ||
        "Please wait before requesting another code."
    );
  } else {
    setError(
      serverMessage ||
        "Unable to resend the verification code. Please try again."
    );
  }
} finally {
  setIsResending(false);
}

};

// ============================================================
// MISSING EMAIL STATE
// ============================================================

if (!email) {
return ( <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 text-white"> <Background />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 w-full max-w-md rounded-[28px] border border-white/[0.08] bg-[#0a1020]/95 p-6 text-center shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:p-8"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10">
        <Mail className="text-red-300" size={24} />
      </div>

      <h1 className="mt-5 text-2xl font-bold">
        Verification email missing
      </h1>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        We couldn't determine which email address
        needs verification. Please return to signup
        and create your account again.
      </p>

      <Link
        to="/signup"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-5 py-3.5 text-sm font-bold transition hover:opacity-90"
      >
        Back to Signup
        <ArrowRight size={17} />
      </Link>

      <Link
        to="/login"
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-white"
      >
        <ArrowLeft size={15} />
        Back to Login
      </Link>
    </motion.div>
  </main>
);

}

// ============================================================
// SUCCESS STATE
// ============================================================

if (isVerified) {
return ( <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 text-white"> <Background />

    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 w-full max-w-md rounded-[28px] border border-emerald-400/15 bg-[#0a1020]/95 p-7 text-center shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:p-9"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.15,
          type: "spring",
          stiffness: 220,
        }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10"
      >
        <CheckCircle2
          size={30}
          className="text-emerald-400"
        />
      </motion.div>

      <h1 className="mt-6 text-2xl font-bold sm:text-3xl">
        Email verified!
      </h1>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
        Your CampusHub AI account is now verified.
        Redirecting you to dashboard...
      </p>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-emerald-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Verification complete
      </div>
    </motion.div>
  </main>
);

}

// ============================================================
// MAIN
// ============================================================

return ( <main className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white"> <Background />

  {/* ======================================================
      HEADER
  ====================================================== */}

  <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-8 sm:py-6">
    <Link
      to="/"
      className="group flex items-center gap-2.5"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20 transition group-hover:scale-105 sm:h-10 sm:w-10">
        <Sparkles
          size={18}
          className="sm:h-5 sm:w-5"
        />
      </div>

      <div>
        <p className="text-base font-bold tracking-tight sm:text-lg">
          CampusHub
          <span className="text-cyan-400">
            {" "}
            AI
          </span>
        </p>

        <p className="hidden text-[10px] uppercase tracking-[0.22em] text-slate-500 sm:block">
          Learn • Build • Grow
        </p>
      </div>
    </Link>

    <Link
      to="/login"
      className="hidden items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-cyan-400 sm:flex"
    >
      Already verified?
      <span>Sign in</span>
      <ArrowRight size={15} />
    </Link>
  </div>

  {/* ======================================================
      CONTENT
  ====================================================== */}

  <div className="relative z-10 mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-6xl items-center justify-center px-4 pb-8 pt-2 sm:px-8 sm:pb-12">
    <motion.section
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-[510px]"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0a1020]/95 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:rounded-[32px] sm:p-8">
        {/* Card glow */}
        <div className="pointer-events-none absolute -right-28 -top-28 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative">
          {/* Icon */}
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
              <ShieldCheck
                size={23}
                className="text-cyan-300"
              />
            </div>

            <span className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1.5 text-[9px] font-bold tracking-wide text-cyan-300 sm:text-[10px]">
              EMAIL VERIFICATION
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
            Verify your email
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the 6-digit code we sent to
          </p>

          <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-2.5">
            <Mail
              size={15}
              className="shrink-0 text-cyan-400"
            />

            <span className="min-w-0 truncate text-sm font-medium text-slate-200">
              {email}
            </span>
          </div>

          {/* Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="mt-5 overflow-hidden rounded-xl border border-red-400/15 bg-red-500/[0.06] px-3.5 py-3"
              >
                <div className="flex items-start gap-2">
                  <X
                    size={16}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <p className="text-xs leading-5 text-red-300 sm:text-sm">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}

            {!error && success && (
              <motion.div
                key="success"
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="mt-5 overflow-hidden rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-3.5 py-3"
              >
                <div className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-400"
                  />

                  <p className="text-xs leading-5 text-emerald-300 sm:text-sm">
                    {success}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OTP */}
          <form
            onSubmit={handleVerify}
            className="mt-7"
          >
            <div
              className="flex justify-center gap-2 sm:gap-3"
              role="group"
              aria-label="Email verification code"
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] =
                      element;
                  }}
                  value={digit}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete={
                    index === 0
                      ? "one-time-code"
                      : "off"
                  }
                  disabled={isVerifying}
                  aria-label={`OTP digit ${
                    index + 1
                  } of ${OTP_LENGTH}`}
                  onChange={(event) =>
                    handleChange(
                      index,
                      event.target.value
                    )
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(
                      index,
                      event
                    )
                  }
                  onPaste={handlePaste}
                  className={`h-12 w-10 rounded-xl border bg-[#070d1b] text-center text-lg font-bold text-white outline-none transition-all sm:h-14 sm:w-12 sm:rounded-2xl sm:text-xl ${
                    error
                      ? "border-red-400/30 focus:border-red-400/50 focus:ring-4 focus:ring-red-400/[0.06]"
                      : digit
                      ? "border-cyan-400/30 bg-cyan-400/[0.04]"
                      : "border-white/[0.08] focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/[0.06]"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                />
              ))}
            </div>

            <p className="mt-3 text-center text-[10px] text-slate-600">
              Enter the code exactly as received in your email.
            </p>

            {/* Verify */}
            <motion.button
              type="submit"
              disabled={
                !isOtpComplete ||
                isVerifying
              }
              whileHover={
                isOtpComplete &&
                !isVerifying
                  ? { y: -2 }
                  : {}
              }
              whileTap={
                isOtpComplete &&
                !isVerifying
                  ? { scale: 0.98 }
                  : {}
              }
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 py-3.5 text-sm font-bold shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-40 sm:py-4"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {isVerifying ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verifying email...
                </>
              ) : (
                <>
                  Verify email
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </motion.button>
          </form>

          {/* Resend */}
          <div className="mt-6 border-t border-white/[0.06] pt-5 text-center">
            <p className="text-xs text-slate-500">
              Didn't receive the code?
            </p>

            <div className="mt-2 flex items-center justify-center gap-2">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-white disabled:opacity-50"
                >
                  <RefreshCw
                    size={15}
                    className={
                      isResending
                        ? "animate-spin"
                        : ""
                    }
                  />

                  {isResending
                    ? "Sending..."
                    : "Resend OTP"}
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <Clock3 size={14} />
                  Resend available in{" "}
                  <span className="font-semibold text-slate-300">
                    {formatTime(secondsLeft)}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Login */}
          <Link
            to="/login"
            className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-cyan-400"
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-5 text-[9px] text-slate-600 sm:text-[10px]">
          <ShieldCheck size={12} />
          <span>Your verification is securely protected</span>
        </div>
      </div>

      {/* Mobile help */}
      <p className="mt-5 text-center text-[10px] text-slate-600 sm:hidden">
        Having trouble? Make sure you entered the correct email address.
      </p>
    </motion.section>
  </div>
</main>

);
}

// ============================================================
// BACKGROUND
// ============================================================

function Background() {
return ( <div className="pointer-events-none fixed inset-0 overflow-hidden"> <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px] sm:h-[520px] sm:w-[520px] sm:blur-[140px]" />

  <div className="absolute -bottom-48 -right-40 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[130px] sm:h-[550px] sm:w-[550px] sm:blur-[150px]" />

  <div className="absolute left-[42%] top-[35%] h-[250px] w-[250px] rounded-full bg-indigo-600/10 blur-[100px] sm:h-[300px] sm:w-[300px] sm:blur-[120px]" />

  <div
    className="absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
      backgroundSize: "55px 55px",
    }}
  />
</div>

);
}

export default VerifyEmail;
