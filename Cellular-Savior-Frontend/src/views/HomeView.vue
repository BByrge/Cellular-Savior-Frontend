<script setup>
import Hero from '@/components/Hero.vue';
import SearchPlanForm from '@/components/SearchPlanForm.vue';
import HomeBanner from '@/components/HomeBanner.vue';

// Remove lastPlansPage from localStorage. This ensures state while allowing back button to work.
localStorage.removeItem('lastPlansPage');
</script>

<template>
    <div class="home-view bg-indigo-100">
        <Hero />
        <HomeBanner />
        <SearchPlanForm />
    </div>
</template>