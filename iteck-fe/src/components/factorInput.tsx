import React from 'react';

interface Factor {
    id: string;
    name: string;
    value: string;
}

interface FactorInputProps {
    factors: Factor[];
    onFactorChange: (updatedFactors: Factor[]) => void;
}

const FactorInput: React.FC<FactorInputProps> = ({ factors, onFactorChange }) => {
    const handleFactorChange = (index: number, value: string) => {
        const updatedFactors = [...factors];
        updatedFactors[index] = { ...updatedFactors[index], value };
        onFactorChange(updatedFactors);
    };

    return (
        <div className=" w-full grid grid-cols-2 gap-4 overflow-auto">
            {factors.map((factor, index) => (
                <div key={factor.id} className="flex flex-col">
                    <label htmlFor={factor.id} className="text-xl text-minor py-2">
                        {factor.name}
                    </label>
                    <input
                        type="text"
                        id={factor.id}
                        value={factor.value}
                        onChange={(e) => handleFactorChange(index, e.target.value)}
                        placeholder={`${factor.name}을(를) 입력해주세요`}
                        className="px-4 py-2 text-primary rounded-lg border border-gray-300"
                    />
                </div>
            ))}
        </div>
    );
};

export default FactorInput;
