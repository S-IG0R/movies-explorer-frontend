import './SubmitButton.css';
export function SubmitButton({ title, disabled = false, classes = {} }) {

  return (
    <button
      className={`button-submit ${classes.root} ${!disabled && 'button-submit_disabled'}`}
      type="submit"
      disabled={!disabled}
    >
      {title}
    </button>
  );
}
