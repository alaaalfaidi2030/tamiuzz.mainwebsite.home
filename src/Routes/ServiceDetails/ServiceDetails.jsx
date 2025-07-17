import React, { useContext, useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import H2 from '../../Component/Ui/H2/H2'
import { useTranslation } from 'react-i18next';
import { baseURL, services } from '../../Utilies/data';
import { useParams } from 'react-router-dom';
import style from "./ServiceDetails.module.css"
import H3 from '../../Component/Ui/H3/H3';
import { IsMobileContext } from '../../Context/isMobileContext';

export default function ServiceDetails() {
    const { isMobile } = useContext(IsMobileContext)
    const { t } = useTranslation();
    const { id } = useParams();
    const [displayServicesIndex, setDisplayServicesIndex] = useState(0)

    return (
        <section>
            <Heading pageName={t("serviceDetails")} />
            <div className="py-5"></div>
            <H2 text={t("serviceDetails")} />
            <div className="container my-5">
                <div className="row">
                    <IndexingPart
                        t={t}
                        services={services}
                        displayServicesIndex={displayServicesIndex}
                        setDisplayServicesIndex={setDisplayServicesIndex}
                        isMobile={isMobile}
                    />
                    <div className="col-md-7">
                        {services[displayServicesIndex] &&
                            <>

                                <div className={style["imageWrapper"]}>
                                    <img src={baseURL + services[displayServicesIndex].imageUrl} alt={services[displayServicesIndex].title} />

                                </div>
                                <div className={style["info"] + " p-2"}>
                                    <h4 className=' my-2'>{services[displayServicesIndex].title}</h4>
                                    <p className='mt-4'>{services[displayServicesIndex].description}</p>

                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
        </section>
    )
}
function IndexingPart({ services, displayServicesIndex, t, setDisplayServicesIndex, isMobile }) {
    const [openFlag, setOpenFlag] = useState(!isMobile)
    return (

        <>
            {isMobile &&
                <button className='btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center fs-3 position-fixed start-0 bottom-0 m-5' style={{
                    width: "50px",
                    height: "50px",

                }} onClick={() => {
                    setOpenFlag(!openFlag)
                }} > <i class="fa-solid fa-sliders"></i></button>
            }


            {
                openFlag &&
                <div className={"col-md-3 min-vh-100  " + style.indexingPart} >

                    <button className='btn btn-outline-danger rounded-circle border-0 d-flex justify-content-center align-items-center fs-4 position-absolute end-0 top-0 m-2' style={{
                        width: "30px",
                        height: "30px",
                        zIndex: "99999"

                    }} onClick={() => {
                        setOpenFlag(!openFlag)
                    }} > <i class="fa-solid fa-x fw-bolder"></i></button>
                    <H3 text={t("services")}></H3>
                    <div className="py-1"></div>
                    {
                        services.map((service, idx) =>
                            <button className={`my-3 d-flex  justify-content-between ${style.option} ${displayServicesIndex == idx ? style.active : ""}`} key={idx} onClick={() =>
                                setDisplayServicesIndex(idx)
                            }>
                                {service.title}
                            </button>
                        )
                    }
                </div >}
        </>
    )
}