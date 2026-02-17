import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/storage";
import { type InsertUser, type User } from "@shared/schema";
import { useLocation } from "wouter";

export function useAuth() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: api.auth.me,
  });

  const loginMutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "me"], user);
      if (user.onboardingCompleted) {
        setLocation("/dashboard");
      } else {
        setLocation("/onboarding");
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: api.auth.signup,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "me"], user);
      setLocation("/onboarding");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth", "me"], null);
      setLocation("/");
    },
  });
  
  const updateUserMutation = useMutation({
    mutationFn: api.auth.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["auth", "me"], updatedUser);
    }
  });

  return {
    user,
    isLoading,
    login: loginMutation.mutate,
    signup: signupMutation.mutate,
    logout: logoutMutation.mutate,
    updateUser: updateUserMutation.mutate,
    isPending: loginMutation.isPending || signupMutation.isPending || updateUserMutation.isPending
  };
}
