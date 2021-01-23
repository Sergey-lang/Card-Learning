import React from 'react';
import Input from '../03-Components/SuperComponents/Input/Input';
import Button from '../03-Components/SuperComponents/Button/Button';
import Checkbox from '../03-Components/SuperComponents/CheckBox/Checkbox';
import RadioInput from '../03-Components/SuperComponents/RadioInput/RadioInput';
import SelectInput from '../03-Components/SuperComponents/SelectInput/SelectInput';
import ProgressBar from '../03-Components/SuperComponents/ProgressBar/ProgressBar';
import CardPacks from '../02-Pages/05-CardPacks/CardPacks';

type AllComponentsPropsType = {}

export type CartUpdateType = {
    _id: string,
    name?:string
}

const AllComponents: React.FC<AllComponentsPropsType> = () => {

    return <div className={'allComponents'}>
        <Input/>
        <Button> Click me </Button>
        <Checkbox title={'Checkbox'}/>
        <RadioInput/>
        <RadioInput/>
        <SelectInput/>
        <ProgressBar/>
    </div>
}

export default AllComponents