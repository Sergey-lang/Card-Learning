import * as React from 'react';
import {getTrackBackground, Range} from 'react-range';

type DoubleRangePropsType = {
    range: Array<number>,
    setRange: (newValues: Array<number>) => void
}

const DoubleRange: React.FC<DoubleRangePropsType> = ({range, setRange, children}) => {

    return (
        <Range
            values={range}
            step={2}
            min={0}
            max={15}
            onChange={values => setRange(values)}
            renderTrack={({props, children}) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '50%',
                        margin: '30px',
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                                values: range,
                                colors: ['#ccc', '#548BF4', '#ccc'],
                                min: range[0],
                                max: range[1]

                            }),
                            alignSelf: 'center'
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({index, props, isDragged}) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '12px',
                        width: '12px',
                        borderRadius: '1px',
                        backgroundColor: '#FFF',
                        boxShadow: '0px 2px 6px #AAA',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '-28px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4'
                        }}
                    >
                        {range[index].toFixed(0)}
                    </div>
                    <div style={{height: '16px', width: '5px', backgroundColor: isDragged ? '#548BF4' : '#CCC'}}/>
                </div>
            )}
        />
    );
};

export default DoubleRange