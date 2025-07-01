import { createContext } from "react";
import { UserProfileContextType } from "@/types/types";

// Context to hold the user's profile data, with setter function included
export const UserProfileContext = createContext<
  UserProfileContextType | undefined
>(undefined); // Use undefined initially
