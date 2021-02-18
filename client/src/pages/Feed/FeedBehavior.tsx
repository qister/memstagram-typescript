import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FeedTemplate } from './FeedTemplate'
import { loadMemes, like } from 'redux/authToolkitRedux/StoreSlices/app'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'

export const FeedBehavior = () => {
  const [fetching, setFetching] = useState(true)

  const {
    app: { memeList, total, nextPage, FetchingStatus },
    authorization: { email },
  } = useSelector((state: RootState) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    if (fetching) {
      dispatch(loadMemes(nextPage))
      setFetching(false)
    }
  }, [fetching])

  useEffect(() => {
    if (FetchingStatus) {
      document.addEventListener('scroll', scrollHandler)
    }

    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
    //TODO убрать зависимость, чтобы работало без нее
  }, [FetchingStatus])

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
    dispatch(like({ id, email }))
  }

  return React.createElement(FeedTemplate, {
    memeList,
    toggleLike
  })
}
