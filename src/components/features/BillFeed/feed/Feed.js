import React from 'react'
import FeedItem from './feeditem/FeedItem'

function Feed({bills}) {
  return (
    <>
    {bills && bills.map((bill, index) => (
      <FeedItem key={index} bill={bill} />
    ))}
    </>
  )
}

export default Feed