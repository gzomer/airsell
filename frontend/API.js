const API_URL = "https://www.airsell.me/publish"

class API {

	publish(data) {
		return fetch(API_URL,
			{
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    method: 'POST',
			    body: JSON.stringify(data)
			})
			.then(function(res){ return res.json() })
			.catch(function(res){ return res.json() })
	}
}


export default API