import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'

import s from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
   options?: any[]
   onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
       type,
       name,
       options,
       value,
       onChange,
       onChangeOption,
       className,

       ...restProps
    }
) => {
   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeOption && onChangeOption(e.target.value)
   }

   const finalRadioStyle = `${className} ${s.defaultRadio}`

   const mappedOptions: any[] = options ? options.map((o, i) => ( // map options with key
       <label key={name + '-' + i}>
          <input
              type={'radio'}
              name={name}
              checked={value === o}
              value={o}
              className={finalRadioStyle}
              onChange={onChangeCallback}
          />
          {o}
       </label>
   )) : []

   return (
       <div>
          {mappedOptions}
       </div>
   )
}

export default SuperRadio
