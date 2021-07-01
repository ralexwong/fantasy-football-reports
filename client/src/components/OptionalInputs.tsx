import { useState } from 'react';

import OptionalInput from './OptionalInput';

const inputs: string[] = ['Season', 'Title', 'Caption']

type Props = {
  platform: string
}

export default function OptionalInputs(props: Props) {
  const [open, setOpen] = useState<boolean[]>(new Array(inputs.length).fill(false))
  const handleClick = (i: number) => {
    let set: boolean[] = [...open]
    set[i] = !set[i]
    setOpen(set)
  }

  return (
    <>
      <div className="input__jumbotron">
        <p className="heading-tertiary">Optional Inputs</p>

        {inputs.map((input, i) => {
          return <div className='accordian' key={input}>
            <div className='accordian__title' onClick={() => handleClick(i)} >
              <p>{input} <span className={`accordian__arrow ${open[i] === true ? 'accordian__arrow--active' : ''}`}><svg width="16" height="10">
    <polygon points="0,0 16,0 8,10"/>
</svg></span></p>
            </div>
            <OptionalInput platform={props.platform} input={input} open={open[i]} />
          </div>
        })}

      </div>
    </>
  );
}