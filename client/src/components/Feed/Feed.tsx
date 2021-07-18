import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

import { MemeCard } from 'components/Feed/MemeCard/MemeCard'
import { RootState } from 'redux/authToolkitRedux/StoreSlices'

import './Feed.scss'
import { fetchMemeList, resetFeedState } from './feedSlice'
import { IFetchingStatus } from 'constants/enums'

// Если функционала InfiniteScroll не хватит, можно написать свой через рефы
export const Feed = () => {
  const {
    feed: { memeList, total, fetchingStatus },
  } = useSelector((state: RootState) => state)
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
      loader={false} //Лоадер перенесен ниже тк тут его не получается отцентрировать
      className={ROOT_CLASS}
    >
      <div className={`${ROOT_CLASS}_content`}>
        <div style={{ width: '60%' }}>
          {memeList.map((meme, index) => (
            <>
              <MemeCard key={index} meme={meme} />
              {index !== total - 1 && <Divider dashed />}
            </>
          ))}
        </div>
        {fetchingStatus === IFetchingStatus.pending && <Spin />}
      </div>
    </InfiniteScroll>
  )
}
