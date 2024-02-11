<template>
    <h1 class="instruction-title">Search by clicking an area on the map!</h1>
    
    <div id="map-container" v-if="dataReady">
        <l-map ref="map" v-on:click="redMarker" v-on:ready="onMapReady" v-bind:zoom="mapZoom" v-bind:center="mapCenter">
            <l-tile-layer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors">
            </l-tile-layer>
        </l-map>
    </div>
</template>

<script>

import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'

export default {
  name: 'SearchMap',
  emits: ['map-click'],
  components: {
    LMap, LTileLayer
  },
  data() {
    return {
      // When the map isn't ready and the api call isn't done
      dataReady: true,
      mapReady: false
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
  },
  computed: {
    mapZoom() {
        return 4
    },
    mapCenter() {
        return [37.09024, -95.712891]
    },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#map-container {
    height: 40em;
}
</style>
