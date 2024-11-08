import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the type for each data point
interface TimeDataPoint {
    totalTime: string;  // Time in HH:MM:SS format
    current?: string;   // Optional current value
    voltage?: string;   // Optional voltage value
}

// Define the props for the TimeGraph component
interface TimeGraphProps {
    timeData: TimeDataPoint[];  // Array of time data points
    dataKey: 'current' | 'voltage';  // Determines which data key to use for Y-axis
}

const TimeGraph: React.FC<TimeGraphProps> = ({ timeData, dataKey }) => {
    // Parse the selected dataKey values into numbers

    console.log(timeData, dataKey)
    const formattedData = timeData.map(dataPoint => ({
        totalTime: dataPoint.totalTime,
        [dataKey]: parseFloat(dataPoint[dataKey] || "0"),  // Default to 0 if key is missing
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="totalTime" label={{ value: 'Total Time', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: dataKey === 'current' ? 'Current' : 'Voltage', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" name={dataKey === 'current' ? 'Current Value' : 'Voltage Value'} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TimeGraph;
