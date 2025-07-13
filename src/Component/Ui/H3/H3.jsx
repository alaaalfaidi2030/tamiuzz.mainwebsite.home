import React from 'react'
import style from './H3.module.css';
import { motion } from 'framer-motion';

export default function H3({ text }) {

    return (
        <motion.h3
            initial={{
                opacity: 0
            }
            }
            animate={{
                opacity: 1
            }
            }
            transition={{
                duration: 1
            }}



            className={'m-auto fw-bolder fs-1 ' + style.heading} > {text}</motion.h3 >

    )
}
