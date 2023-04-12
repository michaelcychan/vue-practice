<script>
  export default {
    props: {
      planets: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        mustHaveTemp: false,
        mass: "all"
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
        // return this.mustHaveTemp ?
        //   this.planets.filter(planet => planet.temperature !== null) :
        //   this.planets

        return this.planets.filter(planet => {
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
        })
      }
    }
  }
</script>

<template>
  <h3>Grid</h3>
  <div>
    <input type="checkbox" name="HaveTemp" id="HaveTemp" v-bind="mustHaveTemp" v-on:change="toggleMustHaveTemp" />
    <label for="HaveTemp">Must have Temperature</label>
  </div>

  <div>

    <input type="radio" name="jupiter-compare" id="heavy" value="heavy" v-model="mass" />
    <label for="heavy">Mass larger than Jupiter</label>
    <input type="radio" name="jupiter-compare" id="light" value="light" v-model="mass" />
    <label for="light">Mass less than Jupiter</label>
    <input type="radio" name="jupiter-compare" id="all" value="all" v-model="mass" />
    <label for="all">All masses</label>
  </div>

  <div class="container-lg text-center border">
    <div class="row justify-content-md-center row-cols-4">
      <div v-for="planet in this.filteredPlanets" class="col border border-primary-subtle">
        <div class="card" style="width: 18rem;">
          <img src="https://picsum.photos/150/150" alt="" class="card-img-top">
          <h5 class="card-title"><strong class="text-warning">{{ planet.name[0] }}</strong>{{ planet.name.slice(1) }}</h5>
          <p class="card-text">
            Weight ratio to Jupiter : {{ planet.mass }} <br />
            Temperature : {{ planet.temperature }} <br />
            Distance from Earth (in light year):<br /> {{ planet.distance_light_year }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>