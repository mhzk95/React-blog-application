
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useState } from 'react';
import { context } from '../../context/Context';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config';


export default function DeleteMenu({comment,fetchComment,setFetchComment}) {
  const {user} = useContext(context)
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDelete = () => {
    axiosInstance.put(`/posts/${path}/comments`,{_id:comment._id}).then(res => {
        setAnchorEl(null);
    setFetchComment(!fetchComment)
    }).catch(err => console.log(err))
    
  };

  return (
    <div className='commentMoreButton'>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        disableScrollLock={ true }
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            width: '15ch',
          },
        }}
      >
        {user?._id == comment.userId ? 
          <MenuItem onClick={handleDelete}>
            Delete
          </MenuItem> :
          <MenuItem onClick={() => setAnchorEl(null)}>
            Report
          </MenuItem>
        }
        
      </Menu>
    </div>
  );
}
