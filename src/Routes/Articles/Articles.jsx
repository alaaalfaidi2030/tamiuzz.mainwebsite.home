import { useTranslation } from 'react-i18next';
import sampleImg from '../../assets/Images/Home/about-img.png';
import ArticleCard from '../../Component/ArticleCard/ArticleCard';
import H2 from '../../Component/Ui/H2/H2';
import Heading from '../../Component/Ui/Heading/Heading';

function Articles() {
    const { t } = useTranslation()
    const articlesData = [
        {
            id: 1,
            image: '/assets/images/articles/article1.png',
            date: '17',
            month: 'Feb',
            author: 'المشرف',
            category: 'خدمات برمجيه',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        },
        {
            id: 2,
            image: '/assets/images/articles/article2.png',
            date: '20',
            month: 'May',
            author: 'المشرف',
            category: 'مصمم واجهة وتجربة المستخدم',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        },
        {
            id: 3,
            image: '/assets/images/articles/article3.png',
            date: '20',
            month: 'May',
            author: 'المشرف',
            category: 'أمن سيبراني',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        }, {
            id: 1,
            image: '/assets/images/articles/article1.png',
            date: '17',
            month: 'Feb',
            author: 'المشرف',
            category: 'خدمات برمجيه',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        },
        {
            id: 2,
            image: '/assets/images/articles/article2.png',
            date: '20',
            month: 'May',
            author: 'المشرف',
            category: 'مصمم واجهة وتجربة المستخدم',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        },
        {
            id: 3,
            image: '/assets/images/articles/article3.png',
            date: '20',
            month: 'May',
            author: 'المشرف',
            category: 'أمن سيبراني',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        }, {
            id: 1,
            image: '/assets/images/articles/article1.png',
            date: '17',
            month: 'Feb',
            author: 'المشرف',
            category: 'خدمات برمجيه',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        },
        {
            id: 2,
            image: '/assets/images/articles/article2.png',
            date: '20',
            month: 'May',
            author: 'المشرف',
            category: 'مصمم واجهة وتجربة المستخدم',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        },
        {
            id: 3,
            image: '/assets/images/articles/article3.png',
            date: '20',
            month: 'May',
            author: 'المشرف',
            category: 'أمن سيبراني',
            description:
                'هو مجموعة من الإجراءات والتقنيات المصممة لحماية الأنظمة الرقمية والشبكات والبيانات من الهجمات الإلكترونية والاختراقات.',
            link: '#'
        }
    ];


    return (
        <>
            <Heading pageName={"articles"} />
            <H2 text={t("Top Articles")}> </H2>
            <div className="container">

                <div className='row my-4' style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {

                        articlesData.map((article, idx) => (
                            <ArticleCard idx={idx} key={idx} {...article} image={sampleImg} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}
export default Articles;
