import React from 'react'

import { MemeCard } from '../../components/MemeCard/MemeCard'

interface IProps {
  memeList: any
  toggleLike: any
}

export const FeedTemplate = ({
  memeList,
  toggleLike
}: IProps) => {
  return (
    <>
      {memeList.map((meme: any, key: any) => {
        return (
          <MemeCard
            key={key}
            toggleLike={() => toggleLike(meme.id)}
            meme={meme}
          />
        )
      })}
    </>
  )
}
