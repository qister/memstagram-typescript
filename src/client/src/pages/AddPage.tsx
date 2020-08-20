import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import axios from 'axios'

export const AddPage_ = () => {
  // const {loading, request, error, clearError} = useHttp()

  const [author, setAuthor] = useState('')

  const [selectedFile, setSelectedFile] = useState<any>('')
  const [description, setDescription] = useState('')

  const [loaded, setLoaded] = useState(null)

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0])
    setLoaded(null)
  }

  const onClickHandler = async () => {
    const data = new FormData()
    data.append('file', selectedFile)
    data.append('author', author)
    data.append('description', description)

    try {
      // const fetchResponse = await request("/api/meme/addpic", "POST", data, {
      //   "Content-Type": "multipart/form-data",
      // })

      const response = await axios.post('/api/meme/addpic', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log('axiosResponse', response)

      // console.log('fetchResponse', fetchResponse)
    } catch (error) {
      console.log('Upload error', error)
    }
  }

  return (
    <div className="row">
      <input
        id="author"
        type="text"
        className="validate"
        placeholder="author"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        id="description"
        type="text"
        className="validate"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input type="file" name="file" onChange={(e) => onChangeHandler(e)} />
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={onClickHandler}
      >
        Upload
      </button>
    </div>
  )
}
