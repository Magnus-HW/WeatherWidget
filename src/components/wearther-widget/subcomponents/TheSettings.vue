<script setup lang="ts">
import { computed, watch, type CSSProperties } from 'vue';
import draggable from 'vuedraggable'
import { Card } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';
import DragHandleIcon from "@/assets/icons/DragHandleIcon.vue";
import CitySearch from "./CitySearch.vue";

import { actionsController } from '@/domains/weather-widget/actionsController';
import { useWeatherStore } from "@/stores/weatherCities";

import type { CityWeather } from "@/domains/weather-widget/types"

const weatherStore = useWeatherStore()

const citiesWeatherList = computed({
  get() {
    return weatherStore.weatherStoreData
  },
  set(value) {
    actionsController.updateWeatherList(value)
  }
});

const handleDelete = (cityWeather: CityWeather) => {
  actionsController.deleteCityWeather({ ...cityWeather });
}

const cardHeadStyle: CSSProperties = { 'padding': '10px', 'min-height': '0px', 'font-weight': '600' }
</script>

<template>
  <Card 
    :title="'Settings'" 
    style="width: 100%; 
    background-color: rgba(163, 221, 255, 0.8);" 
    :head-style="cardHeadStyle"
    :body-style="{'padding': '10px'}"
  >
    <draggable 
      v-model="citiesWeatherList" 
      handle=".handle"
      item-key="id"
    >
      <template #item="{ element }">
        <li class="city-bar" :key="element.id">
          <DragHandleIcon class="handle" />
          <div class="text">
            {{ `${element.name}, ${element.sys.country}` }}
          </div>
          <Button 
            type="text" 
            size="large" 
            shape="circle" 
            :style="{ 'padding-top': '8px' }" 
            class="button"
            @click="handleDelete(element)"
          >
            <template #icon>
              <DeleteIcon class="delete-icon" />
            </template>
          </Button>
        </li>
      </template>
    </draggable>
    <CitySearch class="search" />
  </Card>
</template>

<style scoped lang="scss">
.city-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 0px 0px 0px 10px;
  background-color: #6bf7c8;
  border-radius: 5px;
}

.text {
  margin-left: 10px;
}

.button {
  margin-left: auto;
}
</style>