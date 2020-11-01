import React from "react";
import { useContent } from "react-ssg";
import styles from "./StatusBadge.module.css";

export const StatusBadge = ({ value }) => {
  const dict = useContent("/StatusBadge.yml");
  const { color, text } = dict[value] || dict.fallback;
  return (
    <span>
      <span className={styles.dot} style={{ backgroundColor: color }}/> {text}
    </span>
  );
};
