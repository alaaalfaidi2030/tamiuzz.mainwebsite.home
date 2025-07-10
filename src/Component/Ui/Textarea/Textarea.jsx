import React from 'react';
import styles from './Textarea.module.css'; // Reuse same styles

export default function TextArea({ label, name, required = false, placeholder = '', value, onChange, error, touched }) {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={name} className={styles.label}>
                {label} {required && <span className={styles.required}> *</span>}
            </label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${styles.textarea}`}
                required={required}
            />
            {
                error && touched &&
                <div className="text-danger text-center">
                    {error}
                </div>
            }
        </div>
    );
}
