import React from 'react'

const InputForm = () => {
  return (
    <div>
      <div className='inputWrap'>
        <label className='labelText'></label>
        <input className='inputText'></input>
      </div>
      <div className='errerMessageWrap'>
        형식을 올바르게 입력해주세요.
      </div>
    </div>
  )
}

export default InputForm
