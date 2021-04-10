import React, { useState } from 'react'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import './Steps.scss';

import { IStep } from '../Registration'

export const Step3 = ({}: IStep) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    function getBase64(img: any, callback: any) {
        console.log('getBase64 img', img);
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    
    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        // TODO добавить свою проверку на размер
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isLt2M) {
        //   message.error('Image must smaller than 2MB!');
        // }
        return isJpgOrPng;
    }
    
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = (info: any) => {
        console.log('info', info);
        
        if (info.file.status === 'uploading') {
            setLoading(true)
          return;
        }

        if (info.file.status === 'error') {
            setLoading(false)
          return;
        }

        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (imgUrl: React.SetStateAction<string>) => {
                setLoading(false)
                setImageUrl(imgUrl)
            }
          );
        }
    };

    console.log('load imageUrl', imageUrl);
    
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={imageUrl}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? 
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : 
                uploadButton}
      </Upload>
    )
}