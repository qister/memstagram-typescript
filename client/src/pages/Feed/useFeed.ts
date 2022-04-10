import { useEffect, useState } from 'react'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'

import { getMemeList, likeMeme } from 'API/memesAPI'
import { IMeme } from '../../constants/interfaces'

const BATCH_COMMENTS = 1

const fetchMemeList = ({ pageParam = 1 }) => getMemeList(pageParam)

export const useFeed = () => {
  const [memeList, setMemeList] = useState<IMeme[]>([])
  const [total, setTotal] = useState(0)

  const { isLoading, fetchNextPage } = useInfiniteQuery('feed', fetchMemeList, {
    staleTime: Infinity,
    getNextPageParam: (lastPage, _pages) => lastPage.data.next?.page,
    onSuccess: (data) => {
      const list = data.pages.reduce((acc, item) => [...acc, ...item.data.memes], [] as IMeme[])
      const total = data.pages[0].data.total
      setMemeList(list)
      setTotal(total)
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    return () => {
      queryClient.resetQueries('feed')
    }
  }, [])

  const like = useMutation(likeMeme, {
    onSuccess: (data) => {
      setMemeList((prev) =>
        prev.map((meme) =>
          meme._id === data.data.meme._id ? { ...meme, liked: !meme.liked } : meme,
        ),
      )
    },
  })

  const needLoadMore = (loadIndex: number) =>
    memeList[loadIndex] !== undefined || (memeList.length >= total && total !== 0) || isLoading

  const loadMemes = () => {
    fetchNextPage()
  }

  const onLike = (id: string) => like.mutate(id)

  const virtualConfig = {
    // Provide the number of comments
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
