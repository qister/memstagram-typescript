import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MemeCard } from 'components/MemeCard/MemeCard'
import { loadMemes, like, IMeme } from 'redux/authToolkitRedux/StoreSlices/app'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'

export const Feed = () => {
  const [fetching, setFetching] = useState(true)

  const {
    app: { memeList, total, nextPage },
  } = useSelector((state: RootState) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    if (fetching) {
      dispatch(loadMemes(nextPage))
      setFetching(false)
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
    //TODO убрать зависимость, чтобы работало без нее
  }, [nextPage])

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      memeList.length < total
    ) {
      setFetching(true)
    }
  }

  const toggleLike = (id: number) => {
    dispatch(like({ id }))
  }

  return (
    <>
      {memeList.map((meme: IMeme, key) => {
        const imgLink = 'http://localhost:4000/' + meme.imgUrl.slice(7)

        return (
          <MemeCard
            key={key}
            imgUrl={imgLink}
            toggleLike={() => toggleLike(meme.id)}
            liked={meme.liked}
          />
        )
      })}
    </>
  )
}
