<script>
  export default {
    props: {
      planets: {
        type: Array,
        required: true
      }
    }
  }
</script>

<template>
  <table class="table table-striped table-bordered table-hover">
    <thead>
      <tr>
        <th scope="col">Planet</th>
        <th scope="col">Mass</th>
        <th scope="col">Radius</th>
        <th scope="col">Period</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="planet in this.planets" :key=planet.name>
        <th scope="row">{{ planet.name }}</th>
        <td>{{ planet.mass }}</td>
        <td>{{ planet.radius }}</td>
        <td>{{ planet.period }}</td>
      </tr>
    </tbody>
  </table>
</template>