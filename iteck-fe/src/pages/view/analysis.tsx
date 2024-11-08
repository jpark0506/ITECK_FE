import React, { useEffect, useState } from 'react';
import Nav from '../../components/nav/nav';
import EditSecondary from '../../assets/component/edit_secondary';
import EditMinor from '../../assets/component/edit_minor';
import { useNavigate, useParams } from 'react-router-dom';
import Arrow from '../../assets/component/arrow';
import Filter from '../../assets/component/filter';
import Warning from '../../assets/component/warning';
import { useFactorStore } from '../../store/condition';
import VoltageGraph from './graphs/voltage';
import TimeGraph from './graphs/time';
import CycleGraph from './graphs/cycle';
import { useGetExpMeta, useGetExpResult } from '../../api/api';

type Props = {};

const LoadingSpinner: React.FC = () => {
    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p>데이터를 불러오는 중입니다...</p>
        </div>
    );
};

const GraphPage: React.FC<{
    page: number,
    data: any,
    dataKey?: "current" | "voltage" | "dchgToChg" | "chgToDchg",
    isFetching: boolean,
    isSuccess: boolean,
    method: "time" | "cycle" | "voltage",
}> = ({ page, data, dataKey = "current", isFetching, isSuccess, method }) => {

    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (tabOptions[page].method !== method) {
        return <LoadingSpinner />;
    }

    if (isSuccess && !data) {
        return <p>데이터가 없습니다.</p>
    }

    switch (page) {
        case 0:
            const timeKey = data?.timeDatas && Object.keys(data.timeDatas);
            const timeData = data?.timeDatas[timeKey];

            return timeData ? <TimeGraph timeData={timeData} dataKey={dataKey as "current" | "voltage"} /> : <p>Time data is unavailable.</p>;

        case 1:
            const cycleKey = data?.cycleDatas && Object.keys(data.cycleDatas);
            const cycleData = data?.cycleDatas[cycleKey];
            return cycleData ? <CycleGraph cycleData={cycleData} /> : <p>Cycle data is unavailable.</p>;

        case 2:
            const voltageKey = data?.voltageDatas && Object.keys(data.voltageDatas);
            const voltageData = data?.voltageDatas[voltageKey];
            return voltageData ? <VoltageGraph voltageData={voltageData} /> : <p>Voltage data is unavailable.</p>;

        default:
            return <LoadingSpinner />;
    }
};

const TabButton: React.FC<{ index: number, currentIndex: number, setCurrentIndex: (index: number) => void, children: React.ReactNode }> = ({ index, currentIndex, setCurrentIndex, children }) => (
    <button className={`px-4 ${index === currentIndex ? "text-secondary" : "text-minor"}`} onClick={() => setCurrentIndex(index)}>
        {children}
    </button>
);

const tabOptions: { label: string, method: "time" | "cycle" | "voltage" }[] = [
    { label: "시간 - 전류/전압", method: "time" },
    { label: "사이클 - 용량/쿨롱효율", method: "cycle" },
    { label: "전압 - dQ/dV", method: "voltage" }
];

const Analysis = (props: Props) => {
    const { id: experimentId } = useParams<{ id: string }>();
    const [page, setPage] = useState<number>(0);
    const { data } = useGetExpMeta(experimentId!);
    const [fileIndex, setFileIndex] = useState<number>(0);
    const [method, setMethod] = useState<"time" | "cycle" | "voltage">(tabOptions[0].method);

    const { experiments, setKindFactors, setAmountFactors, setVariableFactor } = useFactorStore();
    const factors = experiments[experimentId!] || {
        kindFactors: [],
        amountFactors: [],
        variableFactor: null
    };

    const { data: graphData, isError, isFetching, refetch, isSuccess } = useGetExpResult({
        kindFactors: factors.kindFactors,
        amountFactors: factors.amountFactors,
        variableFactor: factors.variableFactor,
        method,
        yFactor: "current"
    });

    useEffect(() => {
        setMethod(tabOptions[page].method);
    }, [page]);

    useEffect(() => {
        refetch();
    }, [method, experimentId]);

    const navigate = useNavigate();

    return (
        <div className='w-full h-full flex flex-row'>
            <Nav index={experimentId} />
            <div className="flex-1 flex flex-col items-start justify-start p-10 overflow-auto">
                <div className='w-full flex items-end justify-start pb-3 space-x-2'>
                    <div className="text-4xl font-bold">{data.title}</div>
                    <EditSecondary />
                </div>
                <div className='w-full flex flex-row items-end justify-start pb-3 space-x-2'>
                    <div className="text-xl font-normal text-minor">실험일자 :{data.expDate ? new Date(data.expDate).toISOString().split("T")[0] : ""} </div>
                    <EditMinor />
                </div>
                <div className='flex flex-row items-center space-x-2 w-full'>
                    <button onClick={() => navigate(`/view/${experimentId}`)}>
                        <Arrow />
                    </button>
                    <div className='text-3xl text-secondary font-semibold'>
                        그래프 분석
                    </div>
                </div>
                <div className="border-1 border-minor w-full mt-5"></div>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-col flex-1 w-3/4'>
                        <div className='flex flex-row space-x-6 text-minor text-xl mt-4 w-full'>
                            {tabOptions.map((tab, index) => (
                                <TabButton key={index} index={index} currentIndex={page} setCurrentIndex={setPage}>
                                    {tab.label}
                                </TabButton>
                            ))}
                        </div>
                        <div className="border-1 border-minor w-full mt-4"></div>
                        <div className='w-full h-full mt-8'>
                            <GraphPage
                                page={page}
                                method={method}
                                data={graphData.length !== 0 ? graphData[fileIndex] : null}
                                isFetching={isFetching}
                                isSuccess={isSuccess}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 pl-4 mt-4'>
                        <div className='flex flex-row w-full justify-between items-center'>
                            <div className='text-secondary text-2xl font-semibold'>데이터 목록</div>
                            <div className='flex flex-row space-x-2'>
                                <button onClick={() => alert("이상치 버튼입니다!")}>
                                    <Warning />
                                </button>
                                <button onClick={() => navigate(`/view/${experimentId}/factor/select`)}>
                                    <Filter />
                                </button>
                            </div>
                        </div>
                        <div className="border-1 border-minor w-full mt-3"></div>
                        <div className='w-full h-full px-4'>
                            {
                                isFetching ?
                                    <LoadingSpinner /> :
                                    isError ? <p>데이터 로드에 실패했습니다.</p> :
                                        graphData.map((data: any, index: number) => (
                                            <div
                                                key={index}
                                                className={`flex flex-row items-center justify-between py-2 ${fileIndex === index ? "bg-gray-100" : ""}`}
                                                onClick={() => setFileIndex(index)}
                                            >
                                                <div className="text-minor text-lg">{data.meta.experimentId}</div>
                                                <div className="text-minor text-lg">파일 {index + 1}</div>
                                            </div>
                                        ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analysis;
