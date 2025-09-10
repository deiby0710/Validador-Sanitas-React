import { useState } from "react";

export const SearchToggle = ({ onToggle }) => {
  const [searchMode, setSearchMode] = useState("authorization");

  const handleToggle = () => {
    const newMode = searchMode === "authorization" ? "document" : "authorization";
    setSearchMode(newMode);
    onToggle(newMode); // avisamos al padre
  };

  return (
    <div className="form-check form-switch d-flex align-items-cente">
      <span className="">Autorización</span>
      <input
        className="form-check-input mx-3"
        type="checkbox"
        role="switch"
        id="searchModeSwitch"
        checked={searchMode === "document"}
        onChange={handleToggle}
      />
      <span className="">Documento</span>
    </div>
  );
};