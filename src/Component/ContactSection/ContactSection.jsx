import React from 'react'
import ContactForm from '../ContactForm/ContactForm'
import style from "./ContactSection.module.css"
import img from "../../assets/Images/ContactSection.png"

export default function ContactSection() {
    return (
        <div className={style.container + " mt-5"}>

            <div className={"container py-5  "}>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <ContactForm colorHeading='white' />
                    </div>
                    <div className="col-md-6">
                        <div className={style.imageWrapper}>
                            <img loading='lazy' src={img} alt="person trying to contact" className='w-100  object-fit-cover position-absolute' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
