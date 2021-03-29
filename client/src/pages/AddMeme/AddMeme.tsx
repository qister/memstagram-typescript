import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { serialize } from 'object-to-formdata'

import { Form, Upload, Row, Col, Input, Button, Typography } from 'antd'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'

import { upload } from 'redux/authToolkitRedux/StoreSlices/app'
import { RcFile } from 'antd/lib/upload'

const { Title } = Typography
const { Dragger } = Upload

const validateIsFileSelected = (fileList: any[]) => (form: any) => ({
  validator: () =>
    fileList.length ? Promise.resolve() : Promise.reject('Добавьте мем'),
})

export const AddMeme = () => {
  const [form] = Form.useForm()
  const [isValid, setIsValid] = useState(false)
  const [fileList, setFileList] = useState<any>([{ fileList: [] }])
  const dispatch = useDispatch()

  const onChangeForm = () => {
    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }

  const onRemove = (fieldKey: number) => () => {
    setFileList((prev: any[]) => {
      return prev.map((item: any, index: number) =>
        index === fieldKey ? { fileList: [] } : item,
      )
    })
    return false
  }

  const addFieldToFileList = () => {
    setFileList((prev: any) => [...prev, { fileList: [] }])
  }

  const beforeUpload = (fieldKey: number) => (
    file: RcFile,
    FileList: RcFile[],
  ) => {
    setFileList((prev: any[]) => {
      return prev.map((item: any, index: number) =>
        index === fieldKey ? { fileList: [file] } : item,
      )
    })

    return false
  }

  const onSubmit = () => {
    const data = form.getFieldsValue()
    const { memelist } = data

    const dataToSerialize = {
      memelist: memelist.map((meme: any, index: number) => {
        return {
          description: meme.description,
          file: fileList[index].fileList[0],
        }
      }),
    }

    const serializedData = serialize(dataToSerialize)

    dispatch(upload(serializedData))
  }

  //TODO добавить теги с категориями
  //TODO добавить сообщение об успешной и неуспешной загрузке

  return (
    <Form
      layout='vertical'
      form={form}
      initialValues={{
        memelist: [{ description: '', dragger: { file: null, fileList: [] } }],
      }}
    >
      <Title>Загрузить мем</Title>
      <Form.List name='memelist'>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, key) => (
              <Row gutter={16} key={key}>
                <Col span={24}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    label='Подпись'
                    rules={[
                      { required: true, message: 'Краткое описание, пож' },
                    ]}
                  >
                    <Input
                      type='text'
                      placeholder='Тест2'
                      onChange={onChangeForm}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'dragger']}
                    fieldKey={[field.fieldKey, 'dragger']}
                    label='Загрузить'
                    //TODO добавить валидацию на размер файла
                    rules={[
                      validateIsFileSelected(fileList[field.fieldKey].fileList),
                    ]}
                  >
                    <Dragger
                      name='files'
                      beforeUpload={beforeUpload(field.fieldKey)}
                      accept='image/jpeg, image/png'
                      fileList={fileList[field.fieldKey]?.fileList ?? []}
                      onRemove={onRemove(field.fieldKey)}
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
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => {
                  addFieldToFileList()
                  add()
                }}
                block
                icon={<PlusOutlined />}
              >
                Добавить еще
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
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
    </Form>
  )
}
