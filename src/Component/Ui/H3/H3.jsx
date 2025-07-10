import React from 'react'
import style from './H3.module.css';

export default function H3({ text }) {
    return (
        <h3 className={'m-auto fw-bolder fs-1 ' + style.heading}>{text}</h3>

    )
}
