import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HorizontalBarChart = ({ currentDate, previousDate, currentMonthCount, previousMonthCount }) => {

    const currentDataKey = `${currentDate.year}년 ${currentDate.month}월`;
    const previousDataKey = `${previousDate.year}년 ${previousDate.month}월`;

    const data = [
        {
            name: "주문건수",
            [currentDataKey]: currentMonthCount,
            [previousDataKey]: previousMonthCount,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
                width={300}
                height={200}
                data={data}
                layout="vertical"
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
                barSize={30}
                barGap={20}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey={currentDataKey} fill="#8884d8" />
                <Bar dataKey={previousDataKey} fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default HorizontalBarChart;