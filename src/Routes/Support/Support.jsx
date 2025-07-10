import React from 'react';
import Heading from '../../Component/Ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import H2 from '../../Component/Ui/H2/H2';
import TextInput from '../../Component/Ui/TextInput/TextInput';
import styles from './support.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from '../../Component/Ui/Textarea/Textarea';
import { baseURL, phoneAndEmail } from '../../Utilies/data';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function Support() {
    const { t } = useTranslation();
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, t("Must be 3 characters or more"))
            .required(t("Required")),

        email: Yup.string()
            .email(t("Invalid email address"))
            .required(t("Required")),

        phone: Yup.string().required(t("Required")),

        message: Yup.string()
            .min(10, t("Must be 10 characters or more"))
            .required(t("Required")),
    });



    // send message to the server

    const sendMessage = async (values) => {
        let userData = JSON.stringify({
            Name: values.name,
            Email: values.email,
            Phone: values.phonNumber,
            Message: values.message,
        });

        setResponseFlag(true);

        try {
            const { data } = await axios.post(baseURL + "/contact-us", data, config);


            if (data.code && data.code === 200) {
                Swal.fire({
                    title: t("Success"),
                    text: t("message sent successfully"),
                    icon: "success",
                    button: t("Ok"),
                });
            } else {
                Swal.fire({
                    title: t("Error"),
                    text: t("Something went wrong, please try again later"),
                    icon: "error",
                    button: t("Ok"),
                });
            }
        } catch (error) {
            console.error("There was an error sending the message:", error);
            Swal.fire({
                title: t("Error"),
                text: t("Something went wrong, please try again later"),
                icon: "error",
                button: t("Ok"),
            });
        } finally {
            setResponseFlag(false);
        }
    };
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: validationSchema,
        onSubmit: sendMessage
    });

    return (
        <section className={styles.supportSection} id="support">
            <Heading pageName={t('support')} />

            <H2 text={t('talk with us')} />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <form onSubmit={formik.handleSubmit} className={styles.form}>

                            <TextInput
                                idx={0}
                                label="الاسم"
                                name="name"
                                placeholder="الاسم"
                                required
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />

                            <div className="row g-3" >
                                <div className="col-md-6 ">

                                    <TextInput
                                        idx={1}
                                        label="رقم الهاتف"
                                        name="phone"
                                        placeholder="+2345667788"
                                        required
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div className="col-md-6 ">

                                    <TextInput
                                        idx={2}
                                        label="البريد الالكتروني"
                                        name="email"
                                        placeholder="info@example.com"
                                        required
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                            </div>

                            <div className={styles.textareaWrapper}>

                                <TextArea
                                    idx={3}
                                    label={"رسالتك"}
                                    id="message"
                                    name="message"
                                    placeholder="اكتب رسالتك"
                                    required
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                />

                            </div>

                            <button type="submit" className={styles.button}>
                                {t('send')}
                            </button>
                        </form>
                    </div>
                    <div className={"col-md-6 d-flex justify-content-center " + styles.info}>

                        <div className={styles.contact}>
                            <h2 className={styles.formTitle}>{t('how can we help')}</h2>

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
        </section>
    );
}