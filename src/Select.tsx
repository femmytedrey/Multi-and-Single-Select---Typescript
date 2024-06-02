import { useState } from "react";
import styles from "./select.module.css";
type SelectedOption = {
  label: string;
  value: any;
};
type SelectedProp = {
  options: SelectedOption[];
  value?: SelectedOption;
  onchange: (value: SelectedOption | undefined) => void;
};

export const Select = ({ value, onchange, options }: SelectedProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openOption = () => {
    setIsOpen((prev) => !prev);
  };
  const closeOption = () => {
    setIsOpen(false);
  };
  const clearOption = () => {
    onchange(undefined);
  };
  const selectedOption = (option: SelectedOption) => {
    onchange(option);
  };
  return (
    <div
      onClick={openOption}
      onBlur={closeOption}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOption();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectedOption(option);
              closeOption();
            }}
            key={option.value}
            className={styles.option}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
