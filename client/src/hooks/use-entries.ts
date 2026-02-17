import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/storage";
import { type InsertEntry } from "@shared/schema";

export function useEntries() {
  const queryClient = useQueryClient();

  const { data: entries, isLoading } = useQuery({
    queryKey: ["entries"],
    queryFn: api.entries.list,
  });

  const createEntryMutation = useMutation({
    mutationFn: api.entries.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  return {
    entries,
    isLoading,
    createEntry: createEntryMutation.mutate,
    isCreating: createEntryMutation.isPending,
  };
}
