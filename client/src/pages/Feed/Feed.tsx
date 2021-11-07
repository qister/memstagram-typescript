import { useEffect } from 'react'
import { Divider, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { MemeCard } from 'pages/Feed/MemeCard/MemeCard'

import './Feed.scss'
import { fetchMemeList, resetFeedState } from './feedSlice'
import { IFetchingStatus } from 'constants/enums'
import { useAppDispatch, useAppSelector } from 'hooks'

// Если функционала InfiniteScroll не хватит, можно написать свой через рефы
export const Feed = () => {
  const { memeList, total, fetchingStatus } = useAppSelector((state) => state.feed)
  const dispatch = useAppDispatch()
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
      loader={false} //Лоадер перенесен ниже тк тут его не получается отцентрировать
      className={ROOT_CLASS}
    >
      <div className={`${ROOT_CLASS}_content`}>
        <div style={{ width: '60%' }}>
          {memeList.map((meme, index) => (
            <div key={index}>
              <MemeCard meme={meme} />
              {index !== total - 1 && <Divider dashed />}
            </div>
          ))}
        </div>
        {fetchingStatus === IFetchingStatus.pending && <Spin />}
      </div>
    </InfiniteScroll>
  )
}
