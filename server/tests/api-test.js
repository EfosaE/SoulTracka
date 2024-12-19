import http from 'k6/http';
import { check, sleep } from 'k6';

// Define an array of users
const users = [
  { email: 'tosin@soul.io', password: '12wwwed3' },
  { email: 'treasure@gmail.com', password: '12345678' },
  { email: 'abel@gmail.com', password: '12wwwed3' },
  { email: 'john@gmail.com', password: '12wwwer5' },
  { email: 'sisto@gmail.com', password: '12wAwtr5' },
];

export let options = {
  // define scenarios
  scenarios: {
    // arbitrary name of scenario
    average_load: {
      executor: 'ramping-vus',
      stages: [
        // ramp up to average load of 20 virtual users
        { duration: '10s', target: 20 },
        // maintain load
        { duration: '50s', target: 20 },
        // ramp down to zero
        { duration: '5s', target: 0 },
      ],
    },
  },
};

export default function () {
  // Select the user based on the current VU index when VU === users.length
  // const user = users[__VU - 1]; // __VU starts from 1, so we subtract 1 to get the correct index

  // Cycle through the users array by using modulus operator when VU > users.length
  const user = users[(__VU - 1) % users.length];
  
  // Step 1: Authenticate and get the access token
  let loginRes = http.post(
    'http://host.docker.internal:3000/api/v1/users/login',
    JSON.stringify({
      email: user.email,
      password: user.password,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  // Check if the login was successful
  check(loginRes, { 'logged in successfully': (res) => res.status === 200 });

  // Extract the access token
  let authToken = loginRes.json('accessToken');

  // Step 2: Use the access token for database-intensive endpoints
  let dbRes = http.get(
    'http://host.docker.internal:3000/api/v1/outreach-contacts',
    {
      headers: {
        Authorization: `Bearer ${authToken}`, // Use the correct token in the Authorization header
      },
    }
  );

  // Check if the request to the database endpoint was successful
  check(dbRes, {
    'status is 200': (res) => res.status === 200,
    'response time is < 200ms': (res) => res.timings.duration < 700,
  });

  sleep(1); // Short wait before the next request
}
