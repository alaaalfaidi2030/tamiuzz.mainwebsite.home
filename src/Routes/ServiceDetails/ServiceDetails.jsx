import React, { useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import H2 from '../../Component/Ui/H2/H2'
import { useTranslation } from 'react-i18next';
import { services } from '../../Utilies/data';
import { useParams } from 'react-router-dom';
import style from "./ServiceDetails.module.css"
import H3 from '../../Component/Ui/H3/H3';

export default function ServiceDetails() {
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

                    <div className={"col-md-3 min-vh-100  " + style.indexingPart}>
                        <H3 text={t("services")}></H3>
                        <div className="py-1"></div>
                        {
                            services.map((service, idx) =>
                                <button className={`my-3 d-flex  justify-content-between ${displayServicesIndex == idx ? style.active : ""}`} key={idx} onClick={() =>
                                    setDisplayServicesIndex(idx)
                                }>
                                    {service.title}
                                </button>
                            )
                        }
                    </div>
                    <div className="col-md-7">
                        {services[displayServicesIndex] &&
                            <>

                                <div className={style["imageWrapper"]}>
                                    <img src={services[displayServicesIndex].imageUrl} alt={services[displayServicesIndex].title} />

                                </div>
                                <div className={style["info"]+" p-2"}>
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
