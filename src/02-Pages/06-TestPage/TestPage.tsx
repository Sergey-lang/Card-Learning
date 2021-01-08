import React from 'react'
import {SuperInputText} from '../../01-Components/c1-SuperInputText/SuperInputText'
import {SuperButton} from '../../01-Components/c2-SuperButton/SuperButton'
import {SuperCheckbox} from '../../01-Components/c3-SuperCheckbox/SuperCheckbox'
import {SuperSelect} from '../../01-Components/c5-SuperSelect/SuperSelect'
import SuperRadio from '../../01-Components/c6-SuperRadio/SuperRadio'
import {SuperRange} from '../../01-Components/c7-SuperRange/SuperRange'

import s from './TestPage.module.css'

type TestPageProps = {}

export const TestPage: React.FC<TestPageProps> = ({}) => {
   return (
       <div>
          <h1>TestPage</h1>
          <div>
             <h2>Super component test "SuperInputText"</h2>
             <SuperInputText className={s.testInput} placeholder='Enter value...'/>
          </div>
          <div>
             <h2>Super component test "SuperButton"</h2>
             <SuperButton className={s.testButton}>Button</SuperButton>
          </div>
          <div>
             <h2>Super component test "SuperCheckbox"</h2>
             <SuperCheckbox/>
          </div>
          <div>
             <h2>Super component test "SuperSelect"</h2>
             <SuperSelect options={[1, 2, 3, 4, 5]}/>
          </div>
          <div>
             <h2>Super component test "SuperRadio"</h2>
             <SuperRadio options={[1, 2, 3, 4, 5]}/>
          </div>
          <div>
             <h2>Super component test "SuperRange"</h2>
             <SuperRange/>
          </div>
       </div>
   )
}