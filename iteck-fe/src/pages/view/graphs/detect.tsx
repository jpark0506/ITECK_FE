import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from "recharts";

interface CycleData {
    cycleIndex: string;
    chgCap: number;
    dchgCap: number;
    chgOutlying: boolean;
    dchgOutlying: boolean;
}

interface CycleGraphProps {
    data: CycleData[];
}

const DetectGraph: React.FC<CycleGraphProps> = ({ data }) => {

    const formattedData = data.map((item) => ({
        ...item,
        cycleIndex: Number(item.cycleIndex), // cycleIndex를 숫자로 변환
        chgCap: Number(item.chgCap),
        dchgCap: Number(item.dchgCap),
    }));

    const CustomDot = ({ cx, cy, payload }: any) => {
        if (payload.chgOutlying || payload.dchgOutlying) {
            return (
                <Dot cx={cx} cy={cy} r={5} fill="red" stroke="red" />
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cycleIndex" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                    type="monotone"
                    dataKey="chgCap"
                    stroke="#8884d8"
                    dot={<CustomDot />}
                    name="Charge Capacity"
                />

                <Line
                    type="monotone"
                    dataKey="dchgCap"
                    stroke="#82ca9d"
                    dot={<CustomDot />}
                    name="Discharge Capacity"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DetectGraph;
