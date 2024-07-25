import privateFetch from "../../../common/privateFetch.js";

export const getAllCategories = async () => await privateFetch.get("/customers/products/category")