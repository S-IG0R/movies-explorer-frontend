import './NavTabButton.css';

export function NavTabButton({ title, anchor }) {
  return (
    <button
      className="nav-button"
      onClick={() => {
        window.location.href = `#${anchor}`;
      }}
      type='button'
    >
      {title}
    </button>
  );
}
