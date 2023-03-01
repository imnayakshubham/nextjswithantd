import { PostsAPIEndPoint } from '@/constants'
import { Button, Card, Form, Input, List, Modal, Skeleton, Space } from 'antd'
import React, { useEffect, useState } from 'react'

export const Posts = () => {
    const [posts, setPosts] = useState({
        total: 0,
        allposts: [],
        limit: 25,
        data: [],
    })
    const [loading, setLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState({})
    const [searchTerm, setSearchTerm] = useState("")
    const [isEditModalVisible, setisEditModalVisible] = useState(false)


    const [editForm] = Form.useForm()

    const fetchPost = async () => {
        setLoading(true)
        const response = await fetch(PostsAPIEndPoint)
        const data = await response.json()
        setPosts((prev => {
            return {
                ...prev,
                total: data.length,
                allposts: data.slice(0, prev.limit),
                data: data,
            }
        }))
        setLoading(false)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const handleEdit = (post) => {
        setSelectedPost(post)
        editForm.setFieldsValue(post)
        setisEditModalVisible(true)
    }

    const handleDelete = (post) => {
        setPosts((prev) => {
            return {
                ...prev,
                allposts: prev.allposts.filter((currPost) => currPost.id !== post.id)
            }
        })
    }
    const handleSubmit = (values) => {
        setPosts((prev) => {
            const posts = [...prev.allposts]
            const findPost = posts.find((post) => post.id === selectedPost.id)
            findPost.title = values.title
            findPost.body = values.body

            return {
                ...prev,
                allposts: [...prev.allposts,
                    findPost,
                ]
            }
        })
        setisEditModalVisible(false)
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
                    <h1>Posts</h1>
                    <Space>
                        <Input placeholder='Search Post by Title' type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                    </Space>
                </Space>
            }>
                <List
                    className="demo-loadmore-list"
                    style={{ width: "60vw" }}
                    loading={loading}
                    itemLayout="horizontal"
                    pagination={{
                        onChange: (page) => {
                            setSearchTerm("")
                            setPosts((prev) => {
                                return {
                                    ...prev,
                                    allposts: prev.data.slice(((page - 1) * 25), page * 25)
                                }
                            })
                        },
                        pageSize: 25,
                        total: posts.total,
                        showSizeChanger: false
                    }}
                    dataSource={posts.allposts.filter((post) => post.title.includes(searchTerm))}
                    renderItem={(post) => (
                        <List.Item
                            actions={[<Button onClick={() => handleEdit(post)}>Edit</Button>, <Button onClick={() => handleDelete(post)}>Delete</Button>]}
                        >
                            <Skeleton avatar title={false} loading={loading}>
                                <List.Item.Meta
                                    title={post.title}
                                    description={post.body}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Card>
            <Modal
                title="Edit Post"
                open={isEditModalVisible}
                footer={null}
                onCancel={() => {
                    setisEditModalVisible(false)
                }}
                okText="Update Post"
            >
                <Form onFinish={handleSubmit} form={editForm} name="edit__form" layout='horizontal'>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="body"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Description!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button type="primary" htmlType="submit">
                            Update Post
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
