<script setup lang="ts">
import { computed, ref, type CSSProperties } from 'vue';
import { Card } from 'ant-design-vue';
import DirectionIcon from "@/assets/icons/DIrectionIcon.vue"
import PressureIcon from '@/assets/icons/PressureIcon.vue';
import HumidityIcon from '@/assets/icons/HumidityIcon.vue';
import VisibilityIcon from "@/assets/icons/VisibilityIcon.vue"
import PictureLoadingStub from "@/assets/icons/LoadingPuctureStub.vue"

import type { CityWeather } from '@/domains/weather-widget/types';

const props = defineProps<{ cityWeather: CityWeather }>();

//rendered fields value
const title = computed(() => `${props.cityWeather.name}, ${props.cityWeather.sys.country}`);
const windDir = computed(() => {
  const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
  const deg = Number((props.cityWeather.wind.deg / 22.5).toFixed());
  return compassSector[deg];
})

const windIconAngle = computed(() => {
  return props.cityWeather.wind.deg + 40
})

const pressure = computed(() => (props.cityWeather.main.pressure / 1.333).toFixed(1))

const descripption = computed(() => {
  const str = props.cityWeather.weather[0].description
  return str.charAt(0).toUpperCase() + str.slice(1) + "."
})

const visibility = computed(() => {
  const visibilityKm = (props.cityWeather.visibility / 1000).toFixed(1)
  return `${visibilityKm}km`
})

const weatherPic = ref(`https://openweathermap.org/img/wn/${props.cityWeather.weather[0].icon}@2x.png`)
const isPictureLoaded = ref(false)
const onLoadPicture = () =>
{
  isPictureLoaded.value = true
}

//Card inline-styles
const cardBodyStyle: CSSProperties = {
  'padding': '10px', 'display': 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'center'
}
const cardHeadStyle: CSSProperties = { 'padding': '10px', 'min-height': '0px', 'font-weight': '600' }
</script>

<template>
  <Card :title="title" class="weather-card" :bodyStyle="cardBodyStyle" :headStyle="cardHeadStyle">
    <div class="weather-card__general-info">
      <div v-show="isPictureLoaded">
        <img class="weather-card__general-info__img" :src="weatherPic" @load="onLoadPicture" />
      </div>
      <PictureLoadingStub v-if="!isPictureLoaded" />
      <div class="weather-card__general-info__temp">
        {{ `${(props.cityWeather.main.temp).toFixed(0)}°C` }}
      </div>
    </div>
    <div class="weather-card__feels_like">
      {{ `Feels like ${(props.cityWeather.main.feels_like).toFixed(1)}°C. ${descripption}` }}
    </div>
    <div class="weather-card__info">
      <div class="weather-card__info__wind">
        <DirectionIcon class="weather-card__info__wind__icon icon-style"
          :style="{ 'transform': `rotate(${windIconAngle}deg)` }" />
        {{ `${props.cityWeather.wind.speed}m\\s ${windDir}` }}
      </div>
      <div class="weather-card__info__humidity">
        <HumidityIcon class="weather-card__info__humidity__icon icon-style" />
        {{ `${props.cityWeather.main.humidity}%` }}
      </div>
      <div class="weather-card__info__pressure">
        <PressureIcon class="weather-card__info__pressure__icon icon-style" />{{ `${pressure}mmHg` }}
      </div>
      <div class="weather-card__info__visibility">
        <VisibilityIcon class="weather-card__info__visibility__icon icon-style" />
        {{ visibility }}
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.weather-card {
  width: 100%;
  background-color: rgba(163, 221, 255, 0.8);
  margin-bottom: 10px;

  &__general-info {
    display: flex;
    align-items: center;

    &__temp {
      font-size: 40px;
      margin-right: 25px;
    }
  }

  &__feels_like {
    margin-bottom: 10px;
  }

  &__info {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 12px;
    row-gap: 5px;

    &__wind {
      &__icon {
        margin-left: 5px;
      }
    }

    div {
      display: flex;
      align-items: center;
      min-width: fit-content;
    }
  }

  .icon-style {
    margin-right: 5px;
  }
}
</style>