import { useContext } from "react";
import { UserProfileContext } from "../context/userProfileContext";

// Hook to access the UserProfileContext
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);

  // Handle case where the context is undefined
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }

  return context;
};
