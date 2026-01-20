import { useEffect, useState, useId } from "react";
import { motion } from "framer-motion";
import styles from "./Textarea.module.css";

const SHAKE_VARIANTS = {
  shake: {
    x: [-8, 8, -8, 8, -4, 4, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  normal: { x: 0 },
};

const Textarea = ({
  idx = 0,
  label,
  name,
  required = false,
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  animationFlag = true,
  rows = 5,
  maxLength,
}) => {
  const [shouldShake, setShouldShake] = useState(false);
  const generatedId = useId();
  const textareaId = name || generatedId;
  const errorId = `${textareaId}-error`;

  const hasError = error && touched;
  const isValid = touched && !error && value;

  useEffect(() => {
    if (hasError) {
      setShouldShake(true);
      const timer = setTimeout(() => setShouldShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  const textareaClassName = [
    styles.textarea,
    hasError && styles.textareaError,
    isValid && styles.textareaSuccess,
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
      <label htmlFor={textareaId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className={styles.textareaContainer}>
        <textarea
          id={textareaId}
          name={name}
          className={textareaClassName}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          rows={rows}
          maxLength={maxLength}
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

export default Textarea;
