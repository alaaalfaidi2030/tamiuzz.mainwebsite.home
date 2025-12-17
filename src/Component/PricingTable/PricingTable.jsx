
import React from 'react';
import { motion } from 'framer-motion';
import style from './PricingTable.module.css';
import { useTranslation } from 'react-i18next';
import H2 from '../Ui/H2/H2';

export default function PricingTable({ features, plans }) {
    const { t } = useTranslation();

    if (!features || !plans || features.length === 0 || plans.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.08
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const renderValue = (value, valueType) => {
        if (valueType === 'Boolean') {
            if (value === 'true' || value === true) {
                return <i className="fa-solid fa-check" style={{ color: 'var(--primary-color)', fontSize: '1.2em' }}></i>;
            }
            return <i className="fa-solid fa-xmark" style={{ color: '#cbd5e1', fontSize: '1.2em' }}></i>;
        }
        if (valueType === 'Number' && (!value || value === '')) {
            return <span className={style.emptyValue}>—</span>;
        }
        return <span className={style.textValue}>{value || '—'}</span>;
    };

    return (
        <motion.div
            className={style.pricingTableWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <H2 text={t('solutionPage.plans') || 'Features'} />
            <div className={style.tableContainer}>
                <div className={style.tableScroll}>
                    <table className={style.pricingTable}>
                        <thead>
                            <tr>
                                <th className={style.featureHeader}>
                                    <span>{t('solutionPage.features') || 'الميزات'}</span>
                                </th>
                                {plans.map((plan, idx) => (
                                    <th key={plan.id} className={style.planHeader}>
                                        <div className={style.planTitle}>
                                            <span className={style.planName}>{plan.title}</span>
                                            {idx === 1 && <span className={style.popularBadge}>{t('solutionPage.popular') || 'الأكثر شعبية'}</span>}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature) => (
                                <tr key={feature.id}>
                                    <td className={style.featureCell}>
                                        <span className={style.featureName}>{feature.title}</span>
                                    </td>
                                    {plans.map((plan) => {
                                        const featureValue = plan.featureValues.find(
                                            fv => fv.featureId === feature.id
                                        );
                                        return (
                                            <td key={`${plan.id}-${feature.id}`} className={style.valueCell}>
                                                {featureValue ? renderValue(featureValue.value, featureValue.valueType) : '—'}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
