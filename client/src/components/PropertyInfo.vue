<template>
  <div class="info-card" v-on:click="$emit('click', info)">
    <slot name="header"></slot>
    <div class="prop-info">
      <div
        v-for="(item, i) in fields"
        :key="i"
        class="card-line"
        :class="item.prop"
      >
        <div>{{ item.title }}</div>
        <div>{{ info[item.prop] }}</div>
      </div>
    </div>
    <slot name="footer" class="info-footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'PropertyInfo',
  props: {
    info: Object,
  },
  data() {
    return {
      fields: [
        { prop: 'kind', title: 'Property Type' },
        { prop: 'location', title: 'Location' },
        { prop: 'bedrooms', title: 'Bedrooms' },
        { prop: 'area', title: 'Area' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
