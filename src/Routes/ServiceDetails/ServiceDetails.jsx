import React, { useContext, useEffect, useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import H2 from '../../Component/Ui/H2/H2'
import { useTranslation } from 'react-i18next';
import { baseURL, getHeaders } from '../../Utilies/data';
import { useParams } from 'react-router-dom';
import style from "./ServiceDetails.module.css"
import H3 from '../../Component/Ui/H3/H3';
import { IsMobileContext } from '../../Context/isMobileContext';
import axios from 'axios';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import ErrorComp from '../../Component/Ui/ErrorComp/ErrorComp';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';

export default function ServiceDetails() {
    const { isMobile } = useContext(IsMobileContext)
    const { t } = useTranslation();
    const { id } = useParams();
    const [displayServicesIndex, setDisplayServicesIndex] = useState(0)
    const [services, setServices] = useState([])
    const [errorFlag, setErrorFlag] = useState(false)
    const [loading, setLoading] = useState(true)

    const getServices = async () => {
        try {

            setLoading(true)
            setErrorFlag(false)
            setServices([]);
            const { data } = await axios.get(baseURL + "/services", {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                if (services[id]) {
                    setDisplayServicesIndex(id)
                }
                setServices(data.data);
                setLoading(false)
            } else {
                setServices([]);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            // setErrorFlag(true)
        }
    };

    useEffect(() => {
        getServices(id)
        setDisplayServicesIndex(id)
    }, [])


    return (
        <section>
            <Heading heading={t("servicesPage.heading")} subHeading={t("servicesPage.subheading")} pageName={t("servicesPage.serviceDetails")} />
            <div className="py-5"></div>
            <H2 text={t("servicesPage.serviceDetails")} />
            {
                (!loading) ? <div className="container ">
                    {
                        errorFlag ?
                            <ErrorComp /> :
                            services.length == 0 ?
                                <NoDataFounded />
                                :
                                <div className="row">
                                    <IndexingPart
                                        t={t}
                                        services={services}
                                        displayServicesIndex={displayServicesIndex}
                                        setDisplayServicesIndex={setDisplayServicesIndex}
                                        isMobile={isMobile}
                                    />
                                    <div className="col-lg-9 col-md-12">
                                        {services[displayServicesIndex] &&
                                            <>

                                                <div className={style["imageWrapper"]}>
                                                    <img src={baseURL + services[displayServicesIndex].imageUrl} alt={services[displayServicesIndex].title} />

                                                </div>
                                                <div className={style["info"] + " p-2"}>
                                                    <h4 className=' my-2'>{services[displayServicesIndex].title}</h4>
                                                    <div className={'mt-4 ' + style.desc}
                                                        dangerouslySetInnerHTML={{
                                                            __html: services[displayServicesIndex].description
                                                        }}></div>

                                                </div>
                                            </>
                                        }
                                    </div>

                                </div>}
                </div> : <Spinner sectionFlag />
            }
        </section>
    )
}
function IndexingPart({ services, displayServicesIndex, t, setDisplayServicesIndex, isMobile }) {
    const [openFlag, setOpenFlag] = useState(!isMobile)
    return (

        <>
            {isMobile &&
                <button className='btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center fs-3 position-fixed start-0 my-5' style={{
                    width: "40px",
                    height: "40px",
                    bottom: "10%"

                }} onClick={() => {
                    setOpenFlag(!openFlag)
                }} > <i class="fa-solid fa-sliders"></i></button>
            }


            {
                openFlag &&
                <div className={"col-lg-3 min-vh-100  " + style.indexingPart} >
                    {isMobile &&
                        <button className='btn btn-danger  rounded-circle border-0 d-flex justify-content-center align-items-center fs-6 position-absolute end-0 top-0 m-2' style={{
                            width: "30px",
                            height: "30px",
                            zIndex: "99999"

                        }} onClick={() => {
                            setOpenFlag(!openFlag)
                        }} > <i class="fa-solid fa-x fw-bolder "></i></button>}
                    <H3 text={t("services")}></H3>
                    {
                        services.map((service, idx) =>
                            <button className={`my-2 d-flex  justify-content-between ${style.option} ${displayServicesIndex == idx ? style.active : ""}`} key={idx}
                                onClick={() => {
                                    setDisplayServicesIndex(idx);
                                    //change the path also
                                    window.history.pushState({}, '', `/services/${idx}`)
                                }}
                            >
                                {service.title}
                            </button>
                        )
                    }
                </div >}
        </>
    )
}