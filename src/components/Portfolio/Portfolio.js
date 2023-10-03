import { PortfolioLink } from '../PortfolioLink/PortfolioLink';
import './Portfolio.css';

export function Portfolio() {
  return (
    <div className='portfolio'>
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <PortfolioLink
            link="https://github.com/S-IG0R/how-to-learn"
            title="Статичный сайт"
          />
          <div className="portfolio__line" />
        </li>
        <li className="portfolio__list-item">
          <PortfolioLink
            link="https://github.com/S-IG0R/russian-travel"
            title="Адаптивный сайт"
          />
          <div className="portfolio__line" />
        </li>
        <li className="portfolio__list-item">
          <PortfolioLink
            link="https://github.com/S-IG0R/react-mesto-api-full-gha"
            title="Одностраничное приложение"
          />
        </li>
      </ul>
    </div>
  );
}
