import React from 'react'
import { ShareButtons, generateShareIcon } from 'react-share'

const { FacebookShareButton, TwitterShareButton } = ShareButtons
const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')

const TweetThis = props =>
  <TwitterShareButton
    url={`http://effulgence.io{props.path}`}
    title={props.title}
    via={'_prayash'}
    className={'share-icons'}
  >
    <TwitterIcon round size={32} />
  </TwitterShareButton>

const FacebookShare = props =>
  <FacebookShareButton
    url={`http://effulgence.io${props.path}`}
    title={props.title}
    className={'share-icons'}
  >
    <FacebookIcon round size={32} />
  </FacebookShareButton>

export { TweetThis, FacebookShare }
