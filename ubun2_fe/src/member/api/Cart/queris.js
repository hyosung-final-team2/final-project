import {useMutation} from "@tanstack/react-query";
import {createCart} from "./cart.js";
import useMemberStore from "../../store/memberStore.js";
import useStoreStore from "../../store/storeStore.js";

export const useCreateCart = (cartAddProduct) => {
    const {memberId} = useMemberStore()
    const {customerId} = useStoreStore()
    const cartProducts = [cartAddProduct]

    const cartData = [{
        customerId,
        memberId,
        cartProducts
    }]

    return useMutation({
        mutationFn: () => createCart(cartData),
    });
}