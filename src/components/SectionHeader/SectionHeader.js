import './SectionHeader.css'
export function SectionHeader({ header, lineDark=false }) {
  return <h2 className={`section-header ${lineDark && `section-header_type_dark`}`} >{header}</h2>;
}
