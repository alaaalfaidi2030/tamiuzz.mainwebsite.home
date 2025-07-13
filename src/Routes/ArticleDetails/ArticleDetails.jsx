import React, { useState } from 'react'
import Heading from '../../Component/Ui/Heading/Heading'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import H3 from '../../Component/Ui/H3/H3';
import style from "./ArticleDetails.module.css"

export default function ArticleDetails() {
    const { t } = useTranslation();
    const { id } = useParams()
    const [articleDetails, setArticleDetails] = useState({

        "sections": [
            {
                "title": "حدد أهدافك",
                "content": "ابدأ بتحديد أهداف واقعية.",
                "imageUrl": null
            }
        ],
        "time": "2025-05-27T11:17:56.1488557",
        "tags": [
            "تحفيز",
            "تطوير"
        ],
        "urlPath": "personal-growth",
        "title": "نصائح للنمو الشخصي",
        "imageUrl": "/images/blogs/growth.jpg",
        "author": "ياسين"

    })
    return (<>

        <Heading pageName={t("article details")} />

        <div className="my-5">
            <H3 text={articleDetails.title} />
        </div>

        <div className={"container " + style.content}>

            {
                articleDetails.sections.map((section, idx) =>
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
        </div>



    </>
    )
}
