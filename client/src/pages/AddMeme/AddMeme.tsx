import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serialize } from 'object-to-formdata'

import { Form, Upload, Row, Col, Input, Button, Typography, Select } from 'antd'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'

import { RcFile } from 'antd/lib/upload'
import { fetchUploadMemes, resetUploadState } from './uploadSlice'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'
import { IFetchingStatus } from 'constants/enums'
import { UploadSuccessfull } from './UploadSuccessfull'

const { Title } = Typography
const { Dragger } = Upload
const { Option } = Select

const validateIsFileSelected = (fileList: any[]) => (form: any) => ({
  validator: () => (fileList.length ? Promise.resolve() : Promise.reject('Добавьте мем')),
})

const categories = [
  { label: 'Политика', value: 'politics' },
  { label: 'Музыка', value: 'music' },
  { label: 'Школа', value: 'school' },
  { label: 'Сюр', value: 'surrealistic' },
]

export const AddMeme = () => {
  const [form] = Form.useForm()
  const [isValid, setIsValid] = useState(false)
  const [fileList, setFileList] = useState<any>([{ fileList: [] }])
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetUploadState())
    }
  }, [])

  const { fetchingStatus } = useSelector((state: RootState) => state.upload)

  const onChangeForm = () => {
    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
  }

  const onRemove = (fieldKey: number) => () => {
    setFileList((prev: any[]) => {
      return prev.map((item: any, index: number) => (index === fieldKey ? { fileList: [] } : item))
    })
    return false
  }

  const addFieldToFileList = () => {
    setFileList((prev: any) => [...prev, { fileList: [] }])
  }

  const beforeUpload = (fieldKey: number) => (file: RcFile, FileList: RcFile[]) => {
    setFileList((prev: any[]) => {
      return prev.map((item: any, index: number) =>
        index === fieldKey ? { fileList: [file] } : item,
      )
    })

    return false
  }

  const onSubmit = () => {
    const data: {
      memelist: { categories: string[]; description: string }[]
    } = form.getFieldsValue()

    const { memelist } = data

    const dataToSerialize = {
      memelist: memelist.map(({ categories, description }) => ({
        description,
        categories,
      })),
    }

    const serializedData = serialize(dataToSerialize, { indices: true })
    //TODO посмотреть как лучше добавлять несколько файлов, см по поиску "TODO написать гвард чтоб узнавать количество файлов и мапить тут массив с названиями"
    memelist.forEach((_, index) => {
      serializedData.append('attachments[]', fileList[index].fileList[0])
    })
    dispatch(fetchUploadMemes(serializedData))
  }

  const ROOT_CLASS = 'upload'

  //TODO добавить сообщение об успешной и неуспешной загрузке
  // TODO добавить #success в адресной строчке
  if (fetchingStatus === IFetchingStatus.fulfilled) {
    return <UploadSuccessfull />
  }

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        memelist: [{ description: '', dragger: { file: null, fileList: [] } }],
      }}
      className={ROOT_CLASS}
    >
      <Title>Загрузить мем</Title>
      <Form.List name="memelist">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, key) => (
              <Row gutter={16} key={key}>
                <Col span={24}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'description']}
                    fieldKey={[field.fieldKey, 'description']}
                    label="Подпись"
                    rules={[{ required: true, message: 'Краткое описание, пож' }]}
                  >
                    <Input type="text" placeholder="Описание" onChange={onChangeForm} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'categories']}
                    fieldKey={[field.fieldKey, 'categories']}
                    label="Категории"
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Выберите категории"
                      onChange={onChangeForm}
                    >
                      {categories.map((c) => (
                        <Option key={c.value} value={c.value}>
                          {c.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'dragger']}
                    fieldKey={[field.fieldKey, 'dragger']}
                    label="Загрузить"
                    //TODO добавить валидацию на размер файла
                    rules={[validateIsFileSelected(fileList[field.fieldKey].fileList)]}
                  >
                    <Dragger
                      name="files"
                      beforeUpload={beforeUpload(field.fieldKey)}
                      accept="image/jpeg, image/png"
                      fileList={fileList[field.fieldKey]?.fileList ?? []}
                      onRemove={onRemove(field.fieldKey)}
                      onChange={onChangeForm}
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Выберите мем или перетяните его сюда</p>
                      <p className="ant-upload-hint">За раз загрузить можно только один</p>
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
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
        <Button type="primary" htmlType="submit" disabled={!isValid} onClick={onSubmit}>
          Загрузить
        </Button>
      </Form.Item>
    </Form>
  )
}
