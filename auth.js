import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    constant_arrival_rate_test: {
        executor: 'constant-arrival-rate',
        rate:1000, // 500 iterations
        timeUnit: '1m', // per minute
        duration: '20m',
        preAllocatedVUs: 2000, 
      gracefulStop: '200s',
    },
  },
};

export default function () {
  const url = 'http://10.200.11.90:7000/eivital/v1.04/auth';

  const payload = JSON.stringify({
    username: 'MastersIndia UP',
    password: 'yourPasswordHere',
  });

  const headers = {
    'AuthToken': '1uwclh6ZP2xXEFJf8cHUUw5En',
    'user_name': 'MastersIndia UP',
    'gstin': '09AAAPG7885R002',
    'client_id': 'DCdevdEJTzf5HvVoigJnOEashp0GtFWu',
    'client_secret': 'zMxc4RQnvELV6R1bHkZCmO0fRiRK7tDs',
    'Content-Type': 'application/json',
  };

  const res = http.post(url, payload, { headers: headers });

  console.log(`Status: ${res.status}`);
  console.log(`Body: ${res.body}`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
}
