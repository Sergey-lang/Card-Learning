import React from 'react';
import {CardPacksType, deletePack, updatePack} from '../../../Redux/reducers/cardsPackReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../../Redux/store';

export const Table: React.FC<PropsType> = ({data}) => {
    const dispatch = useDispatch()
    const statusResponse = useSelector<RootStateType, string>(state => state.app.statusResponse)

    return (<table>
        <thead>
        <tr>
            {Object.keys(data[0]).map(key => <th>{key.toUpperCase()}</th>)}
            {data && <th>BUTTONS</th>}
        </tr>
        </thead>
        <tbody>
        {data.map((el: CardPacksType) => (
            <tr key={el._id}>
                {Object.values(el).map((data: any) => <td>{data}</td>)}
                <td>
                    {!!data &&
                    <>
                        <button onClick={() => {
                            dispatch(updatePack(el._id))
                        }} disabled={statusResponse === 'loading'}>UPDATE
                        </button>
                        <button onClick={() => {
                            dispatch(deletePack(el._id))
                        }} disabled={statusResponse === 'loading'}>DELETE
                        </button>
                    </>}
                </td>
            </tr>
        ))}
        </tbody>
    </table>)

}


//types:
type PropsType = {
    data:any
}
export default Table