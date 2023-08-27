export const baseURL = import.meta.env.VITE_ENV == "prod" ? import.meta.env.VITE_API_ENDPOINT : "http://localhost:5000";
export const authConfig = (token) => {
  return {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const config = () => {
  return {
    headers: {
      "Content-type": "application/json",
    },
  };
};

export const login = () => `${baseURL}/user/login`;

export const signUp = () => `${baseURL}/user`;
