import './SwitchButton.css';

export function SwitchButton({
  title,
  name,
  setShortMoviesChecked,
}) {
  
  const handleChange = (evt) => {
    setShortMoviesChecked(evt.target.checked)
  };
  return (
    <>
      <input
        className="switch"
        id="switch"
        type="checkbox"
        name={name}
        onChange={handleChange}
      />
      <label className="switch-label" htmlFor="switch">
        {title}
      </label>
    </>
  );
}
