import { PostsAPIEndPoint } from '@/constants'
import { Button, Card, List, Skeleton, Space } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const id = router.query.id

    const fetchPost = async () => {
        setLoading(true)
        const response = await fetch(PostsAPIEndPoint)
        const data = await response.json()
        setPosts(data.filter((post) => post.userId === Number(id)))
        setLoading(false)
    }

    useEffect(() => {
        if (!id) {
            router.push("/users")
        }
    }, [id, router])

    useEffect(() => {
        fetchPost()
    }, [id])
    return (
        <div style={{
            display: "flex",
            padding: "1rem",
            justifyContent: "center",
            width: "100vw"
        }}>
            <Card title={
                <Space style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h1>Posts</h1>
                </Space>
            }>
                <List
                    style={{ width: "60vw" }}
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={posts}
                    renderItem={(post) => (
                        <List.Item
                            key={post.id}
                            actions={[<Button onClick={() => handleEdit(post)}>Edit</Button>, <Button onClick={() => handleDelete(post)}>Delete</Button>]}
                        >
                            <Skeleton avatar title={false} loading={loading}>
                                <List.Item.Meta
                                    title={post.title}
                                    description={<Space>
                                        <Space><p>{post.body}</p></Space>
                                    </Space>}

                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}

export default Posts