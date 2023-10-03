import './PageWithForm.css';
import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function PageWithForm({
  children,
  formName,
  title,
  underButtonText,
  onSubmit,
  link,
  linkName,
}) {

  return (
    <section className="form-page">
      <div className="form-page__container">
        <Logo />
        <h1 className="form-page__title">{title}</h1>
        <form
          className="form-page__form"
          name={formName}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
        </form>
        <div className="form-page__link-container">
          <p className="form-page__text">{underButtonText}</p>
          <Link className="form-page__link" to={link}>
            {linkName}
          </Link>
        </div>
      </div>
    </section>
  );
}
