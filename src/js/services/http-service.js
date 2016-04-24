import Fetch from 'whatwg-fetch';

var baseURL = 'http://localhost:8080/backend';

var HTTPService = {
  post : function(url, data) {
    console.log('post: ' + baseURL + url + ' data: ' + data);
    return fetch(baseURL + url,  {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response;
    });
  }
}
export default HTTPService;
