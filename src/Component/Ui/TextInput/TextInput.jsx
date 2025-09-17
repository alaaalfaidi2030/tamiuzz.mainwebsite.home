import { useEffect, useState } from 'react';
import styles from './textInput.module.css';
import { motion } from 'framer-motion';

export default function TextInput({ idx = 0, label, name, required = false, placeholder = '', value, onChange, error, touched, animationFlag = true }) {
    const [shouldShake, setShouldShake] = useState(false);


    // Trigger shake animation when error appears
    useEffect(() => {
        if (error && touched) {
            setShouldShake(true);
            // Reset shake after animation completes
            const timer = setTimeout(() => setShouldShake(false), 600);
            return () => clearTimeout(timer);
        }
    }, [error, touched, name]);

    // Shake animation variants
    const shakeVariants = {
        shake: {
            x: [-10, 10, -10, 10, -5, 5, 0],
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        },
        normal: {
            x: 0
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
                opacity: 1,
                y: 0,
                ...(shouldShake ? shakeVariants.shake : shakeVariants.normal)
            }}
            transition={{
                duration: animationFlag ? 0.5 : 0,
                delay: animationFlag ? 0.4 + idx * 0.1 : 0,
            }}
            className={styles.inputWrapper}>
            <label htmlFor={name} className={styles.label}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>
            <input
                id={name}
                name={name}
                type="text"
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {
                error && touched &&
                <div className="text-danger text-center">
                    {error}

                </div>
            }
        </motion.div>
    );
}
