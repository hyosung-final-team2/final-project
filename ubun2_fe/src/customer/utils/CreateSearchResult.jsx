import {columnMapping, betweenColumn, getKeyByValue} from "../components/common/Table/tableIndex.js";
import {useLocation} from "react-router-dom";

const CreateSearchResult = ({ searchCategory, searchKeyword, totalElements }) => {
    const location = useLocation();

    if (searchCategory === null && searchKeyword === null) {
        return <p className="text-xl">전체 <span className="text-main font-bold">{totalElements}</span>건의 검색결과</p>;
    }

    const showCategory = getKeyByValue(columnMapping, searchCategory);
    const getDisplayCategory = () => {
        if (searchCategory === 'createdAt') {
            if (location.pathname.includes("/customer/app/pendingorder") || location.pathname.includes("/customer/app/order")) {
                return "주문 일자";
            } else if (location.pathname.includes("/customer/app/member")) {
                return "가입일";
            }
        }
        return showCategory;
    };


    if (!betweenColumn.has(searchCategory)) { // 숫자나 날짜
        return (
            <p className="text-lg">
                <span className="text-main font-bold">"{showCategory}"</span>에서
                <span className="text-main font-bold">"{searchKeyword}"</span>에 대한 총 <span className="text-main font-bold">{totalElements}</span>건의 검색결과
            </p>
        );
    } else {

        const splitData = (searchKeyword) => {
            const [firstData, secondData] = searchKeyword.split(",");

            if (searchCategory === 'createdAt') {
                 if (firstData === secondData) {
                    return `${firstData}`;
                } else {
                    return `${firstData} - ${secondData}`;
                }
            } else {
                let unit = "";
                switch (searchCategory) {
                    case 'stockQuantity':
                        unit = "개";
                        break;
                    case 'productPrice':
                        unit = "원";
                        break;
                    case 'productDiscount':
                        unit = "%";
                        break;
                    case 'totalCost':
                        unit = "원";
                        break;
                    default:
                        unit = "";
                }

                if (firstData === "0") {
                    return `${parseInt(secondData).toLocaleString()}${unit} 이하`;
                } else if (secondData === "1000000000") {
                    return `${parseInt(firstData).toLocaleString()}${unit} 이상`;
                } else if (firstData === secondData) {
                    return `${parseInt(firstData).toLocaleString()}${unit}`;
                } else {
                    return `${parseInt(firstData).toLocaleString()}${unit} - ${parseInt(secondData).toLocaleString()}${unit}`;
                }
            }
        }

        return (
            <p className="text-lg">
                <span className="text-main font-bold">"{getDisplayCategory()}"</span>에서
                <span className="text-main font-bold">"{splitData(searchKeyword)}"</span>에 대한 총 <span className="text-main font-bold">{totalElements}</span>건의 검색결과
            </p>
        );
    }
};

export default CreateSearchResult;