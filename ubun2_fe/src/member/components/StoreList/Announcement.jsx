import { useGetAnnouncement } from "../../api/Store/queris.js";
import useStoreStore from "../../store/storeStore.js";

const Announcement = () => {
    const { currentStoreName, customerId } = useStoreStore();
    const { data: announcement } = useGetAnnouncement(customerId);

    const parseParagraphs = (text) => {
        return text?.split(/\r?\n/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ));
    };

    return (
        <>
            <h1 className='text-xl font-bold pb-3'>{currentStoreName}에서 알려드립니다.</h1>
            {parseParagraphs(announcement?.data?.data?.announcement)}
        </>
    );
};

export default Announcement;