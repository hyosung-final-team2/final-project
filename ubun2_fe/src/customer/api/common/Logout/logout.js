import privateFetch from "../privateFetch.js";

export const logout = async () => await privateFetch.post("logout")