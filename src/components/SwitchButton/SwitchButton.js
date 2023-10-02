import './SwitchButton.css'
export function SwitchButton({ title }) {
  return (
    <>
      <input className="switch" id="switch" type="checkbox"/>
      <label className="switch-label" htmlFor="switch">{title}</label>
    </>
  );
}
