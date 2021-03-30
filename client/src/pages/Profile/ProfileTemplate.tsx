import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { RootState } from 'redux/authToolkitRedux/StoreSlices'
import './Profile.scss'

export const ProfileTemplate = () => {
    const { authorization: { user } } = useSelector((state: RootState) => state)
    console.log('ProfileTemplate user', user);

    const serializeMemeUrl = (url: string) => {
        return 'http://localhost:4000/' + url.slice(7)
    }

    const ROOT_CLASS = 'profile'
    const { userMemes, email } = user
    return (
        <div className={ROOT_CLASS}>
            <div className={`${ROOT_CLASS}__header`}>
                <div className={`${ROOT_CLASS}__avatar`}>
                    <Avatar size={100} icon={<UserOutlined />} />
                </div>
                <div className={`${ROOT_CLASS}__info`}>
                    <div>{email}</div>
                    <div>{userMemes.length} Публикаций</div>
                </div>
            </div>
            {/* TODO: сделать динамическое изменение размера картинок в гриде в зависимости от количества */}
            <div className={`${ROOT_CLASS}__memes-grid`}>
                {userMemes.map((userMeme: any) => (
                    <div className={`${ROOT_CLASS}__meme-img`}>
                        <img src={serializeMemeUrl(userMeme.imgUrl)} alt={userMeme.description}/>
                    </div>
                ))}
            </div>
        </div>
    )
}