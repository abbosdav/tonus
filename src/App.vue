<template>
  <component :is="layout"/>
</template>


<script>
  import EmptyLayout from './layoutes/EmptyLayout.vue';
  import MainLayout from './layoutes/MainLayout.vue';
  import { computed, onMounted } from '@vue/runtime-core';
  import { useRoute } from 'vue-router';
  import router from './router';
  import { getCookie } from './utils/cookies';
export default {
  components:{
    EmptyLayout,
    MainLayout
  },
  setup() {
    const route = useRoute()
    const layout = computed(()=> route.meta.layout + '-layout')

    const checkToken = ()=>{
      if(!getCookie('accessToken')){
        router.push('/login')
      }
    }

    onMounted(()=>{
      document.title = 'GYM'
      checkToken()
    })

    return{
      layout
    }
  },
}
</script>
<style lang="scss">
@import './styles/null.scss';
@import './styles/universal.scss';


</style>