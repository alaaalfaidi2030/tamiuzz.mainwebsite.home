import React from 'react'
import H2 from '../Ui/H2/H2'
import H3 from '../Ui/H3/H3'
import image from "../../assets/Images/HowWeWorkAr.png"
// continue next time 
export default function HowWeWork() {
    return (
        <>
            <H2 text={"كيف نعمل"} />
            <H3 text={"خطوات العمل معنا"} />
            <div className="w-100 d-flex justify-content-center my-5">
                <img src={image} className=' my-5' alt="work Steps" style={{ width: "90%" }} />

            </div>
        </>
    )
}
