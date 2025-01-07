<script setup>
import Plan from './Plan.vue';
import { defineProps, onMounted, reactive, computed } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios'

const state = reactive({
    plans: [],
    isLoading: true,
    currentPage: 1,
    itemsPerPage: 4,
});

console.log(state.plans);

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
});

const totalPages = computed(() => {
    return Math.ceil(state.plans.length / state.itemsPerPage);
});

const paginatedPlans = computed(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    return state.plans.slice(start, end);
});

const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        state.currentPage = page;
    }
};

onMounted(async () => {
    try {
        let plan = JSON.parse(localStorage.getItem('plan'));

        const response = await axios.post('https://api.cellularsavior.com/recommend', plan);
        state.plans = response.data.results;
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
                Recommended Plans
            </h2>
            <!-- Show Loading spinner while loading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <PulseLoader />
            </div>
            <!-- Show Plans when done loading-->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Plan 
                v-for="plan in paginatedPlans" 
                :key="plan.id" 
                :plan="plan" />
            </div>
            <!-- Pagination Controls -->
            <div v-if="totalPages > 1" class="flex justify-center mt-6">
                <button 
                    v-for="page in totalPages" 
                    :key="page" 
                    @click="changePage(page)" 
                    :class="{'bg-indigo-500 text-white': page === state.currentPage, 'bg-white text-indigo-500': page !== state.currentPage}" 
                    class="px-4 py-2 mx-1 border rounded">
                    {{ page }}
                </button>
            </div>
        </div>
    </section>
    
</template>