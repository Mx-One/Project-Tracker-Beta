import React, { useEffect, useState } from "react";
import { supabaseClient } from "../utility";
import { UserProfileContext } from "../context/userProfileContext";
import { UserProfile } from "@/types/types";
import { UserProfileProviderProps } from "@/types/types";

/**
 * The UserProfileProvider is a React Context Provider that fetches the user profile
 * data from the database and provides it to the application.
 *
 * The UserProfileProvider fetches the user profile data when it mounts and provides
 * the data and a setter function to update the data to its children.
 *
 * The data is fetched from the "user_profile" table in the database, using the
 * user_id of the current user as the filter. The data is then stored in the
 * component's state and passed to the children components as part of the
 * UserProfileContext.
 *
 * @param {ReactNode} children - The children components that should have access
 * to the user profile data.
 * @returns {JSX.Element} - The UserProfileProvider component.
 */
export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    user_id: "",
    name: "",
    role: [],
    avatar: "",
  });

  // Function to fetch user profile data
  const fetchUserProfile = async () => {
    const user = await supabaseClient.auth.getUser();
    if (user.data?.user) {
      const { id } = user.data.user;
      const { data } = await supabaseClient
        .from("user_profile")
        .select("user_id, name, role, avatar")
        .eq("user_id", id)
        .single();

      if (data) {
        setUserProfile(data);
      }
    }
  };

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
