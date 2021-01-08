import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'

import s from './SuperInputText.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
   onChangeText?: (value: string) => void
   onEnter?: () => void
   error?: string
   spanClassName?: string
};

export const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
       type,
       onChange, onChangeText,
       onKeyPress, onEnter,
       error,
       className, spanClassName,

       ...restProps
    }
) => {
   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange
      && onChange(e)

      onChangeText && onChangeText(e.currentTarget.value)
   }
   const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress && onKeyPress(e)

      e.key === 'Enter'
      && onEnter
      && onEnter()
   }

   const finalInputClassName = error ? `${error} ${s.superInput} ${s.red} ` : s.superInput
   const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`

   return (

       <>
          <input
              type={'text'}
              onChange={onChangeCallback}
              onKeyPress={onKeyPressCallback}
              className={`${finalInputClassName} ${className}`}

              {...restProps}
          />
          {
             error && <span className={finalSpanClassName}>{error}</span>
          }
       </>
   )
}

