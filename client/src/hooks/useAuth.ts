import { useQuery } from "@tanstack/react-query";
import type { User } from "@shared/schema";

export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/user"],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: false,
    refetchOnWindowFocus: false,
    enabled: false, // Disable automatic authentication for now
  });

  return {
    user: user as User | undefined,
    isLoading: false, // Set to false to allow landing page to load
    isAuthenticated: false, // Always show landing page
    error,
  };
}
