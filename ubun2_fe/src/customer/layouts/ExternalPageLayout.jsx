import LandingIntro from "../components/Login/LandingIntro.jsx";
import {Outlet} from "react-router-dom";

const ExternalPageLayout = () => {
    return (
        <>
            <div className='min-h-screen flex items-center'>
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
                <div className='card mx-auto w-full max-w-5xl  shadow-xl'>
                    <div className='grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl'>
                        <div className='hide_1024'>
                            <LandingIntro/>
                        </div>
                        <div className="outlet_container">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExternalPageLayout;