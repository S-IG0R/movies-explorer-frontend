import { SectionHeader } from '../SectionHeader/SectionHeader';
import './AboutProject.css';

export function AboutProject() {
  return (
    <section className="project-description" id="about">
      <div className="project-description__main-container">
        <SectionHeader header="О проекте" />
        <div className="project-description__text-container">
          <div className="project-description__cell">
            <h3 className="project-description__cell-header">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project-description__paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и&nbsp;финальные доработки.
            </p>
          </div>
          <div className="project-description__cell">
            <h3 className="project-description__cell-header">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project-description__paragraph">
              У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые
              нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project-description__chart">
          <div className="project-description__chart-segment project-description__chart-segment_type_green">
            <p className='project-description__chart-info'>1 неделя</p>
          </div>
          <div className="project-description__chart-segment project-description__chart-segment_type_gray">
            <p className='project-description__chart-info'>4 недели</p>
          </div>
          <div className="project-description__chart-segment">
            <p className='project-description__chart-caption'>Back-end</p>
          </div>
          <div className="project-description__chart-segment">
            <p className='project-description__chart-caption'>Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}
