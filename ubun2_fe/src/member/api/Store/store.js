import privateFetch from "../../../customer/api/common/privateFetch.js";

export const getStores = async () => await privateFetch.get("/members/stores")

export const getProductsByCategory = async (customerId,page,size,categoryName) => await privateFetch.get(`/members/products/${customerId}/category`,{
    params: {
        page: page - 1,
        size: size,
        categoryName
    },
})

export const getProductDetail = async (customerId,productId) => await privateFetch.get(`/members/products/${customerId}/${productId}`,{})

export const getAnnouncement = async (customerId) => await privateFetch.get(`/members/announcement/${customerId}`)

export const getCategory = async (customerId) => await privateFetch.get(`members/store/${customerId}/category`)