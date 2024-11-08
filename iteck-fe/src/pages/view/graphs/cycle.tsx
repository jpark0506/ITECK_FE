import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CycleData {
    cycleIndex: number | null;
    dchgCap: number | null;
    dchgRatio: number;
}

interface CycleDataChartProps {
    cycleData: CycleData[];
}

const CycleGraph: React.FC<CycleDataChartProps> = ({ cycleData }) => {
    // Transform and filter the cycle data to remove entries with null values
    const formattedData = cycleData
        .filter(item => item.cycleIndex !== null && item.dchgCap !== null) // Filter out null values
        .map(item => ({
            cycleIndex: item.cycleIndex!,
            dchgCap: item.dchgCap!,
            dchgRatio: item.dchgRatio,
        }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cycleIndex" label={{ value: 'Cycle Index', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="dchgCap" stroke="#8884d8" name="Discharge Capacity (dchgCap)" />
                <Line type="monotone" dataKey="dchgRatio" stroke="#82ca9d" name="Discharge Ratio (dchgRatio)" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CycleGraph;
