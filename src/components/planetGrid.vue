<script>
  import Counter from './Counter.vue'
  export default {
    props: {
      planets: {
        type: Array,
        required: true
      }
    },
    components: {
      Counter
    },
    data() {
      return {
        mustHaveTemp: false,
        mass: "all",
        oneTarget: "all",
        sorting: "unsort",
        planetNumber: 4
      }
    },
    methods: {
      toggleMustHaveTemp() {
        this.mustHaveTemp = !this.mustHaveTemp
      },
      toggleHeavy() {
        this.heavy = !this.heavy
      }
    },
    computed: {
      filteredPlanets() {
        return this.planets.filter(planet => {
          if (this.oneTarget == "all") {
            return planet
          } else {
            return planet.name === this.oneTarget
          }
        }).filter(planet => {
          if (this.mustHaveTemp) {
            return planet.temperature !== null
          } else {
            return planet
          }
        }).filter(planet => {
          if (this.mass == "heavy") {
            return planet.mass > 1
          } else if (this.mass == "light"){
            return planet.mass < 1
          } else {
            return planet
          }
        }).sort((a,b)=> {
          if (this.sorting === "unsort") {
            return 0
          } else if (this.sorting === "asec") {
            return (a.name > b.name) ? 1 : -1
          } else {
            return (b.name > a.name) ? 1 : -1
          }
        })
      }
    }
  }
</script>

<template>
  <div class="container-lg">
    <!--filters selectors-->
    <div>
      <input type="checkbox" class="form-check-input" name="HaveTemp" id="HaveTemp" v-bind="mustHaveTemp" v-on:change="toggleMustHaveTemp" />
      <label for="HaveTemp" class="form-check-label">Must have Temperature</label>
    </div>
  
    <div>
      <div class="form-check-inline">
        <input type="radio" class="form-check-input info" name="jupiter-compare" id="heavy" value="heavy" v-model="mass" />
        <label for="heavy" class="form-check-label">Mass larger than Jupiter</label>
      </div>
      <div class="form-check-inline">
        <input type="radio" class="form-check-input info" name="jupiter-compare" id="light" value="light" v-model="mass" />
        <label for="light" class="form-check-label">Mass less than Jupiter</label>
      </div>
      <div class="form-check-inline">
        <input type="radio" class="form-check-input info" name="jupiter-compare" id="all" value="all" v-model="mass" />
        <label for="all" class="form-check-label">All masses</label>
      </div>
    </div>

    <div>
      <label for="one-planet">Select one Planet by name</label>
      <select name="one-planet" id="one-planet" v-model="oneTarget">
        <option value="all" selected>All Planets</option>
        <option v-for="planet in this.planets" :value="planet.name">{{ planet.name }}</option>
      </select>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label for="sort">Sorting by name: </label>
      </div>
      <select class="custom-select" name="sort" id="sort" v-model="sorting">
        <option value="unsort" selected>Unsort</option>
        <option value="asec">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <Counter :showing=this.filteredPlanets.length :total=this.planets.length />
  </div>

  <div class="container-xl text-center">
    <div class="row justify-content-center gy-3">
      <div v-for="planet in this.filteredPlanets" class="col justify-content-center col-xl-4 col-lg-6 col-sm-12">
        <div class="card mx-auto shadow" style="width: 22rem;">
          <h4 class="card-header"><strong class="text-warning">{{ planet.name[0] }}</strong>{{ planet.name.slice(1) }}</h4>
          <img src="https://picsum.photos/150/150" alt="" class="card-img-top">
          <h5 class="card-title"><span class="text-success">I</span>nfo</h5>
          <p class="card-text">
            <span class="text-danger">W</span>eight ratio to Jupiter : {{ planet.mass }} <br />
            <span class="text-danger">T</span>emperature : {{ planet.temperature }} <br />
            <span class="text-danger">D</span>istance from Earth (in light year) :<br /> {{ planet.distance_light_year }} <br />
            <span class="text-danger">H</span>ost Start Temperature : {{ planet.host_star_temperature }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>