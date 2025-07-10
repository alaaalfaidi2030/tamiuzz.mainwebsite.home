import React from 'react';
import styles from './textInput.module.css';

export default function TextInput({ label, name, required = false, placeholder = '', value, onChange, error, touched }) {
    return (
        <div className={styles.inputWrapper}>
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
