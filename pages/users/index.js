import { userApiEndPoint } from '@/constants'
import { Button, Card, Input, List, Skeleton, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


const Users = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")


    const fetchUsers = async () => {
        setLoading(true)
        const response = await fetch(userApiEndPoint)
        const data = await response.json()
        setUsers(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleViewDetails = (userInfo) => {
        router.push(`users/${userInfo.id}`);
    }

    const handleViewPosts = (userInfo) => {
        router.push(`users/${userInfo.id}/posts`);

    }

    return (
        <div style={{
            display: "flex",
            padding: "1rem",
            justifyContent: "center",
            width: "100vw"
        }}>
            <Card title={
                <Space style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1>Users</h1>
                    <Space>
                        <Input placeholder='Search User' type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                    </Space>
                </Space>
            }>
                <List
                    style={{ width: "60vw" }}
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={users.filter((userInfo) => userInfo.username.toLowerCase().includes(searchTerm.toLowerCase()) || userInfo.name.toLowerCase().includes(searchTerm.toLowerCase()))}
                    renderItem={(userInfo) => (
                        <List.Item
                            key={userInfo.id}
                            actions={[<Button onClick={() => handleViewPosts(userInfo)}>View Posts</Button>, <Button onClick={() => handleViewDetails(userInfo)}>View Details</Button>]}
                        >
                            <Skeleton avatar title={false} loading={loading}>
                                <List.Item.Meta
                                    title={userInfo.name}
                                    description={userInfo.email}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}

export default Users