import axios from 'axios';

const deleteDuty = async (id,accessToken) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token' : accessToken
    },
  };

  await axios
    .delete(`/api/duty/delete/${id}`,config)
    .then((res) => console.log(res.data));

  //   await fetch(`http://localhost:5000/api/duty/add`, {
  //     method: 'post',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
};

export default deleteDuty;
