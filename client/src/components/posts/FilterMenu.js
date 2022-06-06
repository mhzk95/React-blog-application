import { useState } from 'react'
import { Link } from 'react-router-dom'

function FilterMenu({ category }) {
  const [filter, setFilter] = useState(false)
  const [cat, setCat] = useState(false)
  const [timeList, setTimeList] = useState(false)

  return (
    <div className='filterWrapper'>
      <div className='filterDropDown'>
        <button
          className='filterSelect'
          onClick={() => {
            setFilter(!filter)
            setCat(false)
            setTimeList(false)
          }}
        >
          Sort By<i className='fa-solid fa-caret-down filterDropDownIcon'></i>
        </button>
        <div className={`filterDropDownBody ${filter && 'visible'}`}>
          <span onClick={() => setCat(!cat)}>
            Categories
            <i className='fa-solid fa-caret-down filterDropDownIcon'></i>
          </span>
          <span onClick={() => setTimeList(!timeList)}>
            Time<i className='fa-solid fa-caret-down filterDropDownIcon'></i>
          </span>
          <span>
            <Link className='link' to={`/?filterby=${-1}`}>
              Most Liked
            </Link>
          </span>
          <span>
            <Link className='link' to={`/?filterby=${1}`}>
              Less Liked
            </Link>
          </span>
        </div>
        <ul className={`filterCategoryList ${cat && 'visible'}`}>
          {category.map((cat, index) => {
            return (
              <li key={index}>
                <Link className='link' to={`/?category=${cat}`}>
                  {cat}
                </Link>
              </li>
            )
          })}
        </ul>
        <ul className={`filterTimeList ${timeList && 'visible'}`}>
          <li>
            <Link className='link' to={`/?sortby=${-1}`}>
              Latest
            </Link>
          </li>
          <li>
            <Link className='link' to={`/?sortby=${1}`}>
              Oldest
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FilterMenu
