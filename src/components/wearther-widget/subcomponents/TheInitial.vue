<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { Card } from 'ant-design-vue';
import CitySearch from './CitySearch.vue';
const cardBodyStyle: CSSProperties = {
  'padding': '10px', 'display': 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'center',
  'background-color': 'rgba(163, 221, 255, 0.8)'
}
const cardHeadStyle: CSSProperties = { 'padding': '10px', 'min-height': '0px', 'font-weight': '600', 'display': 'flex', 'justify-content': 'center' }
</script>

<template>
  <Card 
    class="initial-card" 
    title="Enter your country" 
    :bodyStyle="cardBodyStyle" 
    :headStyle="cardHeadStyle"
  >
    <CitySearch />
  </Card>
</template>

<style lang="scss">
.initial-card {
  background-color: rgba(163, 221, 255, 0.8);

  &__text {
    margin-bottom: 10px;
    font-weight: 600;
  }
}
.initial-card .ant-card-head-title{
  display: flex !important;
  justify-content: center !important;
}
</style>