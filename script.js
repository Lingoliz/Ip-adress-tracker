var map = L.map('map').setView([34.04915, -118.09462], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var myIcon = L.icon({
    iconUrl: '/images/icon-location.svg',
    iconSize: [38, 50],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

L.marker([34.04915, -118.09462], {icon: myIcon}).addTo(map);

let btn = document.querySelector('button')


btn.addEventListener('click',()=> {

    let input = document.querySelector('input')
    let ip = document.querySelector('#ip')
    let location = document.querySelector('#location')
    let time = document.querySelector('#time')
    let isp = document.querySelector('#isp')


    if (input.value.trim().length != 0) {
        getData(input.value).then((data)=> {
            console.log(data);
            ip.innerHTML = data.ip;
            location.innerHTML = `${data.location.country}, ${data.location.city}`;
            time.innerHTML = 'UTC'+data.location.timezone;
            isp.innerHTML = data.isp

            map.setView([data.location.lat, data.location.lng], 13);
            L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(map);

            

        })
    }
})

function getData(target) {
   return fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_SLzmQfFCsi3esrpYz9EBIlk5g8FaA&ipAddress=${target}`).then((res)=> {
    return res.json()
})
}