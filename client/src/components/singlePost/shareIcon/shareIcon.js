import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import LinkIcon from '@mui/icons-material/Link'
import { useState } from 'react'

export default function ShareIcon() {
  const [title, setTitle] = useState(false)

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => console.log('successfully copied'))
      .catch((err) => console.log(err))
    setTitle(true)
  }

  return (
    <Tooltip
      title={title ? 'Copied' : 'Copy Link'}
      onMouseLeave={() => setTitle(false)}
      onClick={copyLink}
      style={{ float: 'right' }}
    >
      <IconButton>
        <LinkIcon />
      </IconButton>
    </Tooltip>
  )
}
