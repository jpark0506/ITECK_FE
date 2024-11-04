import React from 'react'

import Nav from '../../components/nav/nav'
import EditSecondary from '../../assets/component/edit_secondary'
import EditMinor from '../../assets/component/edit_minor'
import { useParams } from 'react-router-dom'
type Props = {}

const Simulation = (props: Props) => {

    const [data, setData] = React.useState({
        id: 0,
        date: "2024.10.10",
        title: "배터리 2차 시험",
        memo: "가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하",
    });

    const { id } = useParams();
    return (
        <div className='w-full h-full flex flex-row'>
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
            </div>
        </div>
    )
}

export default Simulation