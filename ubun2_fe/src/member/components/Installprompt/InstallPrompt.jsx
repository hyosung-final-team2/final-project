import {useEffect, useState} from "react";
import SlideUpModal from "../common/SlideUpModal.jsx";

const InstallPrompt = () => {

    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleBeforeInstallPrompt = (event) => {
        event.preventDefault();
        setDeferredPrompt(event);
    };

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("사용자가 설치 프롬프트에 동의했습니다.");
                } else {
                    console.log("사용자가 설치 프롬프트를 무시했습니다.");
                }

                setDeferredPrompt(null);
            });
        }
    };

    const modalButtonStyle="bg-main text-white"
    const [isModalOpen,setModalState] = useState(true);

    return (
        <>
            {deferredPrompt &&
                <SlideUpModal isOpen={isModalOpen} setIsModalOpen={setModalState} buttonText="설치하기" buttonStyle={modalButtonStyle} buttonFunc={handleInstallClick} isInstallPrompt={true}>
                    <div className='flex flex-col items-center gap-2'>
                        <img  src="/prompt_logo.png" alt="로고" className="shadow-lg mb-3"/>
                        <h1 className='text-xl'>홈화면에 <span className='text-main text-bold'>OrderSwift앱</span> 추가하고</h1>
                        <p className='text-xl '>다양한 소식과 혜택을 받아보세요!</p>
                    </div>
                </SlideUpModal>

            }
        </>
    )
}

export default InstallPrompt;