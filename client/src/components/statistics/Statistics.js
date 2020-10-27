import React, { useEffect, useState } from 'react';

// import { useQuery } from 'react-query';

const Statistics = ({ data }) => {
  const [users, setUsers] = useState([]);
  const [usersDays, setUsersDays] = useState([]);

  const setUsersFunc = () => {
    let usersArr = [];
    data &&
      data.forEach((item) => {
        usersArr.push(item.username);
      });
    setUsers(Array.from(new Set(usersArr)));

  };

  const countDaysForUsers = () => {
    let arr = [];
    for (const objUsers of users) {
      let obj = {
        name: objUsers,
        dutyCount: 0,
        dayOffCount: 0,
      };
      for (const objData of data) {
        if (objUsers === objData.username && objData.dutyType === 'dutyOn')
          obj.dutyCount += 1;
        if (objUsers === objData.username && objData.dutyType === 'dutyOff')
          obj.dayOffCount += 1;
      }
      arr.push(obj);
    }
    // console.log(arr);
    setUsersDays(arr);
  };

  useEffect(() => {
    setUsersFunc();
    countDaysForUsers();
    countDaysForUsers();
   console.log(usersDays)
  }, [data]);

  return (
    <div>
      <table className='table is-striped'>
        <thead>
          <tr className='is selected'>
            <th>Osoba</th>
            <th>dyżury</th>
            <th>wolne</th>
          </tr>
        </thead>
        <tbody>
          {usersDays.map((usersDay) => (
            <tr key={usersDay.name}>
              <td>{usersDay.name}</td>
              <td>{usersDay.dutyCount}</td>
              <td>{usersDay.dayOffCount}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
