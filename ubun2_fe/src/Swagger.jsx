import {useEffect} from "react";

const SwaggerUIRedirect = () => {
    useEffect(() => {
        window.location.href = `${import.meta.env.VITE_PUSH_LINK}/swagger-ui/index.html`;
    }, []);
    return null;
};

export default SwaggerUIRedirect;