import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MemeCard } from 'components/MemeCard/MemeCard'
import { loadMemes, IMeme } from 'redux/authToolkitRedux/StoreSlices/app'
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

  return (
    <>
      {memeList.map((meme: IMeme, key) => {
        return (
          <MemeCard
            key={key}
            meme={meme}
          />
        )
      })}
    </>
  )
}
