<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import logo from '@/assets/CellularSaviorLogoTransparent.png';
import axios from 'axios';
import { onMounted, watch, ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

let user = ref(null);
const route = useRoute();

const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};


const isValidJWT = async (token) => {
  if (!token) {
    return false;
  }
  try {
    const response = await axios.post('/api/auth/verifyjwt', {
      token,
    });
    return true;
  } catch (error) {
    console.error('Error verifying JWT', error);
    // Remove invalid token
    localStorage.removeItem('authToken');
    return false;
  }

};

const getUser = async () => {
  const token = localStorage.getItem('authToken');
  let valid = await isValidJWT(token);
  if (!valid) {
    return null;
  }
  let jwtDecoded = jwtDecode(token);
  return jwtDecoded;
};

const checkUser = async () => {
  user.value = await getUser();
  user.roles = user.value ? user.value.roles : [];
};

onMounted(() => {
  checkUser();
});

// Watch for route changes and check user
watch(route, checkUser);
</script>

<template>

    <nav class="bg-pink-900 border-b border-pink-600">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">

            <!-- Logo -->
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <img class="h-10 w-auto" :src="logo" alt="Cellular Savior" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2"
                ></span>

            </RouterLink>
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                
                <RouterLink
                to="/"
                  :class="[isActiveLink('/') 
                  ? 'bg-pink-900' 
                  : 'hover:bg-gray-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2', 
                  'rounded-md'
                  ]"
                  >Home</RouterLink>

                <RouterLink
                  to="/plans"
                  :class="[isActiveLink('/plans') 
                  ? 'bg-pink-900' 
                  : 'hover:bg-gray-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2', 
                  'rounded-md'
                  ]"
                  >Plans</RouterLink >

                <RouterLink 
                  v-if="!user"
                  to="/login"
                  :class="[isActiveLink('/login') 
                  ? 'bg-pink-900' 
                  : 'hover:bg-gray-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2', 
                  'rounded-md'
                  ]"
                  >Login</RouterLink>

                <RouterLink
                  v-if="user && user.roles.includes('admin')"
                  to="/admin"
                  :class="[isActiveLink('/admin') 
                  ? 'bg-pink-900' 
                  : 'hover:bg-gray-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2', 
                  'rounded-md'
                  ]"
                  >Admin</RouterLink>

                <RouterLink
                  v-if="user"
                  to="/logout"
                  :class="[isActiveLink('/profile') 
                  ? 'bg-pink-900' 
                  : 'hover:bg-gray-900 hover:text-white',
                  'text-white', 
                  'px-3', 
                  'py-2', 
                  'rounded-md'
                  ]"
                  >Logout</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>