<script setup>
import Hero from '@/components/Hero.vue';
import SearchPlanForm from '@/components/SearchPlanForm.vue';

// Remove lastPlansPage from localStorage. This ensures state while allowing back button to work.
localStorage.removeItem('lastPlansPage');
</script>

<template>
<!-- <Hero title="Test Title" subtitle="Test"/> -->
<Hero />
<SearchPlanForm />
</template>