import {describe, it, expect} from 'vitest';

import {mount} from '@vue/test-utils';
import PlanetGrid from '../planetGrid.vue';


describe('PlanetGrid', () => {
  it('renders properly', () => {
    const wrapper = mount(PlanetGrid, {
      props: {
        planets: [
          {
            name: 'Planet X',
            mass: 2.3,
            temperature: 200,
            distance_light_year: 1,
            host_star_temperature: 6000
          },{
            name: 'Planet Y',
            mass: 0.5,
            temperature: 100,
            distance_light_year: 10,
            host_star_temperature: 3000
          }
        ]
      }
    })
    expect(wrapper.findAll("div.card").length).toBe(2)
    expect(wrapper.findAll("div.card")[0].text()).toContain('Planet X')
    expect(wrapper.findAll("div.card")[1].text()).toContain('Planet Y')
  });
  it('renders filters with heavy mass', async () => {
    const wrapper = mount(PlanetGrid, {
      props: {
        planets: [
          {
            name: 'Planet X',
            mass: 2.3,
            temperature: 200,
            distance_light_year: 1,
            host_star_temperature: 6000
          },{
            name: 'Planet Y',
            mass: 0.5,
            temperature: 100,
            distance_light_year: 10,
            host_star_temperature: 3000
          }
        ]
      }
    })
    const radioHeavy = wrapper.find('input[id="heavy"]');
    await radioHeavy.setChecked()
    expect(wrapper.findAll("div.card").length).toBe(1)
    expect(wrapper.findAll("div.card")[0].text()).toContain('Planet X')
  });
  it('renders filters with light mass', async () => {
    const wrapper = mount(PlanetGrid, {
      props: {
        planets: [
          {
            name: 'Planet X',
            mass: 2.3,
            temperature: 200,
            distance_light_year: 1,
            host_star_temperature: 6000
          },{
            name: 'Planet Y',
            mass: 0.5,
            temperature: 100,
            distance_light_year: 10,
            host_star_temperature: 3000
          }
        ]
      }
    })
    const radioLight = wrapper.find('input[id="light"]');
    await radioLight.setChecked()
    expect(wrapper.findAll("div.card").length).toBe(1)
    expect(wrapper.findAll("div.card")[0].text()).toContain('Planet Y')
  })
})