import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../components/nav/nav';
import FactorInput from '../components/factorInput';
import SimulationResult from './result';
import { useNavigate } from 'react-router-dom';

interface Factor {
    name: string;
    value: string;
    id: string;
}

type Props = {}

const LoadingSpinner: React.FC = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p>시뮬레이션을 실행중입니다...</p>
        </div>
    );
};

const SimulationForm: React.FC<Props> = () => {
    const [factors, setFactors] = useState<Factor[]>([
        { id: 'ambient_temp', name: '주변 온도 (K)', value: '298.15' },
        { id: 'faraday_constant', name: '패러데이 상수 (C.mol⁻¹)', value: '96485' },
        { id: 'current_function', name: '전류 함수 (A)', value: '1.0' },
        { id: 'voltage_min', name: '최소 전압 (V)', value: '2.5' },
        { id: 'voltage_max', name: '최대 전압 (V)', value: '4.2' },
        { id: 'cell_capacity', name: '셀 용량 (A.h)', value: '5.0' },
        { id: 'reference_temp', name: '기준 온도 (K)', value: '298.15' },
        { id: 'neg_electrode_thickness', name: '음극 두께 (m)', value: '1.0e-5' },
        { id: 'pos_electrode_thickness', name: '양극 두께 (m)', value: '1.0e-5' },
        { id: 'neg_electrode_conductivity', name: '음극 전도도 (S.m⁻¹)', value: '215' },
        { id: 'pos_electrode_conductivity', name: '양극 전도도 (S.m⁻¹)', value: '0.2' },
        { id: 'neg_electrode_density', name: '음극 밀도 (kg.m⁻³)', value: '1700' },
        { id: 'pos_electrode_density', name: '양극 밀도 (kg.m⁻³)', value: '3250' },
        { id: 'neg_electrode_volume_fraction', name: '음극 활성 물질 체적 비율', value: '0.75' },
        { id: 'pos_electrode_volume_fraction', name: '양극 활성 물질 체적 비율', value: '0.65' },
        { id: 'max_concentration_neg', name: '음극 최대 농도 (mol.m⁻³)', value: '32000' },
        { id: 'max_concentration_pos', name: '양극 최대 농도 (mol.m⁻³)', value: '62000' }
    ]);

    const navigate = useNavigate();

    const [imgData, setImgData] = useState<string | null>(null); // Holds the image data
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFactorChange = (updatedFactors: Factor[]) => {
        setFactors(updatedFactors);
    };

    const handleSubmit = async () => {
        const params = factors.reduce((acc, factor) => {
            acc[factor.id] = factor.value;
            return acc;
        }, {} as Record<string, string>);

        try {
            setLoading(true);
            const response = await axios.post('http://iteck.duckdns.org/flask/simulate', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
            console.log(response)
            setImgData(response.data.imgData);
            setSubmitted(true);
        } catch (error) {
            console.error("Error running simulation:", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!submitted && !imgData && loading && <LoadingSpinner />}
            <div className="flex flex-row w-full h-full">
                <Nav />

                <div className="flex-1 flex flex-col items-start justify-start p-10 overflow-auto">
                    {!submitted ? (
                        <>
                            <div className="w-full flex items-end justify-start pb-3 space-x-2">
                                <div className="text-4xl font-bold">시뮬레이션 인자 입력</div>
                            </div>
                            <div className="w-full flex flex-row items-end justify-start pb-3 space-x-2">
                                <div className="text-xl font-semibold text-minor">인자를 입력해 시뮬레이션을 해보세요!</div>
                            </div>
                            <div className="border-1 border-minor w-full"></div>

                            <FactorInput factors={factors} onFactorChange={handleFactorChange} />

                            <div className='w-full flex flex-row justify-between'>
                                <button
                                    onClick={() => navigate(-1)}
                                    className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
                                >
                                    뒤로가기
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light mt-2"
                                >
                                    시뮬레이션 실행
                                </button>
                            </div>

                        </>
                    ) : (
                        <SimulationResult imgData={imgData} />
                    )}
                </div>
            </div>
        </>
    );
}

export default SimulationForm;
