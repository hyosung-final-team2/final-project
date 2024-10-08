import SearchBarWithDrop from '../../common/SearchBar/SearchBarWithDrop';
import {tableColumn} from "../../common/Table/tableIndex.js";
import useSkeletonStore from "../../../store/skeletonStore.js";
import CreateSearchResult from "../../../utils/CreateSearchResult.jsx";

const SkeletonProductTableFeature = () => {
    const commonButtonStyles = 'px-4 py-2 rounded-lg transition duration-200 border border-gray-200 shadow-md';

    const {skeletonSearchCategory, skeletonSearchKeyword, skeletonTotalElements} = useSkeletonStore()


    return (
        <div className='flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900'>
            <div className='flex gap-2 items-center'>
                <SearchBarWithDrop tableColumns={tableColumn.product.search} />
                <CreateSearchResult searchCategory={skeletonSearchCategory} searchKeyword={skeletonSearchKeyword} totalElements={skeletonTotalElements}/>
            </div>
            <div className='flex gap-2'>
                <button className={`${commonButtonStyles} bg-white text-gray-600 hover:text-main hover:bg-slate-50`}>상품 등록</button>
                <button className={`${commonButtonStyles} bg-red-300 text-red-700 hover:text-white hover:bg-red-500 px-8`}>삭제</button>
            </div>
        </div>
    );
};
export default SkeletonProductTableFeature;
