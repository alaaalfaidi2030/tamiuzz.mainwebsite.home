import { useEffect, useState, useId } from "react";
import { motion } from "framer-motion";
import styles from "./TextInput.module.css";

const SHAKE_VARIANTS = {
  shake: {
    x: [-8, 8, -8, 8, -4, 4, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  normal: { x: 0 },
};

const TextInput = ({
  idx = 0,
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  animationFlag = true,
  autoComplete,
}) => {
  const [shouldShake, setShouldShake] = useState(false);
  const generatedId = useId();
  const inputId = name || generatedId;
  const errorId = `${inputId}-error`;

  const hasError = error && touched;
  const isValid = touched && !error && value;

  useEffect(() => {
    if (hasError) {
      setShouldShake(true);
      const timer = setTimeout(() => setShouldShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  const inputClassName = [
    styles.input,
    hasError && styles.inputError,
    isValid && styles.inputSuccess,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        ...(shouldShake ? SHAKE_VARIANTS.shake : SHAKE_VARIANTS.normal),
      }}
      transition={{
        duration: animationFlag ? 0.4 : 0,
        delay: animationFlag ? 0.1 + idx * 0.08 : 0,
      }}
      className={styles.inputWrapper}
    >
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className={styles.inputContainer}>
        <input
          id={inputId}
          name={name}
          type={type}
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? errorId : undefined}
        />
      </div>

      {hasError && (
        <div id={errorId} className={styles.errorMessage} role="alert">
          <i className={`fa-solid fa-circle-exclamation ${styles.errorIcon}`} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </motion.div>
  );
};

export default TextInput;
