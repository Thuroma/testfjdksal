<template>
    <div class="col">
        <div id="map-container" v-if="dataReady">
            <l-map ref="map" v-on:click="redMarker" v-on:ready="onMapReady" v-bind:zoom="mapZoom" v-bind:center="mapCenter">
                <l-tile-layer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors">
                </l-tile-layer>
            </l-map>
        </div>
    </div>

    <div class="col">

        <div class="row">
        <div class="col">
            <p>Yelp Results</p>
            <p>{{ yelpApiResponse }}</p>



        </div>
        </div>
        <div class="row">
        <div class="col">
            <p>Census Results</p>
            <p>{{ censusApiResponse }}</p>
        </div>
        </div>

    </div>
</template>

<script>

import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import SearchMap from '@/components/SearchMap.vue'
import axios from 'axios'


export default {
    components: {
        SearchMap,
        LMap,
        LTileLayer
    },
    name: "SearchResults",
    mounted() {
        // Params from route
        this.$route.params.categories_list.forEach(category => {
            this.getYelpData(category)
        })


        this.getCensusData();
    },
    data() {
        return {
            // When the map isn't ready and the api call isn't done
            dataReady: true,
            mapReady: false,
            yelpApiResponse: [],
            censusApiResponse: null,
            
        }
    },
    methods: {
        onMapReady() {
            this.mapReady = true
        },
        setMapView() {
            if (this.mapReady && this.dataReady) {
                this.$refs.map.leafletObject.setView(this.mapCenter, this.mapZoom)
            }
        },
        redMarker(mapEvent) {
            let map = this.$refs.map.leafletObject
            let marker = null
            
            let redMarker = L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            marker = L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng], {icon: redMarker})
            marker.addTo(map)

            map.panTo([mapEvent.latlng.lat, mapEvent.latlng.lng])
            
            map.on('click', function(mapEvent) {

                if (marker != null) {
                map.removeLayer(marker)
                }

                marker = L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng], {icon: redMarker})
                marker.addTo(map)
        
                map.panTo([mapEvent.latlng.lat, mapEvent.latlng.lng])

            })
            
            this.$emit('map-click', [mapEvent.latlng.lat, mapEvent.latlng.lng])
        },
        async getYelpData(category) {
            
            const yelpApiKey = process.env.VUE_APP_YELP_API_KEY
            const latitude = this.$route.params.latitude
            const longitude = this.$route.params.longitude
            const term = category
            const searchRadius = 4827
            const searchLimit = 10

            const url = 'http://127.0.0.1:8000/search_results/${latitude}/${longitude}/${term}/'

            // 'https://api.yelp.com/v3/businesses/search?latitude=%24%7Blatitude%7D&longitude=%24%7Blongitude%7D&term=Stores&radius=3200&categories=&sort_by=best_match&limit=20'

            // const options = {
            //     method: 'GET',
            //     headers: {accept: 'application/json', Authorization: `${yelpApiKey}`}
            // };

            // fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&term=${term}&radius=${searchRadius}&categories=&sort_by=best_match&limit=${searchLimit}`, options)
            //     .then(response => response.json())
            //     .then(response => console.log(response))
            //     .catch(err => console.error(err));

            console.log('Request URL: ', url)

            axios.get(`http://127.0.0.1:8000/search_results/${latitude}/${longitude}/${term}/`)
                .then(response => {
                    this.yelpApiResponse = response.data;
                })
                .catch(error => {
                    console.error('Error fetching Yelp data:', error);
                });
        },

        getCensusData() {
            this.censusApiResponse = 'Census Data'
        },
    },
    computed: {
        mapZoom() {
            return 9
        },
        mapCenter() {
            return [this.$route.params.latitude, this.$route.params.longitude]
        },
    },
}

</script>

<style scoped>

#map-container {
    height: 40em;
}

</style>