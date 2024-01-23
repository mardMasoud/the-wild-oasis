import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatEditCabin } from "../../services/apiCabins";
export function useEditCabin() {
    const queryClient = useQueryClient();
    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => creatEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("New cabin successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
        },
        onError: (err) => toast.error(err.message),
    });
    return{
        editCabin,isEditing 
    }
}
