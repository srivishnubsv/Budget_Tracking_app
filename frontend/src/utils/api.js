import API_PATHS from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const getProfile = async () => {
  const res = await axiosInstance.get(API_PATHS.PROFILE);
  return res.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  const res = await axiosInstance.post(API_PATHS.CHANGE_PASSWORD, {
    oldPassword,
    newPassword,
  });
  return res.data;
};
