<script setup lang="ts">
import { Input, Button } from 'ant-design-vue';
import { actionsController } from '@/domains/weather-widget/actionsController';
import { ref } from "vue";
import EnterIcon from "@/assets/icons/EnterIcon.vue";

const searchVal = ref<string>("");
const handleEnterSity = (val: string) => {
  const serachArr = val.split(',')
  const cityObj = {name: serachArr[0], country: serachArr[1] }
  actionsController.addCityWeather(cityObj);
  searchVal.value = ""
}

</script>

<template>
  <div class="input">
    <Input 
      v-model:value="searchVal"  
      placeholder="Enter city name" 
      @keydown.enter="handleEnterSity(searchVal)"
    />
    <Button 
      class="input__button" 
      type="text" size="large" 
      shape="circle" 
      @click="handleEnterSity(searchVal)"
    >
      <template #icon>
        <EnterIcon />
      </template>
    </Button>
  </div>
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  display: flex;
  &__button {
    padding-top: 5px
  }
}
</style>