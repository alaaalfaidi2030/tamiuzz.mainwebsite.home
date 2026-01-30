import React from 'react';
import Heading from '../../Component/Ui/Heading/Heading';
import { useTranslation } from 'react-i18next';
import SEO from '../../Component/SEO/SEO';
import { motion } from 'framer-motion';
import style from './Policy.module.css';

const ANIMATION_VARIANTS = {
    fadeInUp: {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15
            },
        },
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    },
    staggerItem: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            },
        },
    },
};

export default function Policy() {
    const { t } = useTranslation();

    return (
        <section className={style.privacySection}>
            <SEO
                title={t("seo.policy.title", "سياسة الخصوصية - شركة تميّز | Tamiuzz Privacy Policy")}
                description={t("seo.policy.description", "سياسة الخصوصية لشركة تميّز للحلول الرقمية. تعرّف على كيفية جمع واستخدام وحماية بياناتك الشخصية.")}
            />

            {/* Floating Decorative Shapes */}
            <motion.div
                className={style.floatingShape1}
                animate={{
                    y: [0, -28, 0],
                    x: [0, 22, 0],
                    rotate: [0, 9, 0]
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape2}
                animate={{
                    y: [0, 30, 0],
                    x: [0, -20, 0],
                    scale: [1, 1.12, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={style.floatingShape3}
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, -8, 0]
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <Heading pageName={"privacy_policy"} />

            <motion.div
                className={style.policyContent}
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className={style.contentGlow} />

                <motion.p variants={ANIMATION_VARIANTS.staggerItem}>
                    في شركة تميز، نلتزم بحماية خصوصية معلوماتك الشخصية، ونوضح في هذه السياسة كيف نقوم بجمع واستخدام وحماية البيانات التي يتم جمعها من زوار موقعنا.
                </motion.p>

                <motion.div variants={ANIMATION_VARIANTS.staggerItem}>
                    <h3>1. جمع المعلومات</h3>
                    <p>نقوم بجمع المعلومات التالية عند استخدامك لموقعنا:</p>
                    <ul>
                        <li>معلومات اتصال مثل البريد الإلكتروني ورقم الهاتف.</li>
                        <li>معلومات تقنية مثل عنوان IP، نوع المتصفح، الصفحات التي تزورها، ومدة الاستخدام.</li>
                        <li>أي معلومات تقدمها طوعاً عبر النماذج أو استفسارات الدعم.</li>
                    </ul>
                </motion.div>

                <motion.div variants={ANIMATION_VARIANTS.staggerItem}>
                    <h3>2. استخدام المعلومات</h3>
                    <p>نستخدم البيانات التي نجمعها للأغراض التالية:</p>
                    <ul>
                        <li>تحسين تجربة المستخدم على الموقع.</li>
                        <li>الرد على الاستفسارات وتقديم الدعم الفني.</li>
                        <li>إرسال التحديثات أو العروض في حال الموافقة على ذلك.</li>
                        <li>تحليل أداء الموقع وتطوير خدماتنا.</li>
                    </ul>
                </motion.div>

                <motion.div variants={ANIMATION_VARIANTS.staggerItem}>
                    <h3>3. حماية البيانات</h3>
                    <p>نتخذ كافة الإجراءات التقنية والتنظيمية المناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الفقد أو التلف.</p>
                </motion.div>

                <motion.div variants={ANIMATION_VARIANTS.staggerItem}>
                    <h3>4. مشاركة المعلومات</h3>
                    <p>لا نقوم ببيع أو مشاركة بياناتك الشخصية مع أي جهة خارجية، باستثناء الحالات التي يتطلبها القانون أو بموافقتك المسبقة.</p>
                    <p>نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك. يمكنك التحكم في تفعيل أو تعطيل الكوكيز من خلال إعدادات المتصفح.</p>
                </motion.div>

                <motion.div variants={ANIMATION_VARIANTS.staggerItem}>
                    <h3>5. حقوقك</h3>
                    <p>يحق لك:</p>
                    <ul>
                        <li>طلب الاطلاع على بياناتك الشخصية التي نحتفظ بها.</li>
                        <li>طلب تعديل أو حذف معلوماتك.</li>
                        <li>سحب موافقتك في أي وقت.</li>
                    </ul>
                </motion.div>

                <motion.div variants={ANIMATION_VARIANTS.staggerItem}>
                    <h3>6. التعديلات</h3>
                    <p>قد نقوم بتحديث سياسة الخصوصية من وقت لآخر، وسيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ آخر تعديل.</p>
                    <p>تاريخ التحديث: 20 يونيو 2025</p>
                </motion.div>
            </motion.div>
        </section>
    );
}
