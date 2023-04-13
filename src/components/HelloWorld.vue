<script>
  import PlanetTable from './planetTable.vue'
  import PlanetGrid from './planetGrid.vue'

  export default {
    props: {
      heading: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        msg: "Solar System Planets",
        planetsData: [],
        planets:["Mercury","Venus",  "Earth","Mars", "Jupiter", "Saturn", "Neptune", "Uranus", "Pluto"],
        fetchHeader: {
            "Content-Type": "application/json",
            "X-Api-Key": "5MwdICpfDeVJSJAMv4Mrkg==UUntnNHZyIRKABMh"
        },
        apiBaseUri: "https://api.api-ninjas.com/v1/planets",
      }
    },
    methods: {
      async getDataOuterPlanets () {
        const res = await fetch(this.apiBaseUri + '?max_mass=10&offset=25', {headers: this.fetchHeader});
        if (!res.ok) {
          throw res.statusText
        }

        const data = await res.json();
        this.planetsData = [];
        this.planetsData = [...data];
        this.msg = "Other planets"
      },
      async getDataSolarPlanets() {
        
        const requests = this.planets.map(planet => fetch(this.apiBaseUri + "?name=" + planet, {
          headers: this.fetchHeader
        }))
        const allRes = await Promise.all(requests);
        const errors = allRes.filter((res) => !res.ok);
        if (errors.lengh > 0){
          throw errors.map(response => Error(response.statusText));
        }

        const json = allRes.map(res => res.json());
        const data = await Promise.all(json)

        this.planetsData = []
        data.forEach(datum => this.planetsData.push(datum[0]))
      }
    },
    components: {
      PlanetTable,
      PlanetGrid
    },
    created() {
      this.getDataSolarPlanets()
    }
  }
</script>

<template>
  <div class="container-lg greetings">
    <h1>{{ heading }}</h1>
    <h2 class="text-success">{{ msg }}</h2>
  </div>
  <div class="d-flex">
    <button v-on:click="getDataSolarPlanets" class="btn btn-primary mx-auto">Solar System Planets</button>
    <button v-on:click="getDataOuterPlanets" class="btn btn-primary mx-auto">Outer planets </button>
  </div>
  <div v-if="this.planetsData.length > 0">
    <PlanetGrid :planets="this.planetsData"/>
  </div>
  <div v-else>
    Planet Data will be loaded after you click the button
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

</style>
