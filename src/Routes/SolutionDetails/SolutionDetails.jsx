import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import Heading from '../../Component/Ui/Heading/Heading';
import H2 from '../../Component/Ui/H2/H2';
import NoDataFounded from '../../Component/Ui/NoDataFounded/NoDataFounded';
import Spinner from '../../Component/Ui/Spinner/Spinner';
import PricingTable from '../../Component/PricingTable/PricingTable';
import Modal from '../../Component/Ui/Modal/Modal';
import { baseURL, getHeaders } from '../../Utilies/data';

import SEO from '../../Component/SEO/SEO';
import styles from './SolutionDetails.module.css';

// Animation Variants
const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },
  fadeInScale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }
};

// Section Image Component
const SectionImage = ({ src, alt, isOdd }) => (
  <motion.div
    className="col-md-6 d-flex justify-content-center"
    variants={isOdd ? animations.slideInRight : animations.slideInLeft}
  >
    <div className={styles.imageWrapper}>
      <img
        loading="lazy"
        src={src}
        className="w-100 rounded-4"
        alt={alt}
      />
    </div>
  </motion.div>
);

// Section Content Component
const SectionContent = ({ title, description }) => (
  <motion.div
    className={`col-md-6 ${styles.info}`}
    variants={animations.fadeInUp}
  >
    <h3>{title}</h3>
    <div
      className={styles.desc}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </motion.div>
);

// Action Buttons Component
const ActionButtons = ({ solutionDetails, onOpenModal, t }) => {
  const hasFeatures = solutionDetails.features && solutionDetails.plans;
  const hasProfile = solutionDetails.profileUrl;
  const hasDownload = solutionDetails.downloadUrl;

  if (!hasFeatures && !hasProfile && !hasDownload) return null;

  return (
    <motion.div
      className={styles.flatBtnGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={animations.staggerContainer}
    >
      {hasFeatures && (
        <motion.button
          variants={animations.fadeInUp}
          onClick={onOpenModal}
          className={`${styles.flatBtn} ${styles.flatPricing}`}
          title={t('solutionPage.view_pricing')}
          aria-label={t('solutionPage.view_pricing')}
        >
          <i className="fa-solid fa-table" aria-hidden="true" />
          <span>{t('solutionPage.view_pricing')}</span>
        </motion.button>
      )}

      {hasProfile && (
        <motion.a
          variants={animations.fadeInUp}
          href={solutionDetails.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.flatBtn} ${styles.flatProfile}`}
          title={t('solutionPage.download_profile')}
        >
          <i className="fa-solid fa-file" aria-hidden="true" />
          <span>{t('solutionPage.download_profile')}</span>
        </motion.a>
      )}

      {hasDownload && (
        <motion.a
          variants={animations.fadeInUp}
          href={solutionDetails.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.flatBtn} ${styles.flatDownload}`}
          title={t('solutionPage.download_document')}
        >
          <i className="fa-solid fa-download" aria-hidden="true" />
          <span>{t('solutionPage.download_document')}</span>
        </motion.a>
      )}
    </motion.div>
  );
};

// Floating Download Links Component
const FloatingDownloadLinks = ({ solutionDetails, t }) => {
  const hasProfile = solutionDetails.profileUrl;
  const hasDownload = solutionDetails.downloadUrl;
  const hasPricing = solutionDetails.features && solutionDetails.plans;

  if (!hasProfile && !hasDownload && !hasPricing) return null;

  return (
    <aside 
      className={styles.floatingPanel} 
      aria-label={t('solutionPage.download_section')}
    >
      <motion.div
        className={styles.floatingPanelInner}
        initial="hidden"
        animate="visible"
        variants={animations.staggerContainer}
      >
        {hasPricing && (
          <motion.a
            variants={animations.slideInLeft}
            href="#pricing"
            className={styles.floatingBtn}
            title={t('solutionPage.view_pricing')}
            aria-label={t('solutionPage.view_pricing')}
          >
            <span className={styles.floatingBtnIcon}>
              <i className="fa-solid fa-table" aria-hidden="true" />
            </span>
            <span className={styles.floatingBtnContent}>
              <span className={styles.floatingBtnLabel}>{t('solutionPage.view_pricing')}</span>
              <span className={styles.floatingBtnHint}>{t('solutionPage.compare_plans')}</span>
            </span>
            <span className={styles.floatingBtnArrow}>
              <i className="fa-solid fa-chevron-right" aria-hidden="true" />
            </span>
          </motion.a>
        )}

        {hasProfile && (
          <motion.a
            variants={animations.slideInLeft}
            href={solutionDetails.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.floatingBtn}
            title={t('solutionPage.download_profile')}
            aria-label={t('solutionPage.download_profile')}
          >
            <span className={styles.floatingBtnIcon}>
              <i className="fa-solid fa-file-pdf" aria-hidden="true" />
            </span>
            <span className={styles.floatingBtnContent}>
              <span className={styles.floatingBtnLabel}>{t('solutionPage.download_profile')}</span>
              <span className={styles.floatingBtnHint}>{t('solutionPage.pdf_format')}</span>
            </span>
            <span className={styles.floatingBtnArrow}>
              <i className="fa-solid fa-external-link" aria-hidden="true" />
            </span>
          </motion.a>
        )}

        {hasDownload && (
          <motion.a
            variants={animations.slideInLeft}
            href={solutionDetails.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.floatingBtn} ${styles.floatingBtnDownload}`}
            title={t('solutionPage.download_document')}
            aria-label={t('solutionPage.download_document')}
          >
            <span className={styles.floatingBtnIcon}>
              <i className="fa-solid fa-download" aria-hidden="true" />
            </span>
            <span className={styles.floatingBtnContent}>
              <span className={styles.floatingBtnLabel}>{t('solutionPage.download_document')}</span>
              <span className={styles.floatingBtnHint}>{t('solutionPage.full_details')}</span>
            </span>
            <span className={styles.floatingBtnArrow}>
              <i className="fa-solid fa-arrow-down" aria-hidden="true" />
            </span>
          </motion.a>
        )}
      </motion.div>
    </aside>
  );
};

// Pricing Modal Component
const PricingModal = ({ isOpen, onClose, solutionDetails, t }) => {
  const hasFeatures = solutionDetails?.features && solutionDetails?.plans;
  const hasProfile = solutionDetails?.profileUrl;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('solutionPage.pricing_modal_title')}
    >
      {hasFeatures && (
        <PricingTable
          features={solutionDetails.features}
          plans={solutionDetails.plans}
        />
      )}

      {hasProfile && (
        <div className={styles.modalDownloadSection}>
          <a
            href={solutionDetails.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.flatBtn} ${styles.flatDownload}`}
            aria-label={t('solutionPage.download_profile')}
          >
            <i className="fa-solid fa-download" aria-hidden="true" />
            <span>{t('solutionPage.download_profile')}</span>
          </a>
        </div>
      )}
    </Modal>
  );
};

// Main Component
export default function SolutionDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [solutionDetails, setSolutionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handlers
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Fetch solution details
  const fetchSolutionDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      setSolutionDetails(null);

      const { data } = await axios.get(`${baseURL}/solutions/${id}`, {
        headers: getHeaders()
      });

      if (data.success && data.data && data.data.length !== 0) {
        setSolutionDetails(data.data);
      } else {
        setSolutionDetails(null);
      }
    } catch (error) {
      console.error('Failed to fetch solution details:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Effect to fetch data or redirect
  useEffect(() => {
    if (id) {
      fetchSolutionDetails();
    } else {
      navigate('/solutions');
    }
  }, [id, fetchSolutionDetails, navigate]);

  // Memoized values
  const hasPricing = useMemo(() =>
    solutionDetails?.features && solutionDetails?.plans,
    [solutionDetails]
  );

  // Render loading state
  if (isLoading) {
    return (
      <>
        <Heading
          heading={t('solutionPage.heading')}
          subHeading={t('solutionPage.subheading')}
          pageName={t('solutionPage.solution details')}
        />
        <Spinner sectionFlag />
      </>
    );
  }

  // Render error state
  if (hasError || !solutionDetails) {
    return (
      <>
        <Heading
          heading={t('solutionPage.heading')}
          subHeading={t('solutionPage.subheading')}
          pageName={t('solutionPage.solution details')}
        />
        <div className="container py-5">
          <NoDataFounded />
        </div>
      </>
    );
  }

  // Render content
  return (
    <>
      <SEO
        title={`${solutionDetails.title} - Tamiuzz`}
        description={solutionDetails.sections?.[0]?.description?.replace(/<[^>]*>/g, "").slice(0, 160) || t("seo.solutions.description", "حلول تميّز الرقمية المتكاملة")}
      />
      <Heading
        heading={t('solutionPage.heading')}
        subHeading={t('solutionPage.subheading')}
        pageName={t('solutionPage.solution details')}
      />

      <main className="container my-4">
        {/* Page Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
        >
          <H2 text={solutionDetails.title} />
        </motion.div>

        {/* Sections */}
        <AnimatePresence>
          {solutionDetails.sections.map((section, index) => {
            const isOdd = index % 2 !== 0;
            const isLastSection = index === solutionDetails.sections.length - 1;

            return (
              <React.Fragment key={section.id || index}>
                <motion.section
                  className={`row g-5 my-4 py-4 ${styles.cardContainer}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={animations.staggerContainer}
                  aria-labelledby={`section-title-${index}`}
                >
                  <SectionImage
                    src={section.images[0]}
                    alt={section.title}
                    isOdd={isOdd}
                  />
                  <SectionContent
                    title={section.title}
                    description={section.description}
                  />
                </motion.section>

                {/* Action Buttons between sections */}
                {!isLastSection && (
                  <ActionButtons
                    solutionDetails={solutionDetails}
                    onOpenModal={openModal}
                    t={t}
                  />
                )}
              </React.Fragment>
            );
          })}
        </AnimatePresence>

        {/* Pricing Table Section */}
        {hasPricing && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={animations.fadeInScale}
            aria-label={t('solutionPage.pricing_section')}
          >
            <PricingTable
              features={solutionDetails.features}
              plans={solutionDetails.plans}
            />
          </motion.section>
        )}
      </main>

      {/* Floating Download Links */}
      <FloatingDownloadLinks solutionDetails={solutionDetails} t={t} />

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        solutionDetails={solutionDetails}
        t={t}
      />
    </>
  );
}
