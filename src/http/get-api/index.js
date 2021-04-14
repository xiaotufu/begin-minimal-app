let body = `
<!doctype html>
<html lang=en>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
`

exports.handler = async function http (request) {
  return {
    statusCode: 200,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body
  }
}
