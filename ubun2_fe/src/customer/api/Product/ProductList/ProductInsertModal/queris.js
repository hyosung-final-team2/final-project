import {useQuery} from "@tanstack/react-query";
import {getAllCategories} from "./productInsertModal.js";

export const useGetAllCategories = () => {
    return useQuery({
        queryFn: () => getAllCategories(),
        queryKey: ['categories']
    })
}