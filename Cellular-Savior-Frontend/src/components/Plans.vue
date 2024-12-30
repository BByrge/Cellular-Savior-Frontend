<script setup>
import Plan from './Plan.vue';
import { defineProps, onMounted, reactive } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { RouterLink } from 'vue-router';
import axios from 'axios'

const state = reactive({
    plans: [],
    isLoading: true,
});

console.log(state.plans);

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
});


onMounted(async () => {
    try {
        const response = await axios.get('/api/plans');
        state.plans = response.data;
    } catch (error) {
        console.error('Error fetching plans', error);
    } finally {
        state.isLoading = false;
    }
});

</script>

<template>

    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-indigo-900 mb-6 text-center">
                Browse plans
            </h2>
            <!-- Show Loading spinner while loading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>
            <!-- Show Plans when done loading-->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap6">
                <Plan 
                v-for="plan in state.plans.slice(0, limit || state.plans.length)" 
                :key="plan.id" 
                :plan="plan" />
            </div>
        </div>
    </section>
    
</template>