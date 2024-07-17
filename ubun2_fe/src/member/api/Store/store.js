import privateFetch from "../../../customer/api/common/privateFetch.js";

export const getStores = async () => await privateFetch.get("/members/stores")

export const getProducts = async (customerId,page,size) => await privateFetch.get(`/members/products/${customerId}`,{
    params: {
        page: page - 1,
        size: size,
    },
})

export const getProductDetail = async (customerId,productId) => await privateFetch.get(`/members/products/${customerId}/${productId}`,{})

export const getAnnouncement = async (customerId) => await privateFetch.get(`/members/announcement/${customerId}`)