import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import Day from '../../components/day/Day';
import Nav from '../../components/nav/Nav';
import Toggler from '../../components/toggler/Toggler';
import Welcome from '../../components/welcome/Welcome';
import Statistics from '../../components/statistics/Statistics';
import { MonthStyles, MonthWrapper } from './Month.styles';
import { getDaysInMonth } from '../../helpers/getDaysInMonth';
import { getDaysFromDataBase } from '../../helpers/getDaysFromDataBase';

function Month({ history }) {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  if (user === '') {
    history.push('/login');
  }
  const [offDutyMode, setOffDutyMode] = useState(false);
  const [days, setDays] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstDay, setFirstDay] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [ghostDays, setGhostDays] = useState([]);

  useEffect(() => {
    const renderGhostDays = () => {
      if (days.length > 0) {
        let arr = [];
        let i;
        if (firstDay !== 0) {
          for (i = 1; i < firstDay; i++) {
            arr.push(i);
          }
        } else {
          for (i = 1; i < 7; i++) {
            arr.push(i);
          }
        }

        return arr;
      } else {
        return null;
      }
    };

    setDays(getDaysInMonth(month, year));
    getDaysFromDataBase(month, year).then((data) => setData(data));
    setGhostDays(renderGhostDays());
    setFirstDay(getFirstDayOfMonth(year, month));
  }, [loading, month, year, firstDay]);

  const renderDays = days.map((day) => (
    <Day
      key={day}
      day={day}
      data={data}
      loading={loading}
      setLoading={setLoading}
      offDutyMode={offDutyMode}
      loggedInUsername={user.username}
      accessToken={user.accessToken}
    />
  ));

  const getFirstDayOfMonth = (year, month) => {
    const curr = new Date(`${year},${month + 1},1`);

    return curr.getDay();
  };

  const increaseMonth = () => {
    if (month === 11) {
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };
  const decreaseMonth = () => {
    if (month === 0) {
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  const increaseYear = () => {
    setYear(year + 1);
  };
  const decreaseYear = () => {
    if (year === 2020) {
      setYear(2020);
    } else {
      setYear(year - 1);
    }
  };

  if (data) {
    return (
      <MonthWrapper className='has-background-info-light'>
        <div className='top-panel'>
          <Welcome username={user.username} />
          <Nav
            increaseMonth={increaseMonth}
            decreaseMonth={decreaseMonth}
            increaseYear={increaseYear}
            decreaseYear={decreaseYear}
            month={month}
            year={year}
          />
          <Toggler offDutyMode={offDutyMode} setOffDutyMode={setOffDutyMode} />
        </div>
        <MonthStyles className='App ml-5 mr-5 mt-5 mb-5 '>
          <div className='days'>
            {ghostDays && ghostDays.map((item, i) => <div key={i}></div>)}
            {renderDays}
          </div>
          <Statistics data={data} />
        </MonthStyles>
      </MonthWrapper>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}

export default Month;
