import React from "react";
import styles from "./dotLoader.module.css";

const DotLoader = ({
  dotWidth = 6,
  dotHeight = 6,
}: {
  dotWidth?: number;
  dotHeight?: number;
}) => {
  return (
    <div className={styles.bouncingLoader}>
      <div style={{ width: dotWidth, height: dotHeight }}></div>
      <div style={{ width: dotWidth, height: dotHeight }}></div>
      <div style={{ width: dotWidth, height: dotHeight }}></div>
    </div>
  );
};

export default DotLoader;
