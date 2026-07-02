const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('https://visson-restaurant.vercel.app/api/auth/register', {
      username: 'testuser_cors',
      password: 'testpass_cors',
      role: 'Customer'
    }, {
      headers: {
        'Origin': 'https://visson-restaurant-r7fk.vercel.app'
      }
    });
    console.log("SUCCESS:", res.data);
  } catch (err) {
    console.log("ERROR:", err.response ? err.response.status : err.message);
  }
}

test();
