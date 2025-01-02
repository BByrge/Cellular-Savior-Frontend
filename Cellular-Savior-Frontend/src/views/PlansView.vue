<script setup>
import Plans from '@/components/Plans.vue';

// Set lastPlansPage in localStorage. This ensures state while allowing back button to work. For component reuse.
localStorage.setItem('lastPlansPage', '/plans');
</script>

<template> 
<Plans />
</template>