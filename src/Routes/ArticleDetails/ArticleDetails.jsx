import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom';
import H3 from '../../Component/Ui/H3/H3';
import style from "./ArticleDetails.module.css"
import axios from 'axios';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import { baseURL, getHeaders } from '../../Utilies/data';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';

export default function ArticleDetails() {
    const { t } = useTranslation();
    const { id } = useParams()
    const navigate = useNavigate();
    const [articleDetails, setArticleDetails] = useState(null)
    const [noDataFounded, setNoDataFounded] = useState(false)
    const [loading, setLoading] = useState(true)


    const getArticlesDetails = async () => {
        try {
            setLoading(true)
            setNoDataFounded(false)
            setArticleDetails(null);
            const { data } = await axios.get(baseURL + "/blog/" + id, {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                setArticleDetails(data.data);
                setLoading(false)
            } else {
                setArticleDetails(null);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setNoDataFounded(true)
        }
    };

    useEffect(() => {
        getArticlesDetails()
    }, [])
    useEffect(() => {
        if (!id) {
            navigate("/articles")
        }

    }, [])

    return (<>

        <Heading pageName={t("article details")} />

        <div className={"container " + style.content}>
            {(!loading) ?
                noDataFounded ?

                    <NoDataFounded /> : <>

                        <div className="my-5">
                            <H3 text={articleDetails.title} />
                        </div>


                        {
                            articleDetails?.sections?.map((section, idx) =>
                                <div key={idx} className="row">
                                    <p >{section.content}</p>
                                    {
                                        section.imageUrl && <div className="w-100">
                                            <img src={section.imageUrl} alt={section.title} />

                                        </div>
                                    }

                                </div>
                            )
                        }
                    </> : <Spinner sectionFlag={true} />}

        </div>


    </>
    )
}
