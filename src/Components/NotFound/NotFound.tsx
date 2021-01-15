import React from 'react'
import  Button  from '../SuperComponents/Button/Button'
import style from './NotFound.module.css'

type NotFoundPropsType = {}


const NotFound: React.FC<NotFoundPropsType> = () => {
    return <section className={style.page_404}>
        <div className={style.container}>
            <div className={style.four_zero_four_bg}>
                <h1 className={style.heading}>404</h1>
            </div>
            <div className={style.contant_box_404}>
                <h3 className={style.h2}>
                    Look like you're lost
                </h3>
                <p>the page you are looking for not available!</p>
                <Button> Go home </Button>
            </div>
        </div>
    </section>
}

export default NotFound