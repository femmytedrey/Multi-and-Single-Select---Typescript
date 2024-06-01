import styles from "./select.module.css";
type SelectedOption = {
  value: string;
  label: string;
};
type SelectedProp = {
  options: SelectedOption[];
  value?: SelectedOption;
  onchange: (value: SelectedOption | undefined) => void;
};

export const Select = ({ value, onchange, options }: SelectedProp) => {
  return (
    <div className={styles.container}>
      <span className={styles.value}>Value</span>
    </div>
  );
};
