import publicFetch from "../../../customer/api/common/publicFetch.js";

export const memberSignup = async (signupData) => await publicFetch.post("/members/signup", signupData);