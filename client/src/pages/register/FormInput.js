import { useState } from 'react'

function FormInput(props) {
  const { authMessage, exist, label, errorMessage, ...inputProps } = props
  const [focused, setFocused] = useState(false)
  const handleBlur = (e) => {
    setFocused(true)
  }
  return (
    <div className='formInput'>
      <label htmlFor=''>{label}</label>
      <input
        {...inputProps}
        className='registerInput existInput'
        onBlur={handleBlur}
        spellCheck='false'
        focused={focused.toString()}
        onFocus={()=>{inputProps.name === "confirmPassword" && setFocused(true)}}
      />
      {exist ? (
        <span
          className='exist'
          style={{ backgroundColor: 'rgba(245, 39, 39, 0.378)' }}
        >
          {authMessage}
        </span>
      ) : (
        <span className='exist'>
          <p>{errorMessage}</p>
        </span>
      )}
    </div>
  )
}

export default FormInput
