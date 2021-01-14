import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { appInit, IMeme, like } from "../../redux/authToolkitRedux/StoreSlices/app";
import { RootState } from "redux/authToolkitRedux/StoreSlices";
import { MemeTemplate } from "./MemeTemplate";
import { useStyles, useStylesLoader } from './style/memeStyle'

export function MemeBehavior(props: any): JSX.Element {
  const classes = useStyles();
  const classesLoader = useStylesLoader();

  const [id, setId] = useState(0);

  interface IMemeToShow extends IMeme {
    likesNumber: number;
  }

  const [newCurrentMeme, setNewCurrentMeme] = useState<IMemeToShow>({
    id: 0,
    author: "",
    description: "",
    imgUrl: "",
    likedBy: [],
    //TODO сделать потом чтобы на сервере считалось лайкнул или нет
    liked: false,
    created: "",
    likesNumber: 0,
  });

  const dispatch = useDispatch();

  const list = useSelector((state: RootState) => state.app.memeList);
  const { email, fetchingStatus } = useSelector(
    (state: RootState) => state.authorization
  );

  useEffect(() => {
    dispatch(appInit());
  }, []);

  useEffect(() => {
    const currentMeme = list.find((meme) => meme.id === id);
    if (currentMeme) {
      const { author, description, created, likedBy, imgUrl, id, liked } = currentMeme;

      setNewCurrentMeme({
        author,
        description,
        created,
        likesNumber: likedBy.length,
        imgUrl: "http://localhost:4000/" + imgUrl.slice(7),
        //TODO убрать, сделать чтобы брались только нужные значения
        id,
        likedBy,
        liked,
      });
    }
  }, [id, list]);

  const { author, likesNumber, imgUrl, liked } = newCurrentMeme;

  function tapLike() {
    // setNewCurrentMeme((prev: any) => {
    //   return { ...prev, liked: !prev.liked }
    // })

    dispatch(like({ id, email }));
  }

  function incrementIndex() {
    setId(id < list.length - 1 ? id + 1 : id);
  }

  function decrementIndex() {
    setId(id > 0 ? id - 1 : id);
  }

  return React.createElement(MemeTemplate, {
    classes,
    classesLoader,
    likesNumber,
    author,
    imgUrl,
    liked,
    fetchingStatus,
    incrementIndex,
    decrementIndex,
    tapLike,
  });
}
