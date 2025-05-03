import styles from "./SearchButton.module.css";
import { IoIosSearch } from "react-icons/io";

const SearchButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      className={styles.searchButton}
      type="submit"
      form="search-form"
      value="Submit"
      tabIndex={0}
      aria-label="Search location"
      {...props}
    >
      <IoIosSearch className="text-2xl text-white" />
    </button>
  );
};

export default SearchButton;
