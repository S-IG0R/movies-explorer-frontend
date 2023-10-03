import './PortfolioLink.css';

export function PortfolioLink({ title, link }) {
  return (
      <div className='portfolio-link'>
        <a
          className="portfolio__link"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </div>
  );
}
