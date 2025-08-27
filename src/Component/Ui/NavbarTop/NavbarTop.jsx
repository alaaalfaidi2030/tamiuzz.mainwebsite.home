import { useContext, useEffect, useRef, useState } from 'react';
import { IsMobileContext } from '../../../Context/isMobileContext';
import style from './NavbarTop.module.css';
import { phoneAndEmail, socialMedia } from '../../../lib/data';
import { motion } from 'framer-motion';

export default function NavbarTop() {
    const navbarTopRef = useRef(null);
    const containerRef = useRef(null);
    const { isMobile } = useContext(IsMobileContext);

    // Scroll effect for navbarTop
    useEffect(() => {
        containerRef.current.style.height = navbarTopRef.current?.clientHeight + "px";

        const handleScroll = () => {
            if (!navbarTopRef.current) return;

            // when not scrollY is 0, close the navbarTop
            if (window.scrollY > 0) {
                navbarTopRef.current.style.opacity = "0";
                containerRef.current.style.height = "10px";
            } else {
                navbarTopRef.current.style.opacity = "100%";
                containerRef.current.style.height = navbarTopRef.current?.clientHeight + "px";

            }

        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={style["navbar-container"]} ref={containerRef}>

            <div className={style['navbar-top'] + " px-4"} dir='ltr' ref={navbarTopRef}>
                <div className={'d-flex align-items-center ' + style['phone-email']}>
                    {phoneAndEmail.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className='d-flex align-items-center mx-2'
                        >
                            <i className={item.icon + " mx-2"}></i>
                            <span className='mx-1'>{item.text}</span>
                        </a>
                    ))}
                </div>
                {!isMobile && <div className={'d-flex align-items-center ' + style['social-media']}>
                    {
                        socialMedia.map((item, idx) => (
                            <motion.a
                                key={idx}
                                href={item.link}
                                dir='ltr'
                                initial={{ opacity: 0, y: -100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={style["social-link"] + " " + style[item.className]}
                            >
                                <i className={`fa-brands ${item.icon}`}></i>
                            </motion.a>
                        ))
                    }
                </div>
                }


            </div>
        </div>
    )
}
