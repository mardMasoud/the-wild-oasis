import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { creatEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
    const queryClient = useQueryClient()
    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        mutationFn: creatEditCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created");
           queryClient.invalidateQueries({
                queryKey: ["cabin"],
            });
            // reset();
        },
        onError: (err) => toast.error(err.message),
    });
    return{
        createCabin,isCreating
    }
}
