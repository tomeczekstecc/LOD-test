import React from 'react';
import { CgToggleOff, CgToggleOn } from 'react-icons/cg';
import { MdWork } from 'react-icons/md';
import { GiPalmTree } from 'react-icons/gi';
import { TogglerWrapper } from './Toggler.styles';

const Toggler = ({ offDutyMode, setOffDutyMode }) => {
  return (
    <TogglerWrapper title = 'Wybierz tryb: dużur lub urlop' offDutyMode={offDutyMode}>
      <MdWork className='icon' id='off' />
      {offDutyMode ? (
        <CgToggleOff
          className='icon is-medium'
          onClick={(prev) => setOffDutyMode(!offDutyMode)}
        />
      ) : (
        <CgToggleOn
          className='icon is-medium'
          onClick={(prev) => setOffDutyMode(!offDutyMode)}
        />
      )}
      <GiPalmTree className='icon' id='on' />
    </TogglerWrapper>
  );
};

export default Toggler;
