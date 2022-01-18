import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  vus: 100,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(90)<500'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  http.get(`http://localhost:3000/products/42366/styles`);
  sleep(1)
}