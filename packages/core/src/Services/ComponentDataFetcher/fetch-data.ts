export function FetchData (
  url: string
) {
  return fetch(url)
    .then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      return response.json()
    })
}
