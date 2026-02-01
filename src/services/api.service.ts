// API configuration
const isProduction = process.env.NODE_ENV === 'production';
export const API_BASE_URL = 'https://cms.medikost.id/api/v1/';

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // For development builds, temporarily disable SSL verification
  // This is only for development and should not be used in production
  const originalTlsReject = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  if (!isProduction) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    console.warn('⚠️  SSL certificate verification disabled for development API calls');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } finally {
    // Always restore the original SSL setting
    if (!isProduction) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalTlsReject;
    }
  }
};