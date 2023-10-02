import './PortfolioLink.css';

export function PortfolioLink({ title, link }) {
  return (
      <div className='portfolio-link__container'>
        <a
          className="portfolio-link"
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      </div>
  );
}
