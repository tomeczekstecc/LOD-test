import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getMonthName } from '../../helpers/getMonthName';
import { NavWrapper } from './Nav.styles';

const Nav = ({
  month,
  year,
  increaseMonth,
  decreaseMonth,
  increaseYear,
  decreaseYear,
}) => {
  return (
    <NavWrapper year={year}>
      <div className='section pt-3 pb-3'>
        <button onClick={decreaseMonth} className='button is-light mx-2 '>
          <BsChevronLeft className='icon' />
        </button>
        <span className='title is-2'>{getMonthName(month)}</span>
        <button onClick={increaseMonth} className='button is-light'>
          <BsChevronRight className='icon ' />
        </button>
        <div id='subtitle'>
          <button
            onClick={decreaseYear}
            id='btn-left'
            className='button mx-2 is-light is-small'
          >
            <BsChevronLeft className='icon has-text-grey' />
          </button>

          <span className='subtitle is-4'>{year}</span>
          <button
            onClick={increaseYear}
            className='button has-text-grey mx-2 is-light is-small'
          >
            <BsChevronRight className='icon icon has-text-grey' />
          </button>
        </div>
      </div>
    </NavWrapper>
  );
};

export default Nav;
