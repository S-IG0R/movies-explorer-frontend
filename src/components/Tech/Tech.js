import './Tech.css';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { Icon } from '../Icon/Icon';

export function Tech() {
  return (
    <section className="tech" id="tech">
      <div className="tech__container">
        <SectionHeader header="Технологии" lineDark={true}/>
        <div className="tech__items-container">
          <p className="tech__title">7 технологий</p>
          <p className="tech__subtitle">
            На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
            применили в дипломном проекте.
          </p>
          <ul className="tech__info-bar">
            <li className="tech__info-bar-item">
              <Icon heading="HTML" />
            </li>
            <li className="tech__info-bar-item">
              <Icon heading="CSS" />
            </li>
            <li className="tech__info-bar-item">
              <Icon heading="JS" />
            </li>
            <li className="tech__info-bar-item">
              <Icon heading="React" />
            </li>
            <li className="tech__info-bar-item">
              <Icon heading="Git" />
            </li>
            <li className="tech__info-bar-item">
              <Icon heading="Express.js" />
            </li>
            <li className="tech__info-bar-item">
              <Icon heading="mongoDB" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
