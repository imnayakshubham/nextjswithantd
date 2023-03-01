import { Card } from 'antd'
import React from 'react'

const UserInfo = ({ user, isloading }) => {
    const { id, name, username, email, phone, website, address, company } = user;

    return (
        <div style={{
            display: "flex",
            padding: "1rem",
            justifyContent: "center",
            width: "100vw"
        }}>
            <Card title={username} style={{ width: 400 }} loading={isloading}>
                <p>Name: {name}</p>
                <p>Username: {username}</p>
                <p>Email: {email}</p>
                <p>Phone: {phone}</p>
                <p>Website: {website}</p>
                <p>Address: {address?.street}, {address?.suite}, {address?.city} {address?.zipcode}</p>
                <p>Company: {company?.name}</p>
            </Card>
        </div>
    )
}

export default UserInfo