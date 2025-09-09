import type { User } from "@shared/schema";

export function useAuth() {
  // Temporary bypass for development - no API calls
  return {
    user: undefined,
    isLoading: false,
    isAuthenticated: false,
    error: null,
  };
}
