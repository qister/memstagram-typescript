import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serialize } from 'object-to-formdata'

import { Form, Upload, Row, Col, Input, Button, Typography } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import { upload } from 'redux/authToolkitRedux/StoreSlices/app'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'

const { Title } = Typography
const { Dragger } = Upload

export const AddMeme = () => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any>([])
  const [isValid, setIsValid] = useState(false)

  const {
    authorization: { email },
  } = useSelector((state: RootState) => state)

  const dispatch = useDispatch()

  const onChangeForm = () => {
    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }

  const onSubmit = () => {
    const data = form.getFieldsValue()
    const {
      description,
      dragger: { fileList },
    } = data
    const preparedData = serialize({
      description,
      file: fileList[0].originFileObj,
      // TODO: передавать айди пользователя или не передавать ничего и распознавать пользователя из хедеров авторизации
      author: email,
    })

    dispatch(upload(preparedData))
  }

  //TODO добавить теги с категориями
  //TODO добавить сообщение об успешной и неуспешной загрузке

  return (
    <Form layout='vertical' form={form}>
      <Title>Загрузить мем</Title>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='description'
            label='Подпись'
            rules={[{ required: true, message: 'Краткое описание, пож' }]}
          >
            <Input type='text' placeholder='Тест2' onChange={onChangeForm} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name='dragger'
            label='Загрузить'
            //TODO добавить валидацию на размер файла
            rules={[
              {
                validator: () =>
                  fileList.length
                    ? Promise.resolve()
                    : Promise.reject('Добавьте мем'),
              },
            ]}
          >
            <Dragger
              name='files'
              beforeUpload={(file) => {
                setFileList([file])
                return false
              }}
              accept='image/jpeg, image/png'
              fileList={fileList}
              onRemove={() => {
                setFileList([])
              }}
              onChange={onChangeForm}
            >
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Выберите мем или перетяните его сюда
              </p>
              <p className='ant-upload-hint'>
                За раз загрузить можно только один
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              disabled={!isValid}
              onClick={onSubmit}
            >
              Загрузить
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}
