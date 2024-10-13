import { User } from "../redux/features/authSlice";

export const isDemoUser = (user: User) => {
  return user.isDemo;
};
