import { CssBaseline, Link, Paper, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'

import { useHttp } from '../hooks/http.hook'
import 'antd/dist/antd.css'
import '../index.css'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Memstagram
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 460,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}))

const { Dragger } = Upload

export const AddMeme = () => {
  const { loading, request, error, clearError } = useHttp()
  const [author, setAuthor] = useState('')
  const [selectedFile, setSelectedFile] = useState<any>('')
  const [description, setDescription] = useState('')
  
  

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
      
      return false;
    },

  }

  const classes = useStyles()

  const onClickHandler = async () => {
    const data = new FormData()
    data.append('file', selectedFile)
    data.append('author', author)
    data.append('description', description)

    try {
      const hookResponse = await request('/api/meme/addpic', 'POST', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('fetchResponse', hookResponse)
      setSelectedFile(null)
      setAuthor('')
      setDescription('')
      message.success(`File uploaded successfully.`)

      // const response = await axios.post('/api/meme/addpic', data, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })

      // console.log('axiosResponse', response)
    } catch (error) {
      console.log('Upload error', error)
    }
  }

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <input
            id="author"
            type="text"
            className="validate"
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
          <input
            id="description"
            type="text"
            className="validate"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Dragger {...propsDrag}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          <button
            type="button"
            className="btn btn-success btn-block"
            onClick={onClickHandler}
          >
            Upload
          </button>
        </Paper>
        <Copyright />
      </main>
    </>
  )
}
