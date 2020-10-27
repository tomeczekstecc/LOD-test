import axios from 'axios';

const addDuty = async (data) => {

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': data.accessToken,
    },
  };

  await axios
    .post(`/api/duty/add`, data, config)
    .then((res) => console.log(res.data));

  //   await fetch(`http://localhost:5000/api/duty/add`, {
  //     method: 'post',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
};

export default addDuty

