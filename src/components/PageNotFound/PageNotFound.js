import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';
export function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section className="page-not-found">
      <h2 className="page-not-found__error-code">404</h2>
      <p className='page-not-found__error-title'>Страница не найдена</p>
      <button
        className="page-not-found__button-go-back"
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </button>
    </section>
  );
}
