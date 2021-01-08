import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react';

import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
   options?: any[]
   onChangeOption?: (option: any) => void
   className?: any
}

export const SuperSelect: React.FC<SuperSelectPropsType> = (
   {
      options,
      name,
      onChange,
      onChangeOption,
      className,

      ...restProps
   }
) => {
   const mappedOptions: any[] = options ? options.map((o, i) => {
         return <option key={name + '-' + i} value={o}>{o}</option>
      })
      : []

   const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
      onChangeOption && onChangeOption(e.target.value)
   }
   const finalSelectStyle = `${className} ${s.defaultSelect}`

   return (
      <select onChange={onChangeCallback}
              className={finalSelectStyle}
              {...restProps} >
         {mappedOptions}
      </select>
   );
}
