import { SectionHeader } from '../SectionHeader/SectionHeader';
import './AboutMe.css';
import heroPhoto from '../../images/hero-photo.png';
import { Portfolio } from '../Portfolio/Portfolio';

export function AboutMe() {
  return (
    <section className="about-me" id="student">
      <div className="about-me__container">
        <SectionHeader header="Студент" />
        <div className="about-me__main-container">
          <div className="about-me__text-container">
            <p className="about-me__name">Виталий</p>
            <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__caption">
              Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет
              экономики СГУ. У меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать
              музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
              С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
              После того, как прошёл курс по&nbsp;веб-разработке, начал
              заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.
            </p>
            <a
              className="about-me__link"
              href="https://github.com/S-IG0R"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <img
            src={heroPhoto}
            className="about-me__photo"
            alt="фотография студента"
          />
        </div>
        <Portfolio/>
      </div>
    </section>
  );
}
