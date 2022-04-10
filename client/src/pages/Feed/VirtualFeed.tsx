import { FC, Fragment } from 'react'
import useVirtual from 'react-cool-virtual'

import { MemeCard } from './MemeCard/MemeCard'
import { useFeed } from './useFeed'

import './Feed.scss'

const Loading = () => <div className="item">⏳ Loading...</div>

export const VirtualFeed: FC = () => {
  const { memeList, virtualConfig, total, onLike } = useFeed()
  const { outerRef, innerRef, items } = useVirtual(virtualConfig)

  const ROOT_CLASS = 'feed'

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
                  <MemeCard meme={memeList[index]} onLike={onLike} />
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
