import SearchBarWithDrop from "../../common/SearchBar/SearchBarWithDrop.jsx";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon.js";
import { tableColumn } from "../../common/Table/tableIndex.js";
import useSkeletonStore from "../../../store/skeletonStore.js";
import CreateSearchResult from "../../../utils/CreateSearchResult.jsx";
import LinkIcon from "@heroicons/react/24/outline/LinkIcon.js";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon.js";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon.js";



const SkeletonMemberTableFeature = () => {
    const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

    const {skeletonSearchCategory, skeletonSearchKeyword, skeletonTotalElements} = useSkeletonStore()
    
    return (
        <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
            <div className='flex gap-2 items-center'>
                <SearchBarWithDrop tableColumns={tableColumn.member.search} />
                <CreateSearchResult searchCategory={skeletonSearchCategory} searchKeyword={skeletonSearchKeyword} totalElements={skeletonTotalElements}/>
            </div>
            <div className='flex gap-2 items-center'>
                <button className='btn btn-ghost btn-sm normal-case'>
                    <ArrowPathIcon className='w-4 mr-2'/>
                    초기화
                </button>
                <button
                    className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50 flex gap-2 pr-6 items-center`}>
                    <LinkIcon className='w-5'/>
                    링크 전송
                </button>
                <button
                    className={`${commonButtonStyles} bg-white text-gray-600 hover:text-excel hover:bg-slate-50 flex gap-2 pr-6`}
                >
                    <svg width='24px' height='24px' viewBox='-4 0 64 64' xmlns='http://www.w3.org/2000/svg'
                         fill='#000000'>
                        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                        <g id='SVGRepo_iconCarrier'>
                            <path
                                d='M5.112.006c-2.802 0-5.073 2.273-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.902-20.31h-31.946z'
                                fillRule='evenodd'
                                clipRule='evenodd'
                                fill='#45B058'
                            ></path>
                            <path
                                d='M19.429 53.938c-.216 0-.415-.09-.54-.27l-3.728-4.97-3.745 4.97c-.126.18-.324.27-.54.27-.396 0-.72-.306-.72-.72 0-.144.035-.306.144-.432l3.89-5.131-3.619-4.826c-.09-.126-.145-.27-.145-.414 0-.342.288-.72.721-.72.216 0 .432.108.576.288l3.438 4.628 3.438-4.646c.127-.18.324-.27.541-.27.378 0 .738.306.738.72 0 .144-.036.288-.127.414l-3.619 4.808 3.891 5.149c.09.126.125.27.125.414 0 .396-.324.738-.719.738zm9.989-.126h-5.455c-.595 0-1.081-.486-1.081-1.08v-10.317c0-.396.324-.72.774-.72.396 0 .721.324.721.72v10.065h5.041c.359 0 .648.288.648.648 0 .396-.289.684-.648.684zm6.982.216c-1.782 0-3.188-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.36.27-.756.702-.756.144 0 .306.036.433.144.828.738 1.98 1.314 3.367 1.314 2.143 0 2.826-1.152 2.826-2.071 0-3.097-7.111-1.386-7.111-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.468 3.853 1.278.162.144.253.342.253.54 0 .36-.307.72-.703.72-.145 0-.307-.054-.432-.162-.883-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636 0 1.748-1.188 3.53-4.43 3.53z'
                                fill='#ffffff'
                            ></path>
                            <path
                                d='M55.953 20.352v1h-12.801s-6.312-1.26-6.127-6.707c0 0 .207 5.707 6.002 5.707h12.926z'
                                fillRule='evenodd'
                                clipRule='evenodd'
                                fill='#349C42'
                            ></path>
                            <path
                                d='M37.049 0v14.561c0 1.656 1.104 5.791 6.104 5.791h12.801l-18.905-20.352z'
                                opacity='.5'
                                fillRule='evenodd'
                                clipRule='evenodd'
                                fill='#ffffff'
                            ></path>
                        </g>
                    </svg>
                    엑셀 등록
                </button>
                <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50 flex gap-2 pr-6 items-center`}>
                    <UserPlusIcon className='w-5'/>
                    회원 등록
                </button>
                <button
                    className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 flex gap-2 pr-6 items-center`}>
                    <TrashIcon className='w-5'/>
                    삭제
                </button>
            </div>
        </div>
    );
}

export default SkeletonMemberTableFeature