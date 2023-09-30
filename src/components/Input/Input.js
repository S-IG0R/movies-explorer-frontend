import './Input.css';
export function Input({ name, type, value, required, label }) {
  return (
    <div className="input__container">
      <label className='input__label' htmlFor={name}>{label}</label>
      <input
        className="input"
        type={type}
        name={name}
        id={name}
        value={value}
        required
      />
      <span className='input__error'>{'Что-то пошло не так...'}</span>
    </div>
  );
}
