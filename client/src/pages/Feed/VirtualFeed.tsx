import { FC, Fragment, useEffect } from 'react'
import useVirtual from 'react-cool-virtual'

import { useAppSelector, useAppDispatch } from 'hooks'
import { fetchMemeList, resetFeedState } from './feedSlice'
import { MemeCard } from './MemeCard/MemeCard'
import { IFetchingStatus } from 'constants/enums'

import './Feed.scss'

const BATCH_COMMENTS = 1

const Loading = () => <div className="item">⏳ Loading...</div>

export const VirtualFeed: FC = () => {
  const dispatch = useAppDispatch()
  const loadMemes = () => {
    dispatch(fetchMemeList())
  }

  const { virtualConfig, memeList, total } = useAppSelector(
    ({ feed: { memeList, total, fetchingStatus } }) => {
      const needLoadMore = (loadIndex: number) =>
        memeList[loadIndex] !== undefined ||
        (memeList.length >= total && total !== 0) ||
        fetchingStatus === IFetchingStatus.pending

      return {
        virtualConfig: {
          // Provide the number of comments
          // itemCount: memeList.length,
          itemCount: memeList.length,
          // Starts to pre-fetch data when the user scrolls within every 5 items
          // e.g. 1 - 5, 6 - 10 and so on (default = 15)
          loadMoreCount: BATCH_COMMENTS,
          // Provide the loaded state for a batch items to tell the hook
          // whether the `loadMore` should be triggered or not
          isItemLoaded: needLoadMore,
          // The callback will be invoked when more data needs to be loaded
          loadMore: loadMemes,
        },
        memeList,
        total,
      }
    },
  )

  useEffect(() => {
    return () => {
      dispatch(resetFeedState())
    }
  }, [])

  const ROOT_CLASS = 'feed'
  const { outerRef, innerRef, items } = useVirtual(virtualConfig)

  return (
    <div
      className={`${ROOT_CLASS}_content`}
      style={{ height: window.innerHeight, overflow: 'auto' }}
      ref={outerRef as React.LegacyRef<HTMLDivElement>}
    >
      <div ref={innerRef as React.LegacyRef<HTMLDivElement>} style={{ width: '60%' }}>
        {items.length ? (
          items.map(({ index, measureRef }) => {
            const showLoading = index === memeList.length - 1 && memeList.length < total

            return (
              <Fragment key={memeList[index].imgUrl}>
                <div ref={measureRef}>
                  <MemeCard meme={memeList[index]} />
                </div>
                {showLoading && <Loading />}
              </Fragment>
            )
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}
