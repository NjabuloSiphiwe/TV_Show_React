import s from "./style.module.css";
import { Search, SearchHeart } from "react-bootstrap-icons";
import { useState } from "react";
export function SearchBar({ onSubmit }) {
  const [value, setValue] = useState("");
  function submit(e) {
    if (e.key === "Enter" && e.target.value.trim() != "") {
      onSubmit(e.target.value);
      setValue("");
    }
  }
  function handleChange(e) {
    setValue(e.target.value);
  }
  return (
    <>
      <SearchHeart size={27} className={s.icon} />
      <input
        onKeyUp={submit}
        className={s.input}
        onChange={handleChange}
        type="text"
        value={value}
        placeholder={"Search a Tv show you like"}
      />
    </>
  );
}
