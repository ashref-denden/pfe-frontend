import Fetch from 'whatwg-fetch';

var baseURL = 'http://localhost:8080/backend';

var HTTPService = {

  get : function(url) {
     return fetch(baseURL + url).then(function(response) {
        return response.json();
     });
   },

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
      return response.json();
    });
  }
}
export default HTTPService;
