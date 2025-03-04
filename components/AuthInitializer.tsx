"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { setAuthenticated } from "@/redux/features/app-state-slice";
import { isAuthenticated, getPublicKey } from "@/lib/auth";

export const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only run authentication check after component is mounted on the client
    if (isMounted) {
      // Check if user is already authenticated
      if (isAuthenticated()) {
        const publicKey = getPublicKey();
        if (publicKey) {
          // Initialize the Redux store with the authentication state
          dispatch(setAuthenticated({ publicKey }));
        }
      }
    }
  }, [isMounted, dispatch]);

  // This component doesn't render anything
  return null;
};

export default AuthInitializer;
