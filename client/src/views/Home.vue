<template>
  <div class="home">
    <section class="data-section" id="property">
      <h2 class="heading">Properties</h2>
      <div class="filters">
        <div class="filter-group">
          <label>
            <span>View apartments only</span>
            <input type="checkbox" v-model="onlyApt" />
          </label>
        </div>
      </div>
      <div class="items-list" v-if="properties.list.length">
        <PropertyInfo
          v-for="(item, i) in properties.list"
          :key="i"
          :info="item"
          :class="{ active: item.id === selectedProp }"
          @click="selectProp"
        />
      </div>
      <div class="no-items" v-else>There is no one property yet</div>
    </section>
    <section class="data-section" id="offer">
      <h2 class="heading">Offers</h2>
      <div class="filters">
        <div class="filter-group">
          <label>
            <span>View over 400k+ only</span>
            <input type="checkbox" v-model="onlyExpensive" />
          </label>
        </div>
        <div class="filter-group">
          <label>
            <span>Order by:</span>
            <select v-model="oderOffersBy">
              <option value="" class="muted">Default</option>
              <option
                v-for="(item, i) in orderings"
                :value="item.value"
                :key="i"
              >
                {{ item.title }}
              </option>
            </select>
          </label>
        </div>
      </div>
      <div class="items-list" v-if="offers.list.length">
        <PropertyInfo
          v-for="(item, i) in offers.list"
          :key="i"
          :info="item.property"
        >
          <template v-slot:header>
            <div class="info-header">$ {{ item.price }}</div>
          </template>
          <template v-slot:footer>
            <div class="info-footer">by {{ item.offered_by }}</div>
          </template>
        </PropertyInfo>
      </div>
      <div class="no-items" v-else>There is no one offer yet</div>
    </section>
  </div>
</template>

<script>
import PropertyInfo from '@/components/PropertyInfo';

async function loadJSON(url, options = {}) {
  return fetch(url, options).then((res) => res.json());
}

function buildURL(path, params) {
  const _url = new URL(window.location.origin);
  _url.pathname = path;
  if (params) {
    Object.entries(params).forEach((entry) =>
      _url.searchParams.append(...entry)
    );
  }
  return _url;
}

export default {
  name: 'Home',
  components: { PropertyInfo },
  methods: {
    selectProp(item) {
      this.selectedProp = item.id === this.selectedProp ? null : item.id;
      this.loadOffers();
    },
    loadProperties() {
      const filter = {};
      if (this.onlyApt) {
        filter.kind = 'apartment';
      }
      this.properties.loading = true;
      loadJSON(buildURL('/api/properties', filter))
        .then((list) => {
          this.properties.list = list;
          this.properties.loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.properties.loading = false;
        });
    },
    loadOffers() {
      const filter = {};
      if (this.onlyExpensive) {
        filter.price_gte = 400000;
      }
      if (this.oderOffersBy) {
        filter[`orderBy[${this.oderOffersBy}]`] = 'ASC';
      }
      if (this.selectedProp) {
        filter.property = this.selectedProp;
      }
      this.offers.loading = true;
      loadJSON(buildURL('/api/offers', filter))
        .then((list) => {
          this.offers.list = list;
          this.offers.loading = false;
        })
        .catch((err) => {
          console.error(err);
          this.offers.loading = false;
        });
    },
  },
  watch: {
    onlyApt() {
      this.loadProperties();
    },
    onlyExpensive() {
      this.loadOffers();
    },
    oderOffersBy() {
      this.loadOffers();
    },
  },
  data() {
    return {
      onlyApt: false,
      onlyExpensive: false,
      oderOffersBy: '',
      selectedProp: null,
      orderings: [
        { title: 'Price', value: 'price' },
        { title: 'Rooms', value: 'bedrooms' },
        { title: 'Area', value: 'area' },
      ],
      properties: {
        loading: false,
        list: [],
      },
      offers: {
        loading: false,
        list: [],
      },
    };
  },
  created() {
    this.loadProperties();
    this.loadOffers();
  },
};
</script>
