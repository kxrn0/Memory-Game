export default async function make_request(url) {
  let response;

  response = await fetch(url);
  response = await response.json();
  return response;
}
