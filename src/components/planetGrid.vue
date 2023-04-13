<script>
  import Counter from './Counter.vue'
  import Selectors from './Selectors.vue'
  export default {
    props: {
      planets: {
        type: Array,
        required: true
      }
    },
    components: {
      Counter,
      Selectors
    },
    data() {
      return {
        filteredPlanets: []
      }
    },
  }
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-2">
        <Selectors :planets=this.planets @selecting="(returnedArray) => this.filteredPlanets = returnedArray" />
      </div>
      <div class="col-lg-10">
        <div class="d-flex justify-content-center">
          <Counter :showing=this.filteredPlanets.length :total=this.planets.length />
        </div>
        <div class="container-xl text-center">
          <div class="row justify-content-center gy-3">
            <div v-for="planet in this.filteredPlanets" class="col justify-content-center col-xl-4 col-lg-6 col-sm-12">
              <div class="card mx-auto shadow" style="width: 16rem;">
                <h4 class="card-header"><strong class="text-warning">{{ planet.name[0] }}</strong>{{ planet.name.slice(1) }}</h4>
                <img src="https://picsum.photos/150/150" alt="mock image" class="card-img-top">
                <h5 class="card-title"><span class="text-success">I</span>nfo</h5>
                <hr style="width:80%;color:green;justify-self: center;align-self: center;"/>
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
      </div>
    </div>
  </div>
  
  
</template>