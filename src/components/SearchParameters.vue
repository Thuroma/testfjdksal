<template>
  <div class="row container-fluid">
  <div class="col-8">
    <search-map
      v-on:map-click="displayLatLong">
    </search-map>
  </div>
    
  <div class="col-4">
    <form>
      <div class="container" id="categories-wrapper">
        <div v-for='category in categories' class="form-check form-group">
          <input class="form-check-input" v-on:click="updateSearchCategories" type="checkbox" name="category" :value="category" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            {{ category }}
          </label>
        </div>
      </div>
      
      
      <!-- <div class="form-group">
        <label for="address-input">Address</label>
        <input type="text" name="street_address" class="form-control" id="address-input" required placeholder="1234 Main St">
      </div>
      
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="city-input">City</label>
          <input type="text" class="form-control" name="city" id="city-input" required>
        </div>
        
        <div class="form-group col-md-4">
          <label for="state-input">State</label>
          
          List of states for address input
          <select id="state-input" class="form-control" name="state" required>
            <option selected>Choose...</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div> -->
    </form>

    <div class="form-group">
      <label for="latitude">Latitude</label>
      <input type="number" class="form-control" id="latitude" disabled required>
    
      <label for="longitude">Longitude</label>
      <input type="number" class="form-control" id="longitude" disabled required>
    </div>

    <input type="submit" id="search-button" class="btn btn-primary" v-on:click="searchRedirect" value="Search" />
    
  </div>
  </div>
</template>

<script>
import SearchMap from '@/components/SearchMap.vue'

export default {
  components: {
    SearchMap,
  },
  name: 'SearchParameters',
  emits: ['categories-list'],
  props: {
    lat_long: Array
  },
  data() {
    return {
      // List of Yelp categories
      categories: [
        'Baseball Fields',
        'Basketball Courts',
        'Beaches',
        'Bicycle Paths',
        'Bistros',
        'Breakfast & Brunch',
        'Breweries',
        'Brewpubs',
        'Bus Stations',
        'Cafes',
        'Campgrounds',
        'Cannabis Dispensaries',
        'Cardio Classes',
        'Caribbean',
        'Child Care & Day Care',
        'Chinese',
        'Civic Center',
        'Climbing',
        'Cocktail Bars',
        'Coffee & Tea',
        'Coffeeshops',
        'Colleges & Universities',
        'Community Centers',
        'Convenience Stores',
        'Cultural Center',
        'Delis',
        'Dentists',
        'Departments of Motor Vehicles',
        'Department Stores',
        'Diners',
        'Disc Golf',
        'Discount Store',
        'Distilleries',
        'Dive Bars',
        'Dog Parks',
        'Drugstores',
        'Emergency Pet Hospital',
        'Emergency Rooms',
        'Ethiopian',
        'Ethnic Grocery',
        'EV Charging Stations',
        'Farmers Market',
        'Fire Departments',
        'Fitness & Instruction',
        'Food',
        'Food Banks',
        'Soccer',
        'Gas Stations',
        'General Dentistry',
        'Golf',
        'Grocery',
        'Gyms',
        'Hardware Stores',
        'Hiking',
        'Hospitals',
        'Internet Cafes',
        'International Grocery',
        'Laundromat',
        'Laundry Services',
        'Libraries',
        'Local Services',
        'Makerspaces',
        'Municipality',
        'Nightlife',
        'Outlet Stores',
        'Parks',
        'Pickleball',
        'Post Offices',
        'Pub Food',
        'Public Markets',
        'Public Plazas',
        'Public Services & Government',
        'Public Transportation',
        'Pubs',
        'Rafting/Kayaking',
        'Ramen',
        'Restaurants',
        'Service Stations',
        'Gas Stations',
        'Sports Bars',
        'Professional Sports Teams',
        'Stadiums & Arenas',
        'Street Vendors',
        'Tex-Mex',
        'Thai',
        'Town Hall',
        'Train Stations',
        'Utilities',
        'Vegan',
        'Vegetarian',
        'Venues & Event Spaces',
        'Veterinarians',
        'Veterans Organizations',
        'Walk-in Clinics',
        'Wholesale Stores',
        'Wholesalers'
      ],
    }
  },
  methods: {
    updateSearchCategories() {
      let categories_list = []
      let categories = document.forms[0];
      let i;

      for (i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
          categories_list.push(categories[i].value)
        }
      }

      // if list length is == 5
      if (categories_list.length >= 5) {
        // for each unchecked checkbox
        for (i = 0; i < categories.length; i++) {
          if (!categories[i].checked) {
            // checkbox class add disable
            categories[i].disabled = true
          }
        }
      } else {
        for (i = 0; i < categories.length; i++) {
          if (!categories[i].checked) {
            categories[i].disabled = false
          }
        }
      }
      
      this.$emit('categories-list', categories_list)
    },
    displayLatLong(lat_long) {
      let lat = lat_long[0]
      let long = lat_long[1]

      let latitudeInput = document.getElementById('latitude')
      let longitudeInput = document.getElementById('longitude')

      latitudeInput.value = lat
      longitudeInput.value = long
    },
    searchRedirect() {
      let latitudeElement = document.getElementById('latitude')
      let longitudeElement = document.getElementById('longitude')

      let latitudeInput = latitudeElement.value
      let longitudeInput = longitudeElement.value

      let categories_list = []
      let categories = document.forms[0];
      let i;

      for (i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
          categories_list.push(categories[i].value)
        }
      }

      if (!latitudeInput == '' && !longitudeInput == '') {
        console.log('Location selected.')
      } else {
        alert('Select a location on the map')
      }

      console.log('Latitude ' + latitudeInput, 'Longitude ' + longitudeInput, 'Categories: ' + categories_list)
      this.$router.push({ name: 'SearchResults', params: { latitude: latitudeInput, longitude: longitudeInput, categories_list: categories_list } })

    }
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
#categories-wrapper {
  overflow: auto;
  height: 46vh;
}
</style>
