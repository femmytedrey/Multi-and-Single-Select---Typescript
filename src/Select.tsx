import { useEffect, useRef, useState } from "react";
import styles from "./select.module.css";
export type SelectedOption = {
  label: string;
  value: string | number;
};
type MultipleSelectProps = {
  multiple: true;
  value: SelectedOption[];
  onchange: (value: SelectedOption[]) => void;
};
type SingleSelectProps = {
  multiple?: false;
  value?: SelectedOption;
  onchange: (value: SelectedOption | undefined) => void;
};
type SelectedProp = {
  options: SelectedOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select = ({
  multiple,
  value,
  onchange,
  options,
}: SelectedProp) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const openOption = () => {
    setIsOpen((prev) => !prev);
  };
  const closeOption = () => {
    setIsOpen(false);
  };
  const clearOption = () => {
    multiple ? onchange([]) : onchange(undefined);
  };
  const selectedOption = (option: SelectedOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onchange(value.filter((o) => o !== option));
      } else {
        onchange([...value, option]);
      }
    } else {
      if (option !== value) {
        onchange(option);
      }
    }
  };

  const isOptionSelected = (option: SelectedOption) => {
    return multiple ? value.includes(option) : option === value;
  };
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) {
            selectedOption(options[highlightedIndex]);
          }
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    const containerElement = containerRef.current;
    containerElement?.addEventListener("keydown", handler);

    return () => {
      containerElement?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      ref={containerRef}
      onClick={openOption}
      onBlur={closeOption}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectedOption(v);
                  closeOption();
                }}
                className={styles["option-badge"]}
              >
                {v.label} <span className={styles["clear-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
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
