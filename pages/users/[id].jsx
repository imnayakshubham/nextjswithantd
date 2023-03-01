import UserInfo from '@/components/UserInfo';
import { userApiEndPoint } from '@/constants';
import { Button, Col, Result, Row } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'


const UserDetail = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({})
    const userDetail = router.query;

    const fetchUserInfo = async () => {
        setLoading(true)
        const response = await fetch(`${userApiEndPoint}/${userDetail.id}`)
        const data = await response.json()
        setUserData(data)
        setLoading(false)
        if (!Object.keys(data || {}).length) {
            router.push("/404")
        }
    }

    useEffect(() => {
        if (userDetail.id) {
            fetchUserInfo()
        }
    }, [userDetail.id])



    return (
        <>
            <UserInfo user={userData} isloading={loading} />
        </>

    )
}

export default UserDetail