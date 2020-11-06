import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import axios from 'axios'

export const ShowPage = () => {
  const [meme, setMeme] = useState('')
  const [imgUrl, setImgUrl] = useState('')

  const getUser = async () => {
    try {
      const response = await axios.get('/api/meme/show', {
        params: {
          id: 3,
        },
      })
      console.log(response.data[0])
      setImgUrl('http://localhost:5000/' + response.data[0].imgUrl.slice(7))
    } catch (error) {
      console.error(error)
    }
  }

  const likeMeme = async () => {
    try {
      const response = await axios.post('/api/meme/likememe', {
        id: 2
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={getUser}
      >
        Upload
      </button>
      <button
        type="button"
        className="btn btn-success btn-block"
        onClick={likeMeme}
      >
        Like Meme
      </button>
      <img src={imgUrl} alt="альтернативный текст" />
    </React.Fragment>
  )
}
