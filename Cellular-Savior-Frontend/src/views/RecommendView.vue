<script setup>
import Recommendations from '../components/Recommendations.vue';

// Set lastPlansPage in localStorage. This ensures state while allowing back button to work. For component reuse.
localStorage.setItem('lastPlansPage', '/recommend');
</script>

<template> 
<Recommendations />
</template>
