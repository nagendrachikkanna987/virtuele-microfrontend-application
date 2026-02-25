import axiosInstance from './axiosConfig';

export interface Company {
  companyId: string;
  companyName: string;
  logo?: string;
  id?: string;
  name?: string;
}

/**
 * Fetches companies associated with the user.
 * Returns the raw array so the caller can handle presentation logic.
 */
export const fetchAssociatedCompanies = async (): Promise<Company[]> => {
  const response = await axiosInstance.get(
    '/api/user/nagendravirtueleus/associated-companies'
  );

  const payload = response.data;
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.companies)) {
    return payload.companies;
  }

  return [];
};
