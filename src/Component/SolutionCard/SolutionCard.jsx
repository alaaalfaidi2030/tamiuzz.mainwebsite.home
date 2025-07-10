import React from 'react'
import style from "./SolutionCard.module.css"
import AboutImage from '../../assets/Images/Home/about-img.png';
import { Link } from 'react-router-dom';

export default function SolutionCard({ title,
    urlPath,
    shortDescription,
    imageUrl,
}) {
    return (
        <div className={"row my-5 " + style.cardContainer}>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <div className={style["imageWrapper"]}>
                    <img src={AboutImage} alt={title} />
                </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center gap-3 flex-column">
                <h3>{title}</h3>
                <p>{shortDescription}...</p>
                <Link className='btn-web btn-web-secondary ' to={"/solution/" + urlPath}> اطلع على المزيد</Link>

            </div>
        </div>
    )
}
