import React, { useContext } from "react";
import img from "/logo.svg";
import whiteLogo from "/logo-white.svg";

import { isThemeModeContext } from "../../../Context/isThemeModeContext";
export default function HomeLoading() {
  const { isDarkMode } = useContext(isThemeModeContext);

  return (
    <div
      className="position-fixed top-0 start-0 bottom-0 end-0 w-100 d-flex justify-content-center align-items-center "
      style={{
        backgroundColor: "var(--bg-color)",
        zIndex: "10000000",
      }}
    >
      <img
        src={isDarkMode ? whiteLogo : img}
        alt="logo "
        className="fa-beat-fade"
        style={{
          width: "200px",
          height: "200px",
        }}
      />
    </div>
  );
}
