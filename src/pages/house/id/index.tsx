import React, { useEffect } from 'react'
import {useLocation, useParams} from 'react-router-dom';

const HouseIdPage = () => {

    const {id} = useParams()
    const query = new URLSearchParams(useLocation().search)
    useEffect(() => {
        console.log(query)
    }, []);
    return (
        <div>Конкретный домик {id}</div>
    )
}
export default HouseIdPage


export interface HouseIdUrlParams {
    id: string
    check_in?: string
    check_out?: string
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
