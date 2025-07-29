import { useTranslation } from 'react-i18next';
import ArticleCard from '../../Component/ArticleCard/ArticleCard';
import H2 from '../../Component/Ui/H2/H2';
import Heading from '../../Component/Ui/Heading/Heading';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import ErrorComp from '../../Component/Ui/ErrorComp/ErrorComp';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';
import { baseURL, getHeaders } from '../../Utilies/data';

function Articles() {
    const { t } = useTranslation()
    // const articlesData = [
    //     {
    //         id: 1,
    //         image: '/assets/images/articles/article1.png',
    //         date: '17',
    //         month: 'Feb',
    //         author: 'المشرف',
    //         category: 'خدمات برمجيه',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 2,
    //         image: '/assets/images/articles/article2.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'مصمم واجهة وتجربة المستخدم',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 3,
    //         image: '/assets/images/articles/article3.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'أمن سيبراني',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     }, {
    //         id: 1,
    //         image: '/assets/images/articles/article1.png',
    //         date: '17',
    //         month: 'Feb',
    //         author: 'المشرف',
    //         category: 'خدمات برمجيه',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 2,
    //         image: '/assets/images/articles/article2.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'مصمم واجهة وتجربة المستخدم',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 3,
    //         image: '/assets/images/articles/article3.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'أمن سيبراني',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     }, {
    //         id: 1,
    //         image: '/assets/images/articles/article1.png',
    //         date: '17',
    //         month: 'Feb',
    //         author: 'المشرف',
    //         category: 'خدمات برمجيه',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 2,
    //         image: '/assets/images/articles/article2.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'مصمم واجهة وتجربة المستخدم',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     },
    //     {
    //         id: 3,
    //         image: '/assets/images/articles/article3.png',
    //         date: '20',
    //         month: 'May',
    //         author: 'المشرف',
    //         category: 'أمن سيبراني',
    //         description:
    //             'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
    //         link: '/articles/1'
    //     }
    // ];

    const [articles, setArticles] = useState([])
    const [errorFlag, setErrorFlag] = useState(false)
    const [loading, setLoading] = useState(true)


    const getArticles = async () => {
        try {
            setLoading(true)
            setErrorFlag(false)
            setArticles([]);
            const { data } = await axios.get(baseURL + "/blogs", {
                headers: getHeaders(),
            });
            if (data.success && data.data && data.data.length !== 0) {
                setArticles(data.data);
                setLoading(false)
            } else {
                setArticles([]);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setErrorFlag(true)
        }
    };

    useEffect(() => {
        getArticles()
    }, [])
    return (
        <>
            <Heading pageName={"articles"} />

            {(!loading) ? <>
                <H2 text={t("Top Articles")}> </H2>

                {
                    errorFlag ?
                        <ErrorComp /> :
                        articles.length == 0 ?
                            <NoDataFounded />
                            :
                            <div className="container">

                                <div className='row my-4' style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {

                                        articles.map((article, idx) => (
                                            <ArticleCard idx={idx} key={idx} {...article} />
                                        ))
                                    }
                                </div>
                            </div>
                }
            </> : <Spinner sectionFlag={true} />}
        </>
    );
}
export default Articles;
