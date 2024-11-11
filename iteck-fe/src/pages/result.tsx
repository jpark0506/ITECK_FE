import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

type Props = {}



interface SimulationResultProps {
    imgData: string | null;
}

const SimulationResult: React.FC<SimulationResultProps> = ({ imgData }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <div className="w-full h-full">
            {imgData ? (
                <div className='w-full h-full'>
                    <div className="flex flex-row justify-between text-4xl font-bold mb-4">
                        시뮬레이션 결과
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-primary px-10 py-4 text-white text-sm rounded-lg font-light"
                        >
                            뒤로가기
                        </button>
                    </div>
                    <img src={`data:image/png;base64,${imgData}`} alt="Simulation Result" className="w-full border rounded-lg shadow-md overflow-auto" />
                </div>
            ) : (
                <p>No simulation result available. Please run the simulation.</p>
            )
            }
        </div >
    );
};

export default SimulationResult;