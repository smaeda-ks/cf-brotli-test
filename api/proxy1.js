export const config = {
  runtime: 'edge',
}

export default async function handler(request) {

  let headers = new Headers(request.headers);
  const nocomp = headers.get("x-nocomp");
  if (nocomp) {
    headers.delete('accept-encoding')
  }

  // request headers
  const headersObject1 = Object.fromEntries(request.headers);
  const headersString1 = JSON.stringify(headersObject1, null, 4);
  console.log(headersString1);

  const res = await fetch('https://developers.cloudflare.com/', {
    method: request.method,
    headers: headers,
    body: request.body,
    redirect: 'manual'
  });

  // response headers
  const response_headers = new Headers(res.headers)
  const headersObject = Object.fromEntries(response_headers)
  const headersString = JSON.stringify(headersObject, null, 4)
  console.log(headersString)

  const body = await res.text();
  console.log(`body: ${body.substring(0,99)}`);

  return new Response(body, {
    status: res.status,
    statusText: res.statusText,
    headers: response_headers
  });
}