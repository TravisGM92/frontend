import { shallowMount, createLocalVue } from '@vue/test-utils';
import ResultsItemDetails from '@/components/ResultsItemDetails.vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ResultsItemDetails', () => {
  let state, store, computed, $route;

  beforeEach(() => {
    state = {
      savedParks: [],
      searchResults: [
        {
					formatted_address: '8270 Lexington Dr, Colorado Springs',
					geometry: {
						location: { lat: 38.952039, lng: -104.7748943 },
						viewport: {
							northeast: { lat: 38.95328347989272, lng: -104.7738461701073 },
							southwest: { lat: 38.95058382010728, lng: -104.7765458298927 },
						},
					},
					name: 'BoneYard',
					opening_hours: { open_now: true },
					photos: [
						{
							height: 2988,
							html_attributions: [
								'<a href="https://maps.google.com/maps/contrib/115566010039288396420">Melodie Marvel</a>',
							],
							photo_reference:
								'ATtYBwKlEoKnkz5JXr2PXbPZ6hkKSQi1vghFDNriwfubSuyxs1CnwgUwMfjXpn4KOOo3sjFqQxGxmwQwx07MiT-apmrrz20QEpBFSA7SWjm4iysxJbiEzhpi6hS3QZzjxUmv_T6z2H4cZcrDRXS404uoQ1cF3M-59L_ExteZXRRaMLirLiDj',
							width: 5312,
						},
					],
					rating: 4.4,
				}
      ],
      geolocation: null
    }

    store = new Vuex.Store({
      state
    })

    computed = {
      park() { 
        return { 
          formatted_address: "5123-5275 Valmont Rd, Boulder",
          geometry: {},
          name: "BoneYard",
          opening_hours: {open_now: false},
          photos: [{}],
          rating:4.7        
        }
      },
      open() {
        return 'Closed Now'
      },
      saved() {
        return 'SAVE'
      }
    },
    $route = {
      path: '/results/BoneYard',
      params: {
        name: 'BoneYard'
      }
    }
  })

  it('should render the component', () => {
    const wrapper = shallowMount(ResultsItemDetails, { 
      store, 
      localVue, 
      computed,
      mocks: {
        $route
      },
      data() {
        return {
          parkName: 'BoneYard'
        }
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('section').isVisible()).toBeTruthy();
    expect(wrapper.find('h1').text()).toBe('BoneYard');
    expect(wrapper.find('h2').text()).toBe('Not the right park for your pup?');

    const getAllPTags = wrapper.findAll('p');
    expect(getAllPTags.at(0).text()).toBe('Address: 5123-5275 Valmont Rd, Boulder');
    expect(getAllPTags.at(1).text()).toBe('Closed Now');
    expect(getAllPTags.at(2).text()).toBe('Rating: 4.7 / 5');

    const getAllButtonTags = wrapper.findAll('button');
    expect(getAllButtonTags.at(0).text()).toBe('SAVE');
    expect(getAllButtonTags.at(1).text()).toBe('Get Directions');
    expect(getAllButtonTags.at(2).text()).toBe('Search Again');




  })
})