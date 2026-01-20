import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import TextInput from "../Ui/TextInput/TextInput";
import Textarea from "../Ui/Textarea/Textarea";
import { baseURL, getHeaders } from "../../Utilies/data";
import styles from "./ContactForm.module.css";

const ContactForm = ({ variant = "default" }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDark = variant === "dark";

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
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
      }),
    [t]
  );

  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      setIsSubmitting(true);

      try {
        const { data } = await axios.post(
          `${baseURL}/home/contact-us`,
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
            message: values.message,
          },
          { headers: getHeaders() }
        );

        if (data.code === 200) {
          Swal.fire({
            title: t("success.Success"),
            text: t("success.message sent successfully"),
            icon: "success",
            confirmButtonText: t("success.OK"),
          });
          resetForm();
        } else {
          Swal.fire({
            title: t("errors.Error"),
            text: t("errors.Something went wrong, please try again later"),
            icon: "error",
            confirmButtonText: t("success.OK"),
          });
        }
      } catch (error) {
        console.error("Contact form submission error:", error);
        Swal.fire({
          title: t("errors.Error"),
          text: t("errors.Something went wrong, please try again later"),
          icon: "error",
          confirmButtonText: t("success.OK"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [t]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const containerClass = isDark ? styles.formContainerDark : styles.formContainer;
  const titleClass = isDark ? styles.formTitleDark : styles.formTitle;
  const buttonClass = isDark ? styles.submitButtonDark : styles.submitButton;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={containerClass}
      noValidate
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={titleClass}
      >
        {t("supportPage.how can we help")}
      </motion.h2>

      <TextInput
        idx={0}
        label={t("form.name")}
        name="name"
        placeholder={t("form.name")}
        required
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.name}
        touched={formik.touched.name}
        disabled={isSubmitting}
        autoComplete="name"
      />

      <div className={styles.formRow}>
        <TextInput
          idx={1}
          label={t("form.phone")}
          name="phone"
          type="tel"
          placeholder="+966 5XX XXX XXXX"
          required
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phone}
          touched={formik.touched.phone}
          disabled={isSubmitting}
          autoComplete="tel"
        />

        <TextInput
          idx={2}
          label={t("form.email")}
          name="email"
          type="email"
          placeholder="info@example.com"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          disabled={isSubmitting}
          autoComplete="email"
        />
      </div>

      <div className={styles.textareaWrapper}>
        <Textarea
          idx={3}
          label={t("form.message")}
          name="message"
          placeholder={t("form.message_placeholder")}
          required
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.message}
          touched={formik.touched.message}
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        className={buttonClass}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            <span>{t("supportPage.sending")}</span>
          </>
        ) : (
          <>
            <span>{t("supportPage.send")}</span>
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
