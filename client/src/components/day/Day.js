import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/pl'; // without this line it didn't work
import addDuty from '../../helpers/addDuty';
import deleteDuty from '../../helpers/deleteDuty';
import { DayStyles } from './Day.styles';
import { MdWork } from 'react-icons/md';
import { GiPalmTree } from 'react-icons/gi';
import { freeDays2020 } from '../../helpers/freeDays';

moment.locale('pl');

const Day = ({
  day,
  data,
  loading,
  setLoading,
  offDutyMode,
  loggedInUsername,
  accessToken,
}) => {
  const [found, setFound] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasDutyOn, setHasDutyOn] = useState(false);
  const [busyDay, setBusyDay] = useState(null);
  const [isFreeDay, setIsFreeDay] = useState(false);
  const displayDate = moment(day).format('dddd');
  const searchParam = moment(day).format('YYYY-MM-DD');

  const handleOnClick = () => {
    if (busyDay && loggedInUsername === busyDay.username) {
      deleteDuty(busyDay._id, accessToken);
    } else {
      let dutyType;
      if (offDutyMode === true) {
        dutyType = 'dutyOff';
      } else {
        dutyType = 'dutyOn';
      }
      const body = {
        loggedInUsername,
        accessToken,
        dutyDate: searchParam,
        dutyType,
      };

      addDuty(body);
    }

    // to refresh data from parent
    setTimeout(() => setLoading(!loading), 500);
    setIsFetching(true);
    setTimeout(() => setIsFetching(false), 500);
  };

  useEffect(() => {
    setFound(data.filter((item) => item.dutyDate === searchParam));
    setBusyDay(
      data.find((item) => {
        if (
          item.dutyDate === searchParam &&
          item.username === loggedInUsername
        ) {
          return true;
        } else {
          return false;
        }
      })
    );

    setIsFreeDay(
      freeDays2020.find((item) => {
        if (item.date === searchParam) {
          return true;
        } else {
          return false;
        }
      })
    );

    setHasDutyOn(
      data.find((item) => {
        if (item.dutyDate === searchParam && item.dutyType === 'dutyOn') {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [data]);

  return (
    <>
      {/* disable if loading */}
      <DayStyles
        isFetching={isFetching}
        hasDutyOn={hasDutyOn}
        onClick={handleOnClick}
        className='tile m-3 notification is-primary'
        day={day.getDay()}
        isFreeDay={isFreeDay}
      >
        <p className='title'>{day.getDate()}</p>
        <p className='subtitle mb-1'>{displayDate}</p>

        <div className='found'>
          {found.map((item) => (
            <h4
              key={item.dutyDate + item.userId}
              className={`is-size-7 ${item.dutyType} ${
                loggedInUsername === item.username && item.dutyType === 'dutyOn'
                  ? 'pulse'
                  : null
              }`}
            >
              {item.username}{' '}
              {item.dutyType === 'dutyOn' ? (
                <MdWork className='on' />
              ) : (
                <GiPalmTree className='off' />
              )}
            </h4>
          ))}

          <i>{isFreeDay && isFreeDay.name}</i>
        </div>
      </DayStyles>
    </>
  );
};

export default Day;
