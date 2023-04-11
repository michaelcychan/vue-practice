<script>
  import PlanetTable from './planetTable.vue'
  export default {
    data() {
      return {
        msg: "I also did it!",
        planetsData: [],
        planets:["Venus", "Mars", "Earth"]
      }
    },
    methods: {
      async getData() {
        
        const requests = this.planets.map(planet => fetch("https://api.api-ninjas.com/v1/planets?name=" + planet, {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "5MwdICpfDeVJSJAMv4Mrkg==UUntnNHZyIRKABMh"
          }
        }))
        const allRes = await Promise.all(requests);
        const errors = allRes.filter((res) => !res.ok);

        if (errors.lengh > 0){
          console.log(errors.length)
          throw errors.map(response => Error(response.statusText));
        }

        const json = allRes.map(res => res.json());
        const data = await Promise.all(json)

        this.planetsData = []
        data.forEach(datum => this.planetsData.push(datum[0]))

        console.log(this.planetsData)

      }
    },
    components: {
      PlanetTable
    }
  }
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <button v-on:click="getData">Click me to print </button>
  </div>
  <div v-if="this.planetsData.length > 0">
    <PlanetTable :planets="this.planetsData"/>
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
