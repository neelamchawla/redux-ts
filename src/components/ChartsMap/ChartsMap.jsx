import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map } from 'react-leaflet';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 
// });

// mapIconsReinit(L) {
    // delete L.Icon.Default.prototype._getIconUrl;

    // L.Icon.Default.imagePath = ''
    // L.Icon.Default.mergeOptions({
    //   iconRetinaUrl: require('@/assets/img/map_markers/default/marker-icon-2x.png'),
    //   iconUrl: require('@/assets/img/map_markers/default/marker-icon.png'),
    //   shadowUrl: require('@/assets/img/map_markers/default/marker-shadow.png'),
    // });
//   },

//   getMarkerIcon(L, color) {
//     return 
    // L.divIcon({
    //   iconRetinaUrl: require('@/assets/img/map_markers/marker-icon-2x-' + color + '.png'),
    //   iconUrl: require('@/assets/img/map_markers/marker-icon-' + color + '.png'),
    //   shadowUrl: require('@/assets/img/map_markers/marker-shadow.png'),
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [1, -34],
    //   shadowSize: [41, 41]
    // })
//   }

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ChartsMap = () => {
    const [historicalData, setHistoricalData] = useState({});
    const [countryData, setCountryData] = useState([]);

    useEffect(() => {
        // Fetch historical data for cases with dates
        axios
            .get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
            .then((response) => {
                const { cases } = response.data;
                setHistoricalData(cases);
            })
            .catch((error) => {
                console.error('Error fetching historical data:', error);
            });

        // Fetch country-specific data of cases
        axios
            .get('https://disease.sh/v3/covid-19/countries')
            .then((response) => {
                const data = response.data;
                setCountryData(data);
            })
            .catch((error) => {
                console.error('Error fetching country data:', error);
            });
    }, []);

    return (
        <div className='app__wrapper'>
            <h1>COVID-19 Dashboard</h1>

            <h2>Line Graph - Cases Fluctuations</h2>
            <Line
                data={{
                    labels: Object.keys(historicalData),
                    datasets: [
                        {
                            label: 'Cases',
                            data: Object.values(historicalData),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                        },
                    ],
                }}
            />

            <h2>Map - Country-specific Cases</h2>
            <MapContainer center={[0, 0]} zoom={1} style={{ height: '500px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {countryData.map((country) => (
                    <Marker
                        key={country.country}
                        position={[country.countryInfo.lat, country.countryInfo.long]}
                    >
                        <Popup>
                            <div>
                                <h3>{country.country}</h3>
                                <p>Total Active Cases: {country.active}</p>
                                <p>Total Recovered: {country.recovered}</p>
                                <p>Total Deaths: {country.deaths}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ChartsMap;