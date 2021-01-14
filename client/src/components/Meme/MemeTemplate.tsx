import React from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { IFetchingStatus } from '../../redux/authToolkitRedux/StoreSlices/authorization'

interface Props {
  classes: any
  classesLoader: any
  likesNumber: any
  author: string
  imgUrl: string
  liked: boolean
  fetchingStatus: string
  decrementIndex(): void
  incrementIndex(): void
  tapLike(): void
}

export function MemeTemplate({
  classes,
  classesLoader,
  likesNumber,
  author,
  imgUrl,
  liked,
  fetchingStatus,
  decrementIndex,
  incrementIndex,
  tapLike,
}: Props):JSX.Element {

  return (
    <>
      <Box display='flex' justifyContent='space-between'>
        <span className='top-element'>
          <ArrowBackIcon onClick={decrementIndex} />
          <ArrowForwardIcon onClick={incrementIndex} />
        </span>
      </Box>

      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar aria-label='avatar test' className={classes.avatar}>{author}</Avatar>}
          title={author}
        />
        <CardMedia title='Meme'>
          <div className='meme'>
            {fetchingStatus === IFetchingStatus.pending &&
              <div className={classesLoader.root}>
                <CircularProgress />
              </div>
            }
            {fetchingStatus === IFetchingStatus.fulfilled &&
              <>
                <img className='big' src={imgUrl} alt={''} onDoubleClick={tapLike} />
                <NavLink to='/add'>
                  <Fab color='secondary' aria-label='add' className={classes.fabButton}>
                    <AddIcon />
                  </Fab>
                </NavLink>
              </>
            }
          </div>
        </CardMedia>

        <CardActions className={classes.cardActions} disableSpacing={false}>
          <FormControlLabel
            label={likesNumber}
            checked={liked}
            onChange={tapLike}
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name='checkedH'
              />
            }
          />

          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  )
}
