<script setup lang="ts">
import { useWeatherStore } from '@/stores/weatherCities';
import { actionsController } from "@/domains/weather-widget/actionsController";
import { Button } from 'ant-design-vue';
import { onMounted, ref, computed, watch } from 'vue';
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import CityWeather from './subcomponents/CityWeather.vue';
import TheSettings from './subcomponents/TheSettings.vue';
import GearIcon from '@/assets/icons/GearIcon.vue';
import MainLoadingStub from "@/assets/icons/MainLoadingStub.vue";
import TheInitial from './subcomponents/TheInitial.vue';

onMounted( async () =>
{
  await actionsController.initializeCities()
  initialization.value = false
})
const initialization = ref(true)

const weatherStore = useWeatherStore()
const citiesWeatherList = computed(() => weatherStore.weatherStoreData);
const isEmptyCitiesWeatherList = computed(() => citiesWeatherList.value.length == 0)

watch(isEmptyCitiesWeatherList, (isEmpty: boolean) => {
  //or this could be done by emitting/handling events
  if(isEmpty) {
    showSettings.value = false;
  }
})
const handleSettingClick = (): void =>
{
  showSettings.value = !showSettings.value;
}

const showSettings = ref(false)
</script>

<template>
  <div v-if="!initialization" class="main-view" >
    <Button 
      class="close-button" 
      type="text" 
      size="large" 
      shape="circle" 
      @click="handleSettingClick"
    >
      <template #icon v-if="!isEmptyCitiesWeatherList">
        <GearIcon class="icon" v-if="!showSettings" />
        <CloseIcon v-else />
      </template>
    </Button>
    <div v-if="showSettings == false">
      <div v-if="!isEmptyCitiesWeatherList">
        <CityWeather v-for="cityWeather in citiesWeatherList" 
          :cityWeather="cityWeather" 
          v-bind:key="cityWeather.id" 
        />
      </div>
      <TheInitial v-else />
    </div>
    <div v-else>
      <TheSettings />
    </div>
  </div>
  <MainLoadingStub v-else/>
</template>

<style scoped lang="scss">
.main-view {
  width: 220px;
  position: relative;
}

.close-button {
  position: absolute;
  right: 10px;
  top: 4px;
  z-index: 10;
}
.icon {
  margin: 1px 0px 0px 1px;
}
.loading-stub {
  width: 50px;
  position: absolute;
  top:10px;
}
</style>