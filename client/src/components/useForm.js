import React, { useState } from 'react'

function useForm(onsubmitCallback, initialState) {
    const [values, setValues] = useState(initialState)
    const onChangeHandler = (event)=>{
        setValues({...values, [event.target.name]: event.target.value})
      }
      
  const performSubmit=(e)=>{
    e.preventDefault() //prevent refresh of form on submit
    onsubmitCallback()
  }
  return { values,
    onChangeHandler,
    performSubmit
   
  }
  //if we wrap return into () it means return as
  // single object so we need to {} to return separately for destructuring
}

export default useForm
