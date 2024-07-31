import {columnMapping, betweenColumn, getKeyByValue} from "../components/common/Table/tableIndex.js";

const createSearchResult = ({ searchCategory, searchKeyword, totalElements }) => {
    if (searchCategory === null && searchKeyword === null) {
        return <p className="text-xl">전체 <span className="text-main font-bold">{totalElements}</span>건의 검색결과</p>;
    }

    const showCategory = getKeyByValue(columnMapping, searchCategory);
    if (!betweenColumn.has(searchCategory)) { // 숫자나 날짜
        return (
            <p className="text-lg">
                <span className="text-main font-bold">"{showCategory}"</span>에서
                <span className="text-main font-bold">"{searchKeyword}"</span>에 대한 총 <span className="text-main font-bold">{totalElements}</span>건의 검색결과
            </p>
        );
    } else {
        return (
            <p className="text-lg">
                <span className="text-main font-bold">"{showCategory}"</span>에서
                <span className="text-main font-bold">"{searchKeyword?.split(",")[0]} ~ {searchKeyword?.split(",")[1]}"</span>에 대한 총 <span className="text-main font-bold">{totalElements}</span>건의 검색결과
            </p>
        );
    }
};

export default createSearchResult;