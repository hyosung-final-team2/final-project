import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';
import {betweenColumn, columnMapping, getKeyByValue, tableColumn} from "../../common/Table/tableIndex.js";
import useSkeletonStore from "../../../store/skeletonStore.js";

const SkeletonProductTableFeature = () => {
    const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

    const {skeletonSearchCategory, skeletonSearchKeyword, skeletonTotalElements} = useSkeletonStore()

    const createSearchResult = (searchCategory, searchKeyword, totalElements) => {
        if (searchCategory === null && searchKeyword === null) {
            return <p className="text-xl">전체 <span className="text-main font-bold">{totalElements}</span>건의 검색결과</p>
        }

        const showCategory = getKeyByValue(columnMapping, searchCategory);
        if (!betweenColumn.has(searchCategory)) { // 숫자나 날짜
            return (<p className="text-lg">
                <span className="text-main font-bold">"{showCategory}"</span>에서
                <span className="text-main font-bold">"{searchKeyword}"</span>에 대한 총 <span className="text-main font-bold">{totalElements}</span>건의 검색결과
            </p>)
        } else {
            return (<p className="text-lg">
                <span className="text-main font-bold">"{showCategory}"</span>에서
                <span className="text-main font-bold">"{searchKeyword?.split(",")[0]} ~ {searchKeyword?.split(",")[1]}"</span>에 대한 총 <span className="text-main font-bold">{totalElements}</span>건의 검색결과
            </p>)
        }
    }

    return (
        <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
            <div className='flex gap-2 items-center'>
                <SearchBarWithDrop tableColumns={tableColumn.product} />
                {createSearchResult(skeletonSearchCategory,skeletonSearchKeyword,skeletonTotalElements)}
            </div>
            <div className='flex gap-2'>
                <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`}>상품 등록</button>
                <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
            </div>
        </div>
    );
};
export default SkeletonProductTableFeature;
