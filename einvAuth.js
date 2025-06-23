import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate:500, // 500 iterations
      timeUnit: '1m', // per minute
      duration: '2m',
      preAllocatedVUs: 2000, // Pre-allocate enough VUs
      // maxVUs: 50, // Allow some headroom for spikes
      gracefulStop: '300s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

const authPayload = JSON.stringify({
  username: 'MastersIndia UP',
  password: 'yourPasswordHere' // Add actual credentials or token fields as needed
});

const headers = {
  'AuthToken': '1uwclh6ZP2xXEFJf8cHUUw5En',
  'user_name': 'MastersIndia UP',
  'gstin': '09AAAPG7885R002',
  'client_id': 'DCdevdEJTzf5HvVoigJnOEashp0GtFWu',
  'client_secret': 'zMxc4RQnvELV6R1bHkZCmO0fRiRK7tDs',
  'Content-Type': 'application/json',
};

const payload = JSON.stringify({
  Data: "pAqRf0AiH22z0MlaNBIyjycyus/CQW26Wsyy8LGZDpysK8EuQEIhQTjx1QLUpi8E..." // (truncated for readability)
});

export default function () {
  // First API: /auth
  const authRes = http.post(
    'http://10.200.11.90:7000/eivital/v1.04/auth',
    authPayload,
    { headers: headers }
  );

  check(authRes, {
    'auth status is 200': (r) => r.status === 200,
  });

  // console.log(`Auth Response (${authRes.status})`);

  // Second API: /Invoice
  // const invoiceRes = http.post(
  //   'http://10.200.11.90:7000/eicore/v1.03/Invoice',
  //   payload,
  //   { headers: headers }
  // );

  // check(invoiceRes, {
  //   'invoice status is 200': (r) => r.status === 200,
  // });
  // (${invoiceRes.body}
  console.log(`Invoice Response (${authRes.status}  `);
  console.log(`Invoice Response (${authRes.body}  `);
}
