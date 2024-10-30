const FontSelector = ({ fonts=[], onFontChange }) => {

  const handleChange = (event) => {
    onFontChange(event.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>
        Select a font
      </option>
      {fonts.map((font) => (
        <option key={font.family} value={font.family}>
          {font.name}
        </option>
      ))}
    </select>
  );
};

export default FontSelector;