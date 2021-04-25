import React from 'react'
import { Upload, Form } from 'antd';
import ImgCrop from 'antd-img-crop';
import classNames from 'classnames'

import 'antd/dist/antd.css';

import { IStep } from '../Registration'

export const Step3 = ({
    hidden,
    form,
    theme,
    fileList,
    toggleFile,
}: IStep) => {
    const {
        email,
        nickname,
        phone
    } = form.getFieldsValue()
    
      const onChange = ({ fileList: newFileList }: any) => {
        toggleFile(newFileList);
      };
    
    const onPreview = async (file: any) => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const ROOT_CLASS = 'step'
    const stepClassName = classNames(ROOT_CLASS, {
        [`${ROOT_CLASS}_theme-${theme}`]: !!theme,
    })

    console.log('step 3 fileList', fileList);
    
    return (
        <div className={stepClassName}>
            {!hidden &&
                <div className={`${ROOT_CLASS}__filled-fields`}>
                    <div className={`${ROOT_CLASS}__field`}>Email: {email}</div>
                    <div className={`${ROOT_CLASS}__field`}>Nickname: {nickname}</div>
                    <div className={`${ROOT_CLASS}__field`}>Phone number: {phone}</div>
                </div>
            }
            <Form.Item
                hidden={hidden}
                name="upload"
            >
                <ImgCrop rotate>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {!fileList.length && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </Form.Item>
        </div>
    )
}