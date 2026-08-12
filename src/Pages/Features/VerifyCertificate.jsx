import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShieldCheck,
  ShieldX,
  Loader2,
  ArrowLeft,
} from "lucide-react";

import api from "../../services/api";

export default function VerifyCertificate() {
  const { credentialId } = useParams();

  const [state, setState] = useState({
    loading: true,
    valid: null,
    data: null,
    message: "",
  });

  useEffect(() => {
    let cancelled = false;

    const verifyCertificate = async () => {
      if (!credentialId) {
        setState({
          loading: false,
          valid: false,
          data: null,
          message: "Credential ID is missing.",
        });
        return;
      }

      setState({
        loading: true,
        valid: null,
        data: null,
        message: "",
      });

      try {
        const response = await api.get(
          `/certificates/verify/${encodeURIComponent(
            credentialId
          )}`
        );

        if (cancelled) return;

        setState({
          loading: false,
          valid: response.data.valid === true,
          data: response.data.data || null,
          message: response.data.message || "",
        });
      } catch (error) {
        if (cancelled) return;

        setState({
          loading: false,
          valid: false,
          data: null,
          message:
            error.response?.data?.message ||
            "Verification failed. Please try again.",
        });
      }
    };

    verifyCertificate();

    return () => {
      cancelled = true;
    };
  }, [credentialId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* CARD */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">

          {/* BACK BUTTON */}
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Certificates
          </Link>

          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {state.loading && (
            <div className="py-12 text-center">

              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>

              <h1 className="text-xl font-bold text-white mb-2">
                Verifying Certificate
              </h1>

              <p className="text-sm text-slate-400 break-all">
                {credentialId}
              </p>

              <p className="text-xs text-slate-500 mt-3">
                Please wait while we verify this credential.
              </p>
            </div>
          )}

          {/* ================================================= */}
          {/* VALID CERTIFICATE */}
          {/* ================================================= */}

          {!state.loading &&
            state.valid &&
            state.data && (
              <div className="space-y-6">

                {/* SUCCESS HEADER */}
                <div className="text-center">

                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
                    Certificate Verified
                  </p>

                  <h1 className="text-2xl font-bold text-white">
                    {state.data.title}
                  </h1>

                  <p className="text-sm text-slate-400 mt-2">
                    This credential has been successfully verified.
                  </p>
                </div>

                {/* EXPIRED WARNING */}
                {state.data.isExpired && (
                  <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 px-4 py-3">
                    <p className="text-sm font-medium text-amber-300">
                      This certificate has expired.
                    </p>
                  </div>
                )}

                {/* CERTIFICATE DETAILS */}
                <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-5 space-y-4">

                  <InfoRow
                    label="Issuer"
                    value={state.data.issuer}
                  />

                  <InfoRow
                    label="Credential ID"
                    value={state.data.credentialId}
                    mono
                  />

                  <InfoRow
                    label="Issue Date"
                    value={formatDate(state.data.issueDate)}
                  />

                  {state.data.expiryDate && (
                    <InfoRow
                      label="Expiry Date"
                      value={formatDate(state.data.expiryDate)}
                    />
                  )}

                  <InfoRow
                    label="Status"
                    value={state.data.status}
                  />

                  <InfoRow
                    label="Verified"
                    value={state.data.verified ? "Yes" : "No"}
                  />
                </div>

                {/* SKILLS */}
                {Array.isArray(state.data.skills) &&
                  state.data.skills.length > 0 && (
                    <div>
                      <h2 className="text-sm font-semibold text-white mb-3">
                        Skills
                      </h2>

                      <div className="flex flex-wrap gap-2">
                        {state.data.skills.map(
                          (skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* CREDENTIAL ID FOOTER */}
                <div className="pt-4 border-t border-slate-800 text-center">
                  <p className="text-xs text-slate-500">
                    Credential ID
                  </p>

                  <p className="text-xs font-mono text-slate-400 mt-1 break-all">
                    {state.data.credentialId}
                  </p>
                </div>
              </div>
            )}

          {/* ================================================= */}
          {/* INVALID CERTIFICATE */}
          {/* ================================================= */}

          {!state.loading && !state.valid && (
            <div className="py-10 text-center">

              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
                <ShieldX className="w-8 h-8 text-red-400" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 mb-2">
                Verification Failed
              </p>

              <h1 className="text-2xl font-bold text-white mb-3">
                Certificate Not Verified
              </h1>

              <p className="text-sm text-slate-400 leading-6 max-w-sm mx-auto">
                {state.message ||
                  "This credential ID could not be verified."}
              </p>

              {/* TRY AGAIN */}
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-slate-600 mt-5">
          CampusHub AI • Certificate Verification
        </p>
      </div>
    </div>
  );
}

// ============================================================
// INFO ROW
// ============================================================

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-5">
      <span className="text-sm text-slate-500 shrink-0">
        {label}
      </span>

      <span
        className={`text-sm text-slate-200 font-medium text-right break-all ${
          mono ? "font-mono" : ""
        }`}
      >
        {value || "—"}
      </span>
    </div>
  );
}

// ============================================================
// DATE FORMATTER
// ============================================================

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}