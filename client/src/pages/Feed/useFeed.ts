import { useState, useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'

import { getMemeList, likeMeme } from 'API/memesAPI'
import { IMeme } from '../../constants/interfaces'

const BATCH_COMMENTS = 1

export const useVirtualFeed = () => {
  const [page, setPage] = useState(1)
  const [memeList, setMemeList] = useState<IMeme[]>([])
  const { isLoading, data, isSuccess } = useQuery(['feed', page], () => getMemeList(page), {
    staleTime: Infinity,
  })
  const like = useMutation((id: string) => likeMeme(id))

  const {
    data: { memes, total },
  } = data ?? { data: { memes: [], total: 0, next: { page: 1 } } }

  useEffect(() => {
    if (isSuccess) {
      setMemeList((prev) => [...prev, ...memes])
    }
  }, [isSuccess]) // тут по идее нужно зависеть от страницы

  useEffect(() => {
    if (like.isSuccess) {
      const _id = like.data.data.meme._id
      setMemeList((prev) =>
        prev.map((meme) => (meme._id === _id ? { ...meme, liked: !meme.liked } : meme)),
      )
    }
  }, [like.isSuccess])

  const needLoadMore = (loadIndex: number) =>
    memeList[loadIndex] !== undefined || (memeList.length >= total && total !== 0) || isLoading

  const loadMemes = () => {
    if (data?.data.next?.page) {
      setPage((prev) => prev + 1)
    }
  }

  const onLike = (id: string) => like.mutate(id)

  const virtualConfig = {
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
  }

  return {
    virtualConfig,
    memeList,
    total,
    isLoading,
    onLike,
    loadMemes,
  }
}
