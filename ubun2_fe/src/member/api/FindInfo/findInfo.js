import publicFetch from "../../../customer/api/common/publicFetch.js";

export const findLoginId = async (findIdData) => await publicFetch.post("/find/id", findIdData)

export const findPassword = async (findPasswordData) => await publicFetch.post("/find/password", findPasswordData)