import React from 'react'
import Nav from '../../components/nav/nav'
import EditSecondary from '../../assets/component/edit_secondary'
import EditMinor from '../../assets/component/edit_minor'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import Arrow from '../../assets/component/arrow'
import Filter from '../../assets/component/filter'
import Warning from '../../assets/component/warning'
import { useGetExpMeta } from '../../api/api'
import ExpView from '../../containers/view';
import { ExperimentInfo } from '../../types/experiment';

type Props = {}

const Analysis = (props: Props) => {

    // const [data, setData] = React.useState({
    //     id: 0,
    //     date: "2024.10.10",
    //     title: "배터리 2차 시험",
    //     memo: "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하",
    // });


    const { id } = useParams();

    const { isError, isSuccess, isPending, data } = useGetExpMeta(id!);

    const navigate = useNavigate();

    return (
        <div className='w-full h-full flex flex-row'>
            <Nav index={id} />
            <div className="flex-1 flex flex-col items-start justify-start p-10 overflow-auto">
                <div className='w-full flex items-end justify-start pb-3 space-x-2'>
                    <div className="text-4xl font-bold">{data!.data.title || "제목 없음"}</div>
                    <EditSecondary />
                </div>
                <div className='w-full flex flex-row items-end justify-start pb-3 space-x-2'>
                    <div className="text-xl font-normal text-minor">실험일자 :{data!.data.date || "날짜 없음"}</div>
                    <EditMinor />
                </div>

                <div className='flex flex-row items-center space-x-2 w-full'>
                    <button onClick={() => navigate(`/view/${id}`)}>
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
                            <div>
                                시간 - 전류/전압
                            </div>
                            <div>
                                사이클 - 용량/쿨롱효율
                            </div>
                            <div>
                                전압 - dQ/dV
                            </div>
                            <div>
                                사용자 지정 그래프
                            </div>
                        </div>
                        <div className="border-1 border-minor w-full mt-4"></div>
                        <div className='w-full h-full'>
                            그래프 표시
                        </div>
                    </div>
                    <div className='flex flex-col w-1/3 pl-4 mt-4'>
                        <div className='flex flex-row w-full justify-between items-center'>
                            <div className='text-secondary text-2xl font-semibold'>데이터 목록</div>
                            <div className='flex flex-row space-x-2'>
                                <button onClick={() => alert("이상치 버튼입니다!")}>
                                    <Warning />
                                </button>
                                <button onClick={() => navigate(`/view/${id}/factor/select`)}>
                                    <Filter />
                                </button>
                            </div>

                        </div>
                        <div className="border-1 border-minor w-full mt-3"></div>
                        <div className='w-full h-full'>
                            파일 목록
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Analysis