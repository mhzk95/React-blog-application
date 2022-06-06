import { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import './CategoryDropDown.css'
import { axiosInstance } from '../../config'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 4,
    marginTop: theme.spacing(1),
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

export default function CategoryDropDown({ category, setCategory }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [limit, setLimit] = useState(false)
  const [listCats, setListCats] = useState([])
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    axiosInstance
      .get('/category/')
      .then((res) => {
        let array = res.data.reduce((acc, cur) => [...acc, cur.name], [])
        setListCats(array)
      })
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    if (category.length >= 2) {
      setLimit(true)
    }
  }, [category.length])

  const addCategory = (e) => {
    setCategory((prevalue) => {
      if (!e.target.checked) {
        return prevalue.filter((value) => value !== e.target.value)
      } else if (e.target.checked) {
        return [...prevalue, e.target.value]
      }
    })
  }
  const resetCategory = () => {
    setCategory([])
    setLimit(false)
  }

  return (
    <div className='composeCategoryDropDown'>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Categories
      </Button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {listCats.map((cat, index) => {
          return (
            <MenuItem key={index} disableGutters style={{ width: '200px' }}>
              <label className='categoryLabel'>
                <input
                  type='checkbox'
                  id={cat}
                  value={cat}
                  disabled={limit}
                  checked={category.includes(cat)}
                  onChange={addCategory}
                />
                {cat}
              </label>
            </MenuItem>
          )
        })}
        {limit && (
          <Button
            style={{ width: '100%' }}
            onClick={resetCategory}
            color='error'
          >
            Cancel
          </Button>
        )}
      </StyledMenu>
    </div>
  )
}
