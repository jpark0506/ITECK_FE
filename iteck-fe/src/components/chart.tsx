import React, { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type CycleData = {
    cycleIndex: number;
    chgCap: number;
    dchgCap: number;
    chgOutlying: boolean;
    dchgOutlying: boolean;
};

type CycleDataChartProps = {
    cycleDatas: CycleData[];
};

const CycleDataChart: React.FC<CycleDataChartProps> = ({ cycleDatas }) => {
    const formattedData = cycleDatas.map((data) => ({
        cycleIndex: Number(data.cycleIndex),
        chgCap: Number(data.chgCap),
        dchgCap: Number(data.dchgCap),
        chgOutlying: data.chgOutlying,
        dchgOutlying: data.dchgOutlying,
    }));

    useEffect(() => {
        console.log("Formatted data for chart:", formattedData);
    }, [formattedData]);

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cycleIndex" label={{ value: "Cycle Index", position: "insideBottomRight", offset: 0 }} />
                <YAxis label={{ value: "Capacity", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="chgCap" stroke="#8884d8" name="Charge Capacity" />
                <Line type="monotone" dataKey="dchgCap" stroke="#82ca9d" name="Discharge Capacity" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CycleDataChart;
