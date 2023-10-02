import './Input.css';
export function Input({
  name,
  type,
  value,
  required,
  label,
  onChange,
  validationMessage,
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
        minLength={2}
      />
      <span className="input__error">{validationMessage}</span>
    </div>
  );
}
