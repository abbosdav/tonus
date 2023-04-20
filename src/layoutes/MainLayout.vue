<template>
   <div class="main">
      <header-component/>
      <div class="main__wrapper">
         <div class="main__sidebar">
            <sidebar-component/>
         </div>
         <div class="main__content">
            <router-view></router-view>
         </div>
      </div>
   </div>
</template>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import SidebarComponent from '@/components/SidebarComponent.vue';
export default {
   components:{
      HeaderComponent, SidebarComponent
   },
   setup() {
      
   },
}
</script>
<style lang="scss" scoped>
   .main{
      width: 100%;
      &__wrapper{
         display: flex;
      }
      &__sidebar{
         flex: 2;
         & .sidebar .p-menu{
            border: unset !important;
         }
      }
      &__content{
         flex: 10;
         background-color: rgb(240, 238, 238);
      }
   }
</style>>
