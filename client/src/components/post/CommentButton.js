import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

function CommentButton({ post }) {
  return (
    <div className='commentButtonIconWrapper'>
      <ChatBubbleOutlineIcon className='commentButtonIcon' fontSize='small' />
      <p className='noOfComments'>{post?.comments?.length || 0}</p>
    </div>
  )
}

export default CommentButton
