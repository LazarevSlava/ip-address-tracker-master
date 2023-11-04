import 'babel-polyfill';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../images/icon-location.svg";
import { validatIp, addTileLayer , getAddress,addOffset} from "./helpers";


const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const timezoneInfo = document.querySelector("#timezone");
const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleKiy);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
});
addTileLayer(map)
L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
  if (validatIp(ipInput.value)) {
       getAddress(ipInput.value)
       .then (setInfo)
  }
}

function handleKiy(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setInfo(mapData) {
    console.log(mapData);
// const {lat, lng, country, region, timezone}=mapData.location;
  ipInfo.innerText = mapData.city_geoname_id;
  locationInfo.innerText = mapData.country + " " + mapData.region;
  timezoneInfo.innerText = mapData.timezone.current_time
  ;
  ispInfo.innerText = mapData.isp;

  map.setView([mapData.latitude, mapData.longitude]);
  L.marker([mapData.latitude, mapData.longitude],{icon: markerIcon}).addTo(map);

  if(matchMedia("(max-width: 1023px)").matches){
    addOffset(map);
  }
  
}

 document.addEventListener('DOMContentLoaded', ()=>{
    getAddress('8.8.8.4').then(setInfo)
})

function getIpAddress() {
    return new Promise((resolve, reject) => {
        fetch('http://ip-api.com/json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.query;
              resolve(ipAddress); // Resolve the IP address
            })
            .catch(error => {
                reject(error); // Reject with the error message if there's an error
            });
    });
}

// Usage with then() method
getIpAddress()
    .then(ipAddress => {
        return ipAddress;
    })
    .catch(error => {
        console.error('Error fetching IP address:', error);
    });

 
    
  




