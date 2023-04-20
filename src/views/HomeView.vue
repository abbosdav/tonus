<template>
  <h1>Home page</h1>
  <button @click="remove">Logout</button>
</template>

<script setup>
import { getCookie } from '@/utils/cookies';

const remove = ()=>{
  
  console.log(getCookie('accessToken'));
}


</script>
