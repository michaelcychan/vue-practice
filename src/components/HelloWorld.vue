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
        msg: "I also did it!",
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
      async getData () {
        const res = await fetch(this.apiBaseUri + '?max_mass=10&offset=100', {headers: this.fetchHeader});
        if (!res.ok) {
          throw res.statusText
        }

        const data = await res.json();
        this.planetsData = [];
        this.planetsData = [...data];
      },
      async getDataForArray() {
        
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
      this.getDataForArray()
    }
  }
</script>

<template>
  <h1>{{ heading }}</h1>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <button v-on:click="getData" class="btn btn-primary">Click me to get outer planets </button>
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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
