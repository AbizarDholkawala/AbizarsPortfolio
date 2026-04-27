const https = require('https');

const data = JSON.stringify({
  service_id: 'service_xjz8tfl',
  template_id: 'template_h4zmxor',
  user_id: 'ap_vH7afDL-WkDCQk',
  template_params: {
    from_name: 'Test',
    reply_to: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message.'
  }
});

const options = {
  hostname: 'api.emailjs.com',
  path: '/api/v1.0/email/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${body}`);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
