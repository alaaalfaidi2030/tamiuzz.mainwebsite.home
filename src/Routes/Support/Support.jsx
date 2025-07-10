import React from 'react';
import Heading from '../../Component/Ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import H2 from '../../Component/Ui/H2/H2';
import TextInput from '../../Component/Ui/TextInput/TextInput';
import styles from './support.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from '../../Component/Ui/Textarea/Textarea';

export default function Support() {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('الاسم مطلوب'),
            email: Yup.string().email('بريد غير صالح').required('البريد مطلوب'),
            phone: Yup.string().required('رقم الهاتف مطلوب'),
            message: Yup.string().required('الرسالة مطلوبة'),
        }),
        onSubmit: (values) => {
            console.log('Form Submitted', values);
        },
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
                                label="الاسم"
                                name="name"
                                placeholder="الاسم"
                                required
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />

                            <div className="d-flex gap-3 w-100">
                                <TextInput
                                    label="رقم الهاتف"
                                    name="phone"
                                    placeholder="+2345667788"
                                    required
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                                <TextInput
                                    label="البريد الالكتروني"
                                    name="email"
                                    placeholder="info@example.com"
                                    required
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <div className={styles.textareaWrapper}>
                               
                                <TextArea
                                    label={
                                        "رسالتك"

                                    }
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
                    <div className="col-md-6 d-flex justify-content-center">

                        <div className={styles.info}>

                            <div className={styles.contact}>
                                <h2 className={styles.formTitle}>{t('how can we help')}</h2>
                                <p>
                                    <strong>Info@Example.Com</strong> 📧
                                </p>
                                <p>
                                    <strong>+208-6666-0112</strong> 📞
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
