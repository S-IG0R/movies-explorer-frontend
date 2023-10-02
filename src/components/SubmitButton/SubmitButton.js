import './SubmitButton.css';
export function SubmitButton({ title, disabled }) {
  return (
    <button
      className={`button-submit ${!disabled && 'button-submit_disabled'}`}
      type="submit"
      disabled={!disabled}
    >
      {title}
    </button>
  );
}
