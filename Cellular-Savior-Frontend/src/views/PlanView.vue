<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();

const planId = route.params.id;

const state = reactive({
  plan: {},
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.cellularsavior.com/plans/${planId}`);
    state.plan = response.data;
  } catch (error) {
    console.error('Error fetching plan', error);
  } finally {
    state.isLoading = false;
  }
});
</script>
<template>
    <BackButton />
    <section v-if="!state.isLoading" class="bg-gray-100">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-700 mb-4">{{ state.plan.carrier }}</div>
                        <h1 class="text-3xl font-bold mb-4 text-gray-900">{{ state.plan.name }}</h1>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-gray-900 text-lg font-bold mb-6">Plan Description</h3>
                        <p class="mb-4 text-gray-700">{{ state.plan.description }}</p>

                        <h3 class="text-gray-900 text-lg font-bold mb-2">Price</h3>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left text-gray-700">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">Lines</th>
                                        <th scope="col" class="px-6 py-3">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="([line, price], i) in Object.entries(state.plan.price)" :key="i" class="odd:bg-white even:bg-gray-100 border-b">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ line }}</td>
                                        <td class="px-6 py-4">{{ price }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Plan Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-2xl font-bold mb-6 text-gray-900">Plan Info</h3>
                        <h2 class="text-xl text-gray-700">{{ state.plan.carrier }}</h2>
                        <hr class="my-4" />
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left text-gray-700">
                                <tbody>
                                    <tr class="odd:bg-white even:bg-gray-100 border-b">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Data</td>
                                        <td class="px-6 py-4">{{ state.plan.data === 10000 ? 'Unlimited' : state.plan.data + ' GB' }}</td>
                                    </tr>
                                    <tr class="odd:bg-white even:bg-gray-100 border-b">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Hotspot</td>
                                        <td class="px-6 py-4">{{ state.plan.hotspot === 10000 ? 'Unlimited' : state.plan.hotspot + ' GB' }}</td>
                                    </tr>
                                    <tr class="odd:bg-white even:bg-gray-100 border-b">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Talk</td>
                                        <td class="px-6 py-4">{{ state.plan.talk === 10000 ? 'Unlimited' : state.plan.talk + ' minutes' }}</td>
                                    </tr>
                                    <tr class="odd:bg-white even:bg-gray-100 border-b">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Text</td>
                                        <td class="px-6 py-4">{{ state.plan.text === 10000 ? 'Unlimited' : state.plan.text + ' messages' }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6 text-gray-900">Links</h3>
                        <a
                            :href="state.plan.url"
                            target="_blank"
                            class="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        >Sign up</a>
                    </div>
                </aside>
            </div>
        </div>
    </section>
    <div v-else class="text-center text-gray-500 py-6">
        <PulseLoader />
    </div>
</template>
