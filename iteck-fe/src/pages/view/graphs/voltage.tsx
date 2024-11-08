import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the type for each data point
interface VoltageDataPoint {
    voltage?: string;  // Voltage as a string, will parse it to a number in the chart
    dqmdV?: string;    // dqmdV as a string, parsed to a number as well
}

// Define the props for the VoltageGraph component
interface VoltageGraphProps {
    voltageData: VoltageDataPoint[];  // Array of voltage data points
}

const VoltageGraph: React.FC<VoltageGraphProps> = ({ voltageData }) => {
    // Parse the voltage and dqmdV values into numbers
    const formattedData = voltageData.map(dataPoint => ({
        voltage: parseFloat(dataPoint.voltage!),
        dqmdV: parseFloat(dataPoint.dqmdV!),
    }));

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="voltage" label={{ value: 'Voltage', position: 'insideBottomRight', offset: 0 }} />
                <YAxis label={{ value: 'dqmdV', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="dqmdV" stroke="#82ca9d" name="dqmdV Value" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default VoltageGraph;
