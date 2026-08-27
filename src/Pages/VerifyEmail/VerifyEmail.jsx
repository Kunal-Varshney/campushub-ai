import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./VerifyEmail.css";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN);

  const inputRefs = useRef([]);

  const otpValue = otp.join("");
  const isOtpComplete = otpValue.length === OTP_LENGTH;

  const canResend = secondsLeft === 0 && !isResending;


  // ============================================================
  // FOCUS FIRST INPUT
  // ============================================================

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);


  // ============================================================
  // RESEND OTP COUNTDOWN
  // ============================================================

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);


  // ============================================================
  // FORMAT TIMER
  // ============================================================

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
  // CLEAR MESSAGES
  // ============================================================

  const clearMessages = () => {
    setErrorMessage("");
    setInfoMessage("");
  };


  // ============================================================
  // FOCUS INPUT
  // ============================================================

  const focusInput = (index) => {
    if (index >= 0 && index < OTP_LENGTH) {
      inputRefs.current[index]?.focus();
    }
  };


  // ============================================================
  // OTP CHANGE
  // ============================================================

  const handleChange = (index, value) => {
    const digits = value.replace(/\D/g, "");

    clearMessages();

    // Empty input
    if (!digits) {
      setOtp((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });

      return;
    }

    // If multiple digits are entered/pasted into an input
    if (digits.length > 1) {
      const nextOtp = [...otp];

      for (
        let i = 0;
        i < digits.length && index + i < OTP_LENGTH;
        i += 1
      ) {
        nextOtp[index + i] = digits[i];
      }

      setOtp(nextOtp);

      const nextIndex = Math.min(
        index + digits.length,
        OTP_LENGTH - 1
      );

      focusInput(nextIndex);

      return;
    }

    // Normal single digit
    setOtp((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });

    if (index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };


  // ============================================================
  // KEYBOARD HANDLING
  // ============================================================

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      event.preventDefault();

      if (otp[index]) {
        setOtp((prev) => {
          const next = [...prev];
          next[index] = "";
          return next;
        });
      } else if (index > 0) {
        setOtp((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });

        focusInput(index - 1);
      }

      clearMessages();
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
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
  // PASTE OTP
  // ============================================================

  const handlePaste = (event) => {
    event.preventDefault();

    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const nextOtp = Array(OTP_LENGTH).fill("");

    for (let i = 0; i < pasted.length; i += 1) {
      nextOtp[i] = pasted[i];
    }

    setOtp(nextOtp);
    clearMessages();

    focusInput(
      Math.min(pasted.length, OTP_LENGTH - 1)
    );
  };


  // ============================================================
  // RESET OTP
  // ============================================================

  const resetOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(""));
  };


  // ============================================================
  // VERIFY EMAIL
  // ============================================================

  const handleVerify = async (event) => {
    event.preventDefault();

    if (!isOtpComplete || isVerifying) {
      return;
    }

    if (!email) {
      setErrorMessage(
        "Email address is missing. Please go back and signup again."
      );
      return;
    }

    setIsVerifying(true);
    clearMessages();

    try {
      /*
       * Backend endpoint:
       *
       * POST /api/auth/verify-email
       *
       * Body:
       * {
       *   email,
       *   otp
       * }
       */

      const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api";

      const response = await axios.post(
        `${API_URL}/auth/verify-email`,
        {
          email,
          otp: otpValue,
        }
      );

      if (response.data?.success === false) {
        throw new Error(
          response.data?.message ||
            "Email verification failed."
        );
      }

      setIsVerified(true);
      setInfoMessage(
        response.data?.message ||
          "Email verified successfully!"
      );

      /*
       * Give the user a moment to see the success state,
       * then redirect to login.
       */
      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            email,
            message:
              "Email verified successfully. You can now login.",
          },
        });
      }, 1200);

    } catch (error) {
      const status = error.response?.status;
      const serverMessage =
        error.response?.data?.message;

      if (status === 400) {
        setErrorMessage(
          serverMessage ||
            "Invalid verification code. Please try again."
        );
      } else if (status === 401) {
        setErrorMessage(
          serverMessage ||
            "Verification code is incorrect."
        );
      } else if (status === 410) {
        setErrorMessage(
          serverMessage ||
            "This verification code has expired. Please request a new one."
        );
      } else if (status === 429) {
        setErrorMessage(
          serverMessage ||
            "Too many attempts. Please request a new code later."
        );
      } else {
        setErrorMessage(
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

  const handleResendOtp = async () => {
    if (!canResend) {
      return;
    }

    if (!email) {
      setErrorMessage(
        "Email address is missing. Please signup again."
      );
      return;
    }

    setIsResending(true);
    clearMessages();

    try {
      /*
       * Backend endpoint:
       *
       * POST /api/auth/resend-verification-otp
       *
       * Body:
       * {
       *   email
       * }
       */

      const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000/api";

      const response = await axios.post(
        `${API_URL}/auth/resend-verification-otp`,
        {
          email,
        }
      );

      if (response.data?.success === false) {
        throw new Error(
          response.data?.message ||
            "Could not resend verification code."
        );
      }

      resetOtp();

      setSecondsLeft(RESEND_COOLDOWN);

      setInfoMessage(
        response.data?.message ||
          "New verification code sent."
      );

      setTimeout(() => {
        focusInput(0);
      }, 50);

    } catch (error) {
      const status = error.response?.status;
      const serverMessage =
        error.response?.data?.message;

      if (status === 404) {
        setErrorMessage(
          serverMessage ||
            "Email verification service is unavailable."
        );
      } else if (status === 429) {
        setErrorMessage(
          serverMessage ||
            "Please wait before requesting another code."
        );
      } else {
        setErrorMessage(
          serverMessage ||
            "Could not resend the verification code. Please try again."
        );
      }
    } finally {
      setIsResending(false);
    }
  };


  // ============================================================
  // SUCCESS STATE
  // ============================================================

  if (isVerified) {
    return (
      <div className="verify-email-page">
        <div className="verify-email-card">

          <div
            className="verify-email-success-icon"
            aria-hidden="true"
          >
            ✓
          </div>

          <h1 className="verify-email-title">
            Email verified successfully!
          </h1>

          <p className="verify-email-subtitle">
            Your email address has been verified.
            Redirecting you to login...
          </p>

        </div>
      </div>
    );
  }


  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="verify-email-page">
      <div className="verify-email-card">

        {/* Logo */}
        <div className="verify-email-logo">
          CampusHub AI
        </div>


        {/* Heading */}
        <h1 className="verify-email-title">
          Verify your email address
        </h1>


        {/* Description */}
        <p className="verify-email-subtitle">
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="verify-email-address">
            {email || "your email address"}
          </span>
          .
        </p>


        {/* ==================================================
            OTP FORM
        ================================================== */}

        <form onSubmit={handleVerify}>

          <div
            className="otp-input-group"
            role="group"
            aria-label="6-digit email verification code"
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete={
                  index === 0
                    ? "one-time-code"
                    : "off"
                }
                maxLength={1}
                value={digit}
                disabled={isVerifying}
                onChange={(event) =>
                  handleChange(
                    index,
                    event.target.value
                  )
                }
                onKeyDown={(event) =>
                  handleKeyDown(index, event)
                }
                onPaste={handlePaste}
                className="otp-input-box"
                aria-label={`Digit ${
                  index + 1
                } of ${OTP_LENGTH}`}
              />
            ))}
          </div>


          {/* ==================================================
              MESSAGES
          ================================================== */}

          {errorMessage && (
            <p
              className="verify-email-message verify-email-message--error"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          {infoMessage && !errorMessage && (
            <p
              className="verify-email-message verify-email-message--success"
              role="status"
            >
              {infoMessage}
            </p>
          )}


          {/* ==================================================
              VERIFY BUTTON
          ================================================== */}

          <button
            type="submit"
            className="verify-email-button"
            disabled={
              !isOtpComplete || isVerifying
            }
          >
            {isVerifying ? (
              <>
                <span
                  className="verify-email-spinner"
                  aria-hidden="true"
                />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>

        </form>


        {/* ==================================================
            RESEND OTP
        ================================================== */}

        <div className="verify-email-resend">

          <p className="verify-email-resend-prompt">
            Didn&apos;t receive the code?
          </p>

          {canResend ? (
            <button
              type="button"
              className="verify-email-resend-button"
              onClick={handleResendOtp}
              disabled={isResending}
            >
              {isResending
                ? "Sending..."
                : "Resend OTP"}
            </button>
          ) : (
            <span className="verify-email-resend-timer">
              Resend in {formatTime(secondsLeft)}
            </span>
          )}

        </div>


        {/* ==================================================
            BACK TO LOGIN
        ================================================== */}

        <Link
          to="/login"
          className="verify-email-back-link"
        >
          ← Back to Login
        </Link>

      </div>
    </div>
  );
};

export default VerifyEmail;