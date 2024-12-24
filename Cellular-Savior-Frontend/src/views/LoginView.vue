<script setup>
import axios from 'axios';
import LoginButton from '@/components/LoginButton.vue';

const login = () => {
  axios.get('/api/auth/initiate')
    .then(response => {
      console.log(response.data);
      const url = response.data.url;
      window.location.replace(url);
    })
    .catch(error => {
      console.error('Error logging in', error);
    });
};
</script>

<template>
  <div>
    <h1>Login View</h1>
    <LoginButton @click="login" />
  </div>
</template>