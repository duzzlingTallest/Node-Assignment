function getCity(city) {
    fetch(`/Wheather?location=${city}`)
        .then((res) => res.json())
        .then((result) => {
            
            document.getElementById('cityname').innerHTML = result.city
            document.getElementById('temp').innerHTML = result.temp
        })
        .catch((err) => {
            console.log(err)
        })
}