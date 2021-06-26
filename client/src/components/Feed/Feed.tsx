import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { MemeCard } from 'components/MemeCard/MemeCard'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'

import './Feed.scss'
import { fetchMemeList, resetFeedState } from './feedSlice'

// Если функционала InfiniteScroll не хватит, можно написать свой через рефы
export const Feed = () => {
  const { memeList, total } = useSelector((state: RootState) => state.feed)

  const dispatch = useDispatch()

  const loadMemes = () => dispatch(fetchMemeList())

  useEffect(() => {
    loadMemes()
    return () => {
      dispatch(resetFeedState())
    }
  }, [])

  const ROOT_CLASS = 'feed'

  return (
    <InfiniteScroll
      dataLength={memeList.length}
      next={loadMemes}
      hasMore={memeList.length < total}
      loader={<Spin />}
      className={ROOT_CLASS}
    >
      {memeList.map((meme, index) => (
        <MemeCard key={index} meme={meme} />
      ))}
    </InfiniteScroll>
  )
}
