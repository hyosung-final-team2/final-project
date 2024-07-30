import {customModalTheme} from "../common/Modal/ModalStyle.js";
import {Modal} from "flowbite-react";
import HorizontalBarChart from "./chart/HorizontalBarChart.jsx";
import OrderOptionBadge from "../common/Badge/OrderOptionBadge.jsx";
import DownIcon from "@heroicons/react/24/outline/ChevronDoubleDownIcon.js"
import UpIcon from "@heroicons/react/24/outline/ChevronDoubleUpIcon.js"
import TotalIcon from "@heroicons/react/24/outline/PresentationChartBarIcon.js"
import PieChart from "./chart/PieChart.jsx";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline/index.js";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'


const MonthSummaryModal = ({isOpen,setOpenModal,currentMonth,previousMonth,currentDate,previousDate}) => {

    const upAndDown = (currentData, previousData) => {

        if (currentData - previousData > 0) {
            return (
                <div className='flex items-center'>
                    (
                    <span className='text-red-500'>{(currentData - previousData).toLocaleString()}</span>
                    <UpIcon className="w-4 h-4 ml-1 text-red-500" style={{ strokeWidth: 3 }}/>
                    )
                </div>
            )
        } else if (previousData - currentData > 0) {
            return (
                <div className='flex items-center'>
                    (
                    <span className="text-blue-500">{(currentData - previousData).toLocaleString()}</span>
                    <DownIcon className="w-4 h-4 ml-1 text-blue-500" style={{ strokeWidth: 3 }}/>
                    )
                </div>
            )
        } else {
            return (
                <div className='flex items-center '>
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                             stroke="currentColor"
                             className="size-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.499 8.248h15m-15 7.501h15"/>
                        </svg>
                    )
                </div>
            )
        }

    }

    return (
        <Modal
            dismissible
            show={isOpen}
            theme={customModalTheme}
            onClose={() => {
                setOpenModal(false);
            }}
            size='3xl'
        >
            <Modal.Header>
                <div className='text-xl font-bold'>{currentDate.year}년 {currentDate.month}월<span className="text-red-500 text-xs ml-2">*괄호안의 값은 전월 대비 값입니다.</span></div>
            </Modal.Header>

            <Modal.Body>
                {!(currentMonth?.monthTotalOrderCount === 0 && previousMonth?.monthTotalOrderCount === 0) ?
                    (
                    <>
                    <div className="w-full h-full py-8 flex flex-col">
                        {/* 단건 & 정기 */}
                        <div className='flex' style={{flex: 5}}>
                            <div className="w-48/100 flex flex-col gap-2">
                                <OrderOptionBadge subscription={false}/>
                                <HorizontalBarChart currentDate={currentDate} previousDate={previousDate}
                                                    currentMonthCount={currentMonth?.monthOrderCount}
                                                    previousMonthCount={previousMonth?.monthOrderCount}/>
                                <div className='flex gap-1 font-bold'>
                                    <div>• 주문건수 : {currentMonth?.monthOrderCount} 건</div>
                                    {upAndDown(currentMonth?.monthOrderCount, previousMonth?.monthOrderCount)}
                                </div>
                                <div className='flex gap-1 font-bold'>
                                    <div>• 단건매출 : {currentMonth?.monthOrderTotalSales.toLocaleString()} 원</div>
                                    {upAndDown(currentMonth?.monthOrderTotalSales, previousMonth?.monthOrderTotalSales)}
                                </div>
                            </div>
                            <div className="w-4/100"></div>
                            <div className="w-48/100 flex flex-col gap-2">
                                <OrderOptionBadge subscription={true}/>
                                <HorizontalBarChart currentDate={currentDate} previousDate={previousDate}
                                                    currentMonthCount={currentMonth?.monthSubscriptionOrderCount}
                                                    previousMonthCount={previousMonth?.monthSubscriptionOrderCount}/>
                                <div className='flex gap-1 font-bold'>
                                    <div>• 주문건수 : {currentMonth?.monthSubscriptionOrderCount} 건</div>
                                    {upAndDown(currentMonth?.monthSubscriptionOrderCount, previousMonth?.monthSubscriptionOrderCount)}
                                </div>

                                <div className='flex gap-1 font-bold'>
                                    <div>• 정기매출 : {currentMonth?.monthSubscriptionOrderTotalSales.toLocaleString()} 원</div>
                                    {upAndDown(currentMonth?.monthSubscriptionOrderTotalSales, previousMonth?.monthSubscriptionOrderTotalSales)}
                                </div>
                            </div>
                        </div>
                        {/* 총 매출 */}
                        <div className="w-full" style={{flex: 5}}></div>
                    </div>
                        <hr/>
                    <div style={{paddingTop:"2rem"}}>
                        <div className="flex items-center gap-1">
                            <TotalIcon className="w-8 h-8"/>
                            <span>주문 통계</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PieChart single={currentMonth?.monthOrderTotalSales} subscription={currentMonth?.monthSubscriptionOrderTotalSales}/>
                            <div className="flex flex-col gap-4 font-bold">
                                <div className='flex gap-1 font-bold items-center'>
                                    <div>• 일 평균 주문 : {currentMonth?.monthAverageDailyOrderCount.toLocaleString()} 건</div>
                                    {upAndDown(currentMonth?.monthAverageDailyOrderCount, previousMonth?.monthAverageDailyOrderCount)}
                                    <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400 cursor-pointer"
                                                            data-tooltip-id="monthAverageDailyOrderCount"
                                                            data-tooltip-content="일 평균 주문건수 (총 주문건수 / 일)"
                                                            data-tooltip-place="top"/>
                                    <Tooltip
                                        id="monthAverageDailyOrderCount"
                                    />

                                </div>
                                <div className='flex gap-1 font-bold items-center'>
                                    <div>• 일 평균 매출 : {currentMonth?.monthAverageDailySales.toLocaleString()} 원</div>
                                    {upAndDown(currentMonth?.monthAverageDailySales, previousMonth?.monthAverageDailySales)}
                                    <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400 cursor-pointer"
                                                            data-tooltip-id="monthAverageDailySales"
                                                            data-tooltip-content="일 평균 매출액 (총 매출액 / 일)"
                                                            data-tooltip-place="top"/>
                                    <Tooltip
                                        id="monthAverageDailySales"
                                    />
                                </div>
                                <div className='flex gap-1 font-bold items-center'>
                                    <div>• 총 주문 건수 : {currentMonth?.monthTotalOrderCount.toLocaleString()} 건</div>
                                    {upAndDown(currentMonth?.monthTotalOrderCount, previousMonth?.monthTotalOrderCount)}
                                    <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400 cursor-pointer"
                                                            data-tooltip-id="monthTotalOrderCount"
                                                            data-tooltip-content="단건 주문 건수 + 정기 주문 건수"
                                                            data-tooltip-place="top"/>
                                    <Tooltip
                                        id="monthTotalOrderCount"
                                    />
                                </div>
                                <div className='flex gap-1 font-bold items-center'>
                                    <div>• 총 매출 : {currentMonth?.monthTotalSales.toLocaleString()} 원</div>
                                    {upAndDown(currentMonth?.monthTotalSales, previousMonth?.monthTotalSales)}
                                    <QuestionMarkCircleIcon className="w-5 h-5 text-gray-400 cursor-pointer"
                                                            data-tooltip-id="monthTotalSales"
                                                            data-tooltip-content="단건 주문 매출 + 정기 주문 매출"
                                                            data-tooltip-place="top"/>
                                    <Tooltip
                                        id="monthTotalSales"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    </>
                    ) : (<div className="w-full h-full py-14 flex justify-center items-center bg-base-200 rounded-xl">이번 달과 지난 달의 매출 데이터가 존재하지 않습니다</div>)
                }
            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>

        </Modal>
    )
}

export default MonthSummaryModal