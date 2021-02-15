import React from 'react'
import { CssBaseline, Paper } from '@material-ui/core'
import { InboxOutlined } from '@ant-design/icons'

import { Copyright } from '../../components/Copyright'

import 'antd/dist/antd.css'

interface Props {
  classes: any
  author: string
  description: string
  Dragger: any
  propsDrag: any
  onChangeHandlerAuthor(event: React.ChangeEvent<HTMLInputElement>): void
  onChangeHandlerDescription(event: React.ChangeEvent<HTMLInputElement>): void
  onClickUploadMeme(): void
}

  export function AddMemeTemplate({
    classes,
    author,
    description,
    Dragger,
    propsDrag,
    onChangeHandlerAuthor,
    onChangeHandlerDescription,
    onClickUploadMeme
  }: Props) {

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <input
            id='author'
            type='text'
            className='validate'
            placeholder='author'
            onChange={onChangeHandlerAuthor}
            value={author}
          />
          <input
            id='description'
            type='text'
            className='validate'
            placeholder='description'
            onChange={onChangeHandlerDescription}
            value={description}
          />
          <Dragger {...propsDrag}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
              Click or drag file to this area to upload
            </p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
          <button
            type='button'
            className='btn btn-success btn-block'
            onClick={onClickUploadMeme}
          >
            Upload
          </button>
        </Paper>
        <Copyright />
      </main>
    </>
  )
}
