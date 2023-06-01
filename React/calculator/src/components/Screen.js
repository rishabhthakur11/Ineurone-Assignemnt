import { Textfit } from 'react-textfit';
import React from 'react'

function Screen({value}) {
  return (
    <Textfit className='h-[100px] w-full mb-[10px] px-[10px]' mode='single' max={70}>
        {value}
    </Textfit>
  )
}

export default Screen