import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'

import s from './SuperCheckbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
   onChangeChecked?: (checked: boolean) => void
   spanClassName?: string
};

export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
       type,

       onChange, onChangeChecked,
       className, spanClassName,
       children,

       ...restProps
    }
) => {
   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeChecked && onChangeChecked(e.currentTarget.checked)
      onChange && onChange(e)
   }

   const finalInputClassName = `${s.defaultCheckbox} ${className}`

   return (
       <label className={s.label}>
          <input type={'checkbox'}
                 onChange={onChangeCallback}
                 className={finalInputClassName}
                 {...restProps}
          />
          {
             children && <span className={spanClassName}>{children}</span>
          }
       </label>
   )
}

