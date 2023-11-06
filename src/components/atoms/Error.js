import React from 'react'

const Error = ({error}) => {
  return (
    <div className='font-semibold text-red-700 flex justify-center ' >{`${error}`}</div>
  )
}

export default Error