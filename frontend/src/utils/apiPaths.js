const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_PATHS = {
  LOGIN: `${BASE_URL}/login`,
  SIGNUP: `${BASE_URL}/signup`,
  LOGOUT: `${BASE_URL}/logout`,
  PROFILE: `${BASE_URL}/profile`,
  CHANGE_PASSWORD: `${BASE_URL}/change-password`,
  DASHBOARD: {
    GET: `${BASE_URL}/dashboard/get`,
  },
  INCOME: {
    ADD: `${BASE_URL}/income/add`,
    GET: `${BASE_URL}/income/get`,
    DELETE: (id) => `${BASE_URL}/income/${id}`,
    DOWNLOAD_EXCEL: `${BASE_URL}/income/download/excel`,
  },
  EXPENSE: {
    ADD: `${BASE_URL}/expense/add`,
    GET: `${BASE_URL}/expense/get`,
    DELETE: (id) => `${BASE_URL}/expense/${id}`,
    DOWNLOAD_EXCEL: `${BASE_URL}/expense/download/excel`,
  },
};

export { BASE_URL };
export default API_PATHS;
