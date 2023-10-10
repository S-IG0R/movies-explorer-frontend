import { useEffect, useState } from 'react';
import './InfoTooltip.css';
export const InfoTooltip = ({ tooltipMessage, setTooltipMessage }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (tooltipMessage) {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
        
      }, 3000);
      setTimeout(() => {
        setTooltipMessage(false);
      }, 3100);
    }
  }, [tooltipMessage]);

  return (
    <div
      className={`info-tooltip ${
        isActive ? 'info-tooltip_active' : 'info-tooltip_inactive'
      }`}
    > 
      <div className='info-tooltip__button' role='button' onClick={()=>{setIsActive(false)}}/>
      <p className="info-tooltip__message">{tooltipMessage}</p>
    </div>
  );
};
