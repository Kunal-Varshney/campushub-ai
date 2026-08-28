// ============================================================
// DISPOSABLE / TEMPORARY EMAIL PROTECTION
// ============================================================

import dns from "dns";

// ------------------------------------------------------------
// Disposable / temporary email domain blocklist
// ------------------------------------------------------------

const DISPOSABLE_DOMAINS = [
  "mailinator.com",
  "mailinator.net",
  "mailinator.org",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamail.de",
  "sharklasers.com",
  "10minutemail.com",
  "10minutemail.net",
  "10minemail.com",
  "20minutemail.com",
  "temp-mail.org",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "tempmail.dev",
  "tempinbox.com",
  "tempinbox.co",
  "throwawaymail.com",
  "throwaway.email",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "trashmail.com",
  "trashmail.net",
  "trashmail.me",
  "dispostable.com",
  "getnada.com",
  "getairmail.com",
  "fakeinbox.com",
  "fakemailgenerator.com",
  "mytemp.email",
  "mohmal.com",
  "mohmal.in",
  "emailondeck.com",
  "maildrop.cc",
  "discard.email",
  "discardmail.com",
  "mintemail.com",
  "moakt.com",
  "mailnesia.com",
  "mailcatch.com",
  "spamgourmet.com",
  "spambog.com",
  "spam4.me",
  "harakirimail.com",
  "burnermail.io",
  "burnthisemail.com",
  "emailtemporario.com.br",
  "temporarymail.com",
  "temporary-mail.net",
  "tempr.email",
  "inboxbear.com",
  "mailtemp.info",
  "eyepaste.com",
  "byom.de",
  "anonbox.net",
  "mytrashmail.com",
  "0-mail.com",
  "0815.ru",
  "33mail.com",
  "jetable.org",
  "meltmail.com",
  "mailnull.com",
  "spamex.com",
  "no-spam.ws",
  "tafmail.com",
  "tmail.ws",
  "tmpmail.org",
  "tmpmail.net",
  "tmpeml.com",
  "tmpbox.net",
  "luxusmail.org",
  "wegwerfmail.de",
  "wegwerfmail.net",
  "wegwerfmail.org",
  "einrot.com",
  "fleckens.hu",
  "gustr.com",
  "objectmail.com",
  "proxymail.eu",
  "rcpt.at",
  "trbvm.com",
];

const DISPOSABLE_DOMAIN_SET = new Set(DISPOSABLE_DOMAINS);

// ------------------------------------------------------------
// Basic email format validation
// ------------------------------------------------------------

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates basic email syntax.
 */
export function isValidEmailFormat(email) {
  if (typeof email !== "string") return false;

  const trimmed = email.trim();

  if (!trimmed) return false;

  return EMAIL_FORMAT_REGEX.test(trimmed);
}

/**
 * Extracts and normalizes the domain from an email address.
 */
export function getEmailDomain(email) {
  if (typeof email !== "string") return null;

  const trimmed = email.trim().toLowerCase();

  const atIndex = trimmed.lastIndexOf("@");

  if (atIndex === -1 || atIndex === trimmed.length - 1) {
    return null;
  }

  return trimmed.slice(atIndex + 1);
}

/**
 * Checks whether an email belongs to a known
 * disposable / temporary email provider.
 */
export function isDisposableEmail(email) {
  const domain = getEmailDomain(email);

  if (!domain) {
    return {
      isDisposable: false,
      domain: null,
      reason: null,
    };
  }

  if (DISPOSABLE_DOMAIN_SET.has(domain)) {
    return {
      isDisposable: true,
      domain,
      reason: "disposable_email_domain",
    };
  }

  return {
    isDisposable: false,
    domain,
    reason: null,
  };
}

/**
 * Advisory-only MX record lookup.
 *
 * This NEVER blocks registration.
 */
export function checkMxRecordsAdvisory(domain) {
  return new Promise((resolve) => {
    if (!domain) {
      resolve({
        checked: false,
        hasMxRecords: null,
      });

      return;
    }

    dns.resolveMx(domain, (error, addresses) => {
      if (error) {
        resolve({
          checked: true,
          hasMxRecords: null,
        });

        return;
      }

      resolve({
        checked: true,
        hasMxRecords:
          Array.isArray(addresses) && addresses.length > 0,
      });
    });
  });
}