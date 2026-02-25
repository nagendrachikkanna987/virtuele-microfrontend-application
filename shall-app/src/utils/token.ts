const padBase64Url = (value: string) => {
  let normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  while (normalized.length % 4 !== 0) {
    normalized += '=';
  }
  return normalized;
};

export const getUserIdFromToken = (): number | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return undefined;
  }

  const [, payloadSegment] = token.split('.');
  if (!payloadSegment) {
    return undefined;
  }

  try {
    const decoded = JSON.parse(atob(padBase64Url(payloadSegment))) as Record<string, unknown>;
    const candidate =
      decoded.userId ?? decoded.sub ?? decoded.uid ?? decoded.preferred_username ?? decoded.id;

    if (typeof candidate === 'number') {
      return candidate;
    }

    if (typeof candidate === 'string' && candidate.trim()) {
      const parsed = Number(candidate);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Unable to decode token payload', error);
  }

  return undefined;
};

export const parsePositiveNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
