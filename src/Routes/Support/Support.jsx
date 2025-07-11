
import Heading from '../../Component/Ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import H2 from '../../Component/Ui/H2/H2';
import styles from './support.module.css';
import { motion } from 'framer-motion';
import { phoneAndEmail } from '../../Utilies/data';
import ContactForm from '../../Component/ContactForm/ContactForm';

export default function Support() {
    const { t } = useTranslation();

    return (
        <section className={styles.supportSection} id="support">
            <Heading pageName={'support'} />

            <H2 text={t('talk with us')} />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <ContactForm />
                    </div>
                    <div className={"col-md-6 d-flex justify-content-center " + styles.info}>

                        <div className={styles.contact}>
                            <motion.h2
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }} transition={{ duration: 0.3, delay: 0.3 }}

                                className={styles.titleHeading}>{t('contact with us')}</motion.h2>

                            {
                                phoneAndEmail.map((item, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={item.link}
                                        initial={{ opacity: 0, y: -100 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        className={styles["contact-item"]}
                                    >
                                        <i className={`fa-solid ${item.icon} ${styles["contact-icon"]}`}></i>
                                        <span dir='ltr'>{item.text}</span>
                                    </motion.a>
                                ))

                            }
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}