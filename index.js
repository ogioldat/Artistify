const apiKey = 'c7236ae5231e4ef992670b2889beb6d7';

const requestOptions = {
    method:"GET",
    headers: new Headers({
        "Accept":"application/json",
        "Content-Type":"application/json",
        "Authorization":"Bearer BQAnSIEO4mmAhMXw5gOiuiSIFpGHw9L0K_yZnW49xyeYLMhvkpKKmYJWFgCa1x2RncbytJlrq4J4qNqKy5OhpRLsGX0IavgmHYCPlNfTXawIWhGsmtgQKi8DmXefCpWI0PVbIVsIAm8vhEfJPlG4Q2h2cNg3AUI"
    })
}

fetch(`https://api.spotify.com/v1/search?q=Taco+Hemingway&type=artist`,requestOptions)
    .then(response => response.json()
        .then(data =>({
            data: data,
            status: response.status
        }))
        .then(res => console.log(res.data))
    )

    .catch(error => console.error(error));

