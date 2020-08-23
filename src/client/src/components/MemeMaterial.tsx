import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import ShareIcon from '@material-ui/icons/Share'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 445,

    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height: 48,
    padding: '0 30px',
  },
  media: {
    height: 400,
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardActions: {
    justifyContent: 'space-between'
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    
  },
}))

const useStylesLoader = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
)

//

export const MemeMaterial_ = (props: any) => {

  const classes = useStyles()
  const classesLoader = useStylesLoader()

  const [id, setId] = useState(0)
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [liked, setLiked] = useState(false)
  const [created, setCreated] = useState()
  const [likesNumber, setLikesNumber] = useState(0)

  const { list, like, isLoading, isLoaded } = props


  useEffect(() => {
    const currentMeme = list.find((meme: any) => meme.id === id)

    if (currentMeme) {
      const email = JSON.parse(localStorage.getItem('userData')!).email

      setAuthor(currentMeme.author)
      setDescription(currentMeme.description)
      setImgUrl('http://localhost:5000/' + currentMeme.imgUrl.slice(7))
      setLiked(currentMeme.likedBy.some((user: string) => user === email))
      setCreated(currentMeme.created)
      setLikesNumber(currentMeme.likedBy.length)
    }
  }, [id, list])

  const tapLike = (id: number) => {
    setLiked(!liked)
    like(id)
  }

  const incrementIndex = () => {
    setId(id < list.length - 1 ? id + 1 : id)
  }

  const decrementIndex = () => {
    setId(id > 0 ? id - 1 : id)
  }

  return (
    <React.Fragment>
      
      <Box display="flex" justifyContent="space-between">
        <span className="top-element">
          <ArrowBackIcon onClick={decrementIndex} />
          <ArrowForwardIcon onClick={incrementIndex} />
        </span>
      </Box>

      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="avatar test" className={classes.avatar}>
              {author}
            </Avatar>
          }
          title={author}
        />
        <CardMedia title="Meme">
          <div className="meme">
            {isLoading ? (
              <div className={classesLoader.root}>
                <CircularProgress />
              </div>
            ) : (
              <>
              <img className='big'
                
                src={imgUrl}
                alt={''}
                onDoubleClick={() => tapLike(id)}
              />
              <NavLink to='/add'>
              <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              // href="/add"
            >
              
              <AddIcon />
              
            </Fab>
            </NavLink>
              </>
            )}
            
          </div>
        </CardMedia>

        <CardActions  className={classes.cardActions} disableSpacing={false}>
          
          <FormControlLabel
            label={likesNumber}
            checked={liked}
            onChange={() => tapLike(id)}
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name="checkedH"
              />
            }
          />

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          
        </CardActions>
      </Card>
    </React.Fragment>
  )
}
