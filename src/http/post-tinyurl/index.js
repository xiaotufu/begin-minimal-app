let fetch = require('node-fetch');
let arc = require('@architect/functions')
let parseBody = arc.http.helpers.bodyParser
var api_key = process.env.API_KEY;
exports.handler = async function http (request) {
  let body = parseBody(request)
  let long_url = body.long_url
  const encodedParams = new URLSearchParams();
  encodedParams.append("url", long_url);
  const options = {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': `${api_key}`
    },
    body: encodedParams
  };
  let tiny_url = await fetch('https://url-shortener-service.p.rapidapi.com/shorten', options)
      .then(res => res.json())
      .then(json => json.result_url)

      .catch(err => console.error('error:' + err));

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json; charset=utf8' },
    body: JSON.stringify({tiny_url:tiny_url})
  }


}
