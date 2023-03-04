const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label className="dropLabel">
      {label}
      <select className="dropSelect" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option classeName="dropOption" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
