import privateFetch from "../../../customer/api/common/privateFetch.js";

export const createCart = async (cartData) => await privateFetch.post("/members/carts",cartData)