const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export function sanitizeHref(href, fallback = "#") {
  if (typeof href !== "string") {
    return fallback;
  }

  const normalizedHref = href.trim();
  if (!normalizedHref) {
    return fallback;
  }

  if (normalizedHref.startsWith("#") || normalizedHref.startsWith("/")) {
    return normalizedHref;
  }

  try {
    const parsedUrl = new URL(normalizedHref, "http://localhost");
    if (!SAFE_PROTOCOLS.has(parsedUrl.protocol)) {
      return fallback;
    }

    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return parsedUrl.toString();
    }

    return normalizedHref;
  } catch {
    return fallback;
  }
}

export function isExternalHttpUrl(href) {
  const sanitizedHref = sanitizeHref(href, "");
  return sanitizedHref.startsWith("http://") || sanitizedHref.startsWith("https://");
}

export function getRemainingCooldown(storageKey, cooldownMs) {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const lastSubmittedAt = Number(window.sessionStorage.getItem(storageKey) || 0);
    if (!Number.isFinite(lastSubmittedAt) || lastSubmittedAt <= 0) {
      return 0;
    }

    return Math.max(0, cooldownMs - (Date.now() - lastSubmittedAt));
  } catch {
    return 0;
  }
}

export function rememberSubmission(storageKey) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(storageKey, String(Date.now()));
  } catch {
    // Ignore storage errors so form delivery still works in private browsing modes.
  }
}
