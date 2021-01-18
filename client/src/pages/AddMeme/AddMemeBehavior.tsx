import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Upload, message } from 'antd'

import { AddMemeTemplate } from './AddMemeTemplate'
import { upload } from '../../redux/authToolkitRedux/StoreSlices/app'
import { useStyles } from '../../styles/addMemeStyle'
import 'antd/dist/antd.css'

export function AddMemeBehavior(): JSX.Element {
  const [author, setAuthor] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const classes = useStyles()
  const { Dragger } = Upload

  const propsDrag = {
    name: 'file',
    multiple: false,
    action: '/api/meme/addpic',
    onChange(info: any) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    beforeUpload: (file: any) => {
      setSelectedFile(file)

      return false
    },
  }

  function onChangeHandlerAuthor(event: React.ChangeEvent<HTMLInputElement>) {
    setAuthor(event.target.value)
  }

  function onChangeHandlerDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value)
  }

  async function onClickUploadMeme() {
    const data = new FormData()
    data.append('file', selectedFile)
    data.append('author', author)
    data.append('description', description)

    try {
      // const response = await axios.post('/api/meme/addpic', data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      // console.log('response: ', response)

      dispatch(upload(data))
      setSelectedFile(null)
      setAuthor('')
      setDescription('')
      message.success(`File uploaded successfully.`)
    } catch (error) {
      console.log('Upload error', error)
    }
  }

  return React.createElement(AddMemeTemplate, {
    classes,
    author,
    description,
    Dragger,
    propsDrag,
    onChangeHandlerAuthor,
    onChangeHandlerDescription,
    onClickUploadMeme,
  })
}