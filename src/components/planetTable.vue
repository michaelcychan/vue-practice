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
  <table>
    <tr>
      <th>Planet</th>
      <th>Mass</th>
      <th>Radius</th>
      <th>Period</th>
    </tr>
    <tr v-for="planet in this.planets" :key=planet.name>
      <td>{{ planet.name }}</td>
      <td>{{ planet.mass }}</td>
      <td>{{ planet.radius }}</td>
      <td>{{ planet.period }}</td>
    </tr>
  </table>
</template>