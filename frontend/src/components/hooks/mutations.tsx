import { deleteTransaction } from "@/requests";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useDeleteTransaction() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
        }
    });
}