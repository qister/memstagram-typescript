import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { appInit, IMeme, like } from "../../redux/authToolkitRedux/StoreSlices/app";
import { RootState } from "redux/authToolkitRedux/StoreSlices";
import { MemeCardTemplate } from './MemeCardTemplate'

interface IMemeToShow extends IMeme {
    likesNumber: number
}

export const MemeCardBehavior = () => {
    const dispatch = useDispatch()
    
    const [id, setId] = useState(0)
    const [newCurrentMeme, setNewCurrentMeme] = useState<IMemeToShow>({
        id: 0,
        author: '',
        description: '',
        imgUrl: '',
        likedBy: [],
        //TODO сделать потом чтобы на сервере считалось лайкнул или нет
        liked: false,
        created: '',
        likesNumber: 0,
    })

    const list = useSelector((state: RootState) => state.app.memeList)
    const { email, fetchingStatus } = useSelector(
        (state: RootState) => state.authorization,
    )

    const { author, likesNumber, imgUrl, liked } = newCurrentMeme

    useEffect(() => {
        dispatch(appInit())
    }, [])

    useEffect(() => {
        const currentMeme = list.find((meme) => meme.id === id)
        if (currentMeme) {
            const {
                author,
                description,
                created,
                likedBy,
                imgUrl,
                id,
                liked,
            } = currentMeme

            console.log('imgUrl: ', imgUrl)

            setNewCurrentMeme({
                author,
                description,
                created,
                likesNumber: likedBy.length,
                imgUrl: 'http://localhost:4000/' + imgUrl.slice(7),
                //TODO убрать, сделать чтобы брались только нужные значения
                id,
                likedBy,
                liked,
            })
        }
    }, [id, list])

    function incrementIndex() {
        setId(id < list.length - 1 ? id + 1 : id)
    }

    function decrementIndex() {
        setId(id > 0 ? id - 1 : id)
    }

    const toggleLike = () => {
        setNewCurrentMeme((prev: any) => {
            return { ...prev, liked: !prev.liked }
        })

        dispatch(like({ id, email }))
    }

    return React.createElement(MemeCardTemplate, {
        liked,
        likesNumber,
        author,
        imgUrl,
        fetchingStatus,
        incrementIndex,
        decrementIndex,
        toggleLike,
    })
}