import React from "react";
import { useSSRContent } from "../useSSRContent";
import styles from "./StatusBadge.module.css";

export const StatusBadge = ({ value }) => {
  const dict = useSSRContent("/StatusBadge.yml");
  const { color, text } = dict[value] || dict.fallback;
  return (
    <span>
      <span className={styles.dot} style={{ backgroundColor: color }}/> {text}
    </span>
  );
};
