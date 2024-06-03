import { useEffect, useState } from "react";
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
  const [highlightedIndex, setHighlightedIndex] = useState<number>();
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
  const isOptionSelected = (option: SelectedOption) => {
    return option === value;
  };
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);
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
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectedOption(option);
              closeOption();
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ""
            } ${index === highlightedIndex ? styles.highlighted : ""} `}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
