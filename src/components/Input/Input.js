import './Input.css';
export function Input({
  name,
  type,
  value,
  required,
  label,
  onChange,
  validationMessage,
  minLength,
  maxLength,
  placeholder,
  pattern,
  disabled
}) {
  return (
    <div className="input__container">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className={`input ${validationMessage && 'input_invalid'}`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        pattern={pattern}
        disabled={disabled}
      />
      <span className="input__error">{validationMessage}</span>
    </div>
  );
}
