import React from "react";
import Input from "./Components/SuperComponents/Input/Input";
import Button from "./Components/SuperComponents/Button/Button";
import Checkbox from "./Components/SuperComponents/CheckBox/Checkbox";
import RadioInput from "./Components/SuperComponents/RadioInput/RadioInput";
import SelectInput from "./Components/SuperComponents/SelectInput/SelectInput";
import ProgressBar from "./Components/SuperComponents/ProgressBar/ProgressBar";

type AllComponentsPropsType = {}

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