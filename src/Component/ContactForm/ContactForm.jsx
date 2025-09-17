
import TextInput from '../../Component/Ui/TextInput/TextInput';
import styles from './ContactForm.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from '../../Component/Ui/Textarea/Textarea';
import { baseURL, getHeaders } from '../../Utilies/data';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState } from 'react';
export default function ContactForm({ colorHeading = "var(--primary-color)" }) {
    const { t } = useTranslation()
    const [responseFlag, setResponseFlag] = useState(false)
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, t("errors.Must be 3 characters or more"))
            .required(t("errors.Required")),

        email: Yup.string()
            .email(t("errors.Invalid email address"))
            .required(t("errors.Required")),

        phone: Yup.string().required(t("errors.Required")),

        message: Yup.string()
            .min(10, t("errors.Must be 10 characters or more"))
            .required(t("errors.Required")),
    });



    // send message to the server

    const sendMessage = async (values) => {
        let userData = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            message: values.message,
        };
        console.log(userData);

        setResponseFlag(true);

        try {
            const { data } = await axios.post(baseURL + "/home/contact-us", userData, {
                headers: getHeaders(),
            });
            console.log(data);


            if (data.code && data.code === 200) {
                Swal.fire({
                    title: t("success.Success"),
                    text: t("success.message sent successfully"),
                    icon: "success",
                    confirmButtonText: t("success.OK"),
                });
            } else {
                Swal.fire({
                    title: t("errors.Error"),
                    text: t("errors.Something went wrong, please try again later"),
                    icon: "error",
                    confirmButtonText: t("success.OK"),
                });
            }
        } catch (error) {
            console.error("There was an error sending the message:", error);
            Swal.fire({
                title: t("errors.Error"),
                text: t("errors.Something went wrong, please try again later"),
                icon: "error",
                confirmButtonText: t("success.OK"),
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
        <form onSubmit={formik.handleSubmit}  >

            <motion.h2
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }} transition={{ duration: 0.3, delay: 0.3 }}
                style={{
                    color: colorHeading
                }}
                className={styles.formTitle}>{t('supportPage.how can we help')}</motion.h2>
            <TextInput

                error={formik.errors["name"]}
                touched={formik.touched["name"]}
                idx={0}
                label={t("form.name")}
                name="name"
                placeholder={t("form.name")}
                required
                value={formik.values.name}
                onChange={formik.handleChange}
            />

            <div className="row g-3" >
                <div className="col-md-6 ">

                    <TextInput

                        error={formik.errors["phone"]}
                        touched={formik.touched["phone"]}
                        idx={1}
                        label={t("form.phone")}
                        name="phone"
                        placeholder="+2345667788"
                        required
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="col-md-6 ">

                    <TextInput

                        error={formik.errors["email"]}
                        touched={formik.touched["email"]}
                        idx={2}
                        label={t("form.email")}
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
                    label={t("form.message")}
                    id="message"
                    name="message"
                    placeholder={t("form.message_placeholder")}
                    required
                    error={formik.errors["message"]}
                    touched={formik.touched["message"]}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                />

            </div>

            <button type="submit" className={styles.button} disabled={responseFlag}>
                {
                    responseFlag ?
                        <i className='fa-solid fa-spinner fa-spin'></i>
                        : t('supportPage.send')

                }
            </button>
        </form>
    )
}
