import './SubmitButton.css'
export function SubmitButton({ title }) {
  return (
    <button className="button-submit" type="submit">
      {title}
    </button>
  );
}
