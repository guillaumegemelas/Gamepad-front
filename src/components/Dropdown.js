const Dropdown = ({ label, options, onChange }) => {
  return (
    <label className="dropLabel">
      {label}
      <select className="dropSelect" onChange={onChange}>
        {/* pas besoin de value sur la balise select */}
        {options.map((option, index) => (
          <option className="dropOption" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
