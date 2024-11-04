import React from 'react'
import Nav from '../components/nav/nav'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import EditSecondary from '../assets/component/edit_secondary';
import EditMinor from '../assets/component/edit_minor';

type Props = {
}

const ExpView = (props: Props) => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = React.useState({
        id: 0,
        date: "2024.10.10",
        title: "배터리 2차 시험",
        memo: "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하",
    });

    return (
        <div className="w-full h-full flex flex-row">
            <Nav index={Number(id)} />
            <div className="flex-1 flex flex-col items-start justify-start p-10 overflow-auto">
                <div className='w-full flex items-end justify-start pb-3 space-x-2'>
                    <div className="text-4xl font-bold">{data.title}</div>
                    <EditSecondary />
                </div>
                <div className='w-full flex flex-row items-end justify-start pb-3 space-x-2'>
                    <div className="text-xl font-semib text-minor">실험일자 :{data.date} </div>
                    <EditMinor />
                </div>
                <div className="border-1 border-minor w-full"></div>
                <div className="flex flex-col w-full justify-start items-start">
                    <div className='w-full flex flex-row items-end justify-start pb-3 pt-3 space-x-2'>
                        <div className="text-xl font-semibold text-secondary">실험 메모</div>
                        <EditSecondary />
                    </div>
                    {/* 여러줄인거 고려하기 */}
                    <div className='w-full flex flex-col'>
                        <div className="text-lg font-normal text-minor">{data.memo}</div>
                    </div>
                </div>
                <div className="text-3xl font-semibold text-primary pt-5 pb-5">조회할 항목을 선택해주세요</div>
                <div className="flex-1 flex flex-row w-full justify-center items-start px-10 space-x-20">
                    <div className="flex flex-col flex-1 h-full rounded-2xl border-1 text-primary border-primary justify-start items-center p-10 group-hover:bg-primary group-hover:text-white transition-colors">
                        <div className="w-full text-left font-bold text-3xl">
                            그래프 분석 / 이상치 감지
                        </div>
                        <p className="w-full flex-1 text-left text-minor font-normal text-lg pt-4 ">
                            아래와 같은 정리된 그래프를 볼 수 있어요!
                            <ul className="list-disc w-full pl-5">
                                <li>시간 - 전류/전압</li>
                                <li>사이클 - 용량/쿨롱효율</li>
                                <li>전압 - dQ/dV</li>
                                <li>사용자 지정 그래프</li>
                            </ul>
                            <br />
                        </p>
                        <button
                            onClick={() => navigate(`/view/${id}/factor/select`)}
                            className="bg-primary font-bold px-10 py-4 text-white border-white border-1 text-sm rounded-lg mt-4 hover:bg-white hover:text-primary hover:border-primary transition-all "
                        >
                            시작하기
                        </button>
                    </div>
                    <div className="flex flex-col flex-1 h-full rounded-2xl border-1 text-primary border-primary justify-start items-center p-10 group-hover:bg-primary group-hover:text-white transition-colors">
                        <div className="w-full text-left font-bold text-3xl">시뮬레이션</div>
                        <p className="w-full h-full flex-1 text-left text-minor font-normal text-lg pt-4 ">
                            실험하고자 하는 조건으로 시뮬레이션을 이용해 결과 데이터를 예측 해보세요!
                        </p>
                        <button
                            onClick={() => {
                                alert('미완성된 기능입니다.')
                                //navigate(`/view/${id}/simulation`)
                            }}
                            className="bg-primary font-bold px-10 py-4 text-white border-white border-1 text-sm rounded-lg mt-4 hover:bg-white hover:text-primary hover:border-primary transition-all "
                        >
                            시작하기
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ExpView