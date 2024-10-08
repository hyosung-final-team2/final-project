import { useEffect, useState } from "react";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import { CALENDAR_EVENT_STYLE } from "./util";
import {useGetCalendarOrders, useGetMonthSummary} from "../../api/Calendar/queris.js";
import ChartBarIcon from "@heroicons/react/24/outline/esm/ChartBarIcon.js";
import MonthSummaryModal from "./MonthSummaryModal.jsx";

const THEME_BG = CALENDAR_EVENT_STYLE;

const CalendarView = () => {
    const today = moment().startOf('day');
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const colStartClasses = [
        "",
        "col-start-2",
        "col-start-3",
        "col-start-4",
        "col-start-5",
        "col-start-6",
        "col-start-7",
    ];

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month'));
    const [events, setEvents] = useState([]);
    const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));
    const [yearMonth, setYearMonth] = useState({ year: firstDayOfMonth.year(), month: firstDayOfMonth.month() + 1 });

    const firstDayOfLastMonth = today.clone().subtract(1, 'months').startOf('month');
    const [lastYearMonth, setLastYearMonth] = useState({year: firstDayOfLastMonth.year(), month: firstDayOfLastMonth.month() + 1});


    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    useEffect(() => {
        setYearMonth({ year: firstDayOfMonth.year(), month: firstDayOfMonth.month() + 1 });

        const firstDayOfLastMonth = firstDayOfMonth.clone().subtract(1, 'months').startOf('month');
        setLastYearMonth({
            year: firstDayOfLastMonth.year(),
            month: firstDayOfLastMonth.month() + 1,
        });
    }, [firstDayOfMonth]);

    const {data:calendarData} = useGetCalendarOrders(yearMonth.year,yearMonth.month)
    const {data:summaryData} = useGetMonthSummary(yearMonth.year,yearMonth.month)
    const currentMonth = summaryData?.data?.data?.currentMonth
    const previousMonth = summaryData?.data?.data?.previousMonth

    useEffect(() => {
        const mappedEvents = calendarData?.data?.data?.map(event => ({
            ...event,
            startTime: moment(event.startTime),
            endTime: moment(event.endTime)
        }));
        setEvents(mappedEvents);
    }, [calendarData]);


    const allDaysInMonth = () => {
        let start = moment(firstDayOfMonth).startOf('week');
        let end = moment(firstDayOfMonth).endOf('month').endOf('week');
        const days = [];
        let day = start;

        while (day <= end) {
            days.push(day.toDate());
            day = day.clone().add(1, 'd');
        }

        return days;
    };

    const getEventsForCurrentDate = (date) => {
        let filteredEvents = events?.filter(e => {
            if (e.count !== 0) {
                return moment(date).isSame(e.startTime, 'day');
            }
        });

        if (filteredEvents?.length > 0) {
            const totalDaySales = filteredEvents?.reduce((total, event) => total + (event.price || 0), 0);
            filteredEvents?.push({ title: `일 매출 : ${totalDaySales.toLocaleString('ko-KR')} 원 `, type: "PRICE" });
        }

        return filteredEvents;
    };


    const isToday = (date) => moment(date).isSame(today, 'day');

    const isDifferentMonth = (date) => moment(date).month() !== firstDayOfMonth.month();

    const isFutureMonth = firstDayOfMonth.isAfter(today, 'month'); // 현재 날짜보다 이후의 월인지 확인하는 변수

    const getPrevMonth = () => {
        const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfPrevMonth);
        setCurrMonth(firstDayOfPrevMonth.format("MMM-yyyy"));
    };

    const getCurrentMonth = () => {
        const firstDayOfCurrMonth = moment().startOf('month');
        setFirstDayOfMonth(firstDayOfCurrMonth);
        setCurrMonth(firstDayOfCurrMonth.format("MMM-yyyy"));
    };

    const getNextMonth = () => {
        const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfNextMonth);
        setCurrMonth(firstDayOfNextMonth.format("MMM-yyyy"));
    };

    moment.locale('ko');

    return (
        <>
        <div className="w-full bg-base-100 p-4 rounded-lg" style={{ height: "95%" }}>
            <div className="flex items-center justify-between">
                <div className="flex justify-normal gap-2 sm:gap-4">
                    <p className="font-semibold text-xl w-48">
                        {moment(firstDayOfMonth).format("YYYY년 M월")}
                    </p>
                    <button className="btn btn-square btn-sm btn-ghost" onClick={getPrevMonth}>
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <button className="btn btn-sm btn-ghost normal-case" onClick={getCurrentMonth}>
                        현재 월로 이동
                    </button>
                    <button className="btn btn-square btn-sm btn-ghost" onClick={getNextMonth}>
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
                <div>
                    <button className="btn btn-sm btn-ghost btn-outline normal-case" onClick={() => setIsSummaryOpen(true)} disabled={isFutureMonth}>
                        <ChartBarIcon className="w-5 h-5" />
                         월간 요약
                    </button>
                </div>
            </div>
            <div className="my-4 divider" />
            <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
                {weekdays.map((day, key) => (
                    <div className="text-xs capitalize" key={key}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7 mt-1 place-items-center">
                {allDaysInMonth().map((day, idx) => (
                    <div key={idx} className={`${colStartClasses[moment(day).day()]} border border-solid w-full h-28`} style={{ height: "6.5rem" }}>
                        <p className={`inline-block flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ${isToday(day) ? "bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white" : ""} ${isDifferentMonth(day) ? "text-slate-400 dark:text-slate-600" : ""} ${moment(day).day() === 0 ? "text-red-500" : ""} ${moment(day).day() === 6 ? "text-blue-500" : ""}`}>
                            {moment(day).format("D")}
                        </p>
                        {getEventsForCurrentDate(day)?.map((e, k) => (
                            <p key={k} className={`text-xs px-2 mt-1 truncate ${THEME_BG[e.type] || ""}`}>
                                {e.title} { e.type !== "PRICE" && <span> : <span className="font-extrabold">{e.count}</span>건</span>}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    {isSummaryOpen && <MonthSummaryModal isOpen={isSummaryOpen} setOpenModal={setIsSummaryOpen} currentMonth={currentMonth} previousMonth={previousMonth} currentDate={yearMonth} previousDate={lastYearMonth}/>}
        </>
    );
}

export default CalendarView;