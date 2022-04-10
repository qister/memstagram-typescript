import { useState } from 'react'
import { serialize } from 'object-to-formdata'

import { Form, Upload, Row, Col, Input, Button, Typography, Select } from 'antd'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'

import { RcFile } from 'antd/lib/upload'
import { UploadSuccessfull } from './UploadSuccessfull'
import { useUploadMemes } from 'API/memesAPI'

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

  const upload = useUploadMemes()

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

  const beforeUpload = (fieldKey: number) => (file: RcFile, _FileList: RcFile[]) => {
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
    upload.mutate(serializedData)
  }

  const ROOT_CLASS = 'upload'

  //TODO добавить сообщение об успешной и неуспешной загрузке
  // TODO добавить #success в адресной строчке
  if (upload.isSuccess) {
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
                    fieldKey={[field.key, 'description']}
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
                    fieldKey={[field.key, 'categories']}
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
                    fieldKey={[field.key, 'dragger']}
                    label="Загрузить"
                    //TODO добавить валидацию на размер файла
                    rules={[validateIsFileSelected(fileList[field.key].fileList)]}
                  >
                    <Dragger
                      name="files"
                      beforeUpload={beforeUpload(field.key)}
                      accept="image/jpeg, image/png"
                      fileList={fileList[field.key]?.fileList ?? []}
                      onRemove={onRemove(field.key)}
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
