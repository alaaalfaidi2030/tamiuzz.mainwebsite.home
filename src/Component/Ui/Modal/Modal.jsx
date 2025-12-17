import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './Modal.module.css';

export default function Modal({ isOpen, onClose, children, title }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: { duration: 0.3 }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={style.modalOverlay}
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                >
                    <motion.div
                        className={style.modalContent}
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={style.modalHeader}>
                            {title && <h3 className={style.modalTitle}>{title}</h3>}
                            <button
                                className={style.closeButton}
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className={style.modalBody}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
