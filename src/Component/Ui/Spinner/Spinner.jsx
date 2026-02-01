import style from "./Spinner.module.css";

export default function Spinner({ sectionFlag = true, size = "default" }) {
  return (
    <div
      className={`${style.spinnerContainer} ${sectionFlag ? style.fullSection : style.inline}`}
      role="status"
      aria-label="Loading"
    >
      <div className={`${style.spinner} ${style[size]}`}>
        {/* Outer Ring */}
        <div className={style.outerRing} aria-hidden="true" />

        {/* Inner Ring */}
        <div className={style.innerRing} aria-hidden="true" />

        {/* Center Dot */}
        <div className={style.centerDot} aria-hidden="true" />

        {/* Orbiting Dots */}
        <div className={style.orbitContainer} aria-hidden="true">
          <span className={style.orbitDot} />
          <span className={style.orbitDot} />
          <span className={style.orbitDot} />
        </div>
      </div>

      {/* Ambient Glow */}
      <div className={style.ambientGlow} aria-hidden="true" />
    </div>
  );
}
