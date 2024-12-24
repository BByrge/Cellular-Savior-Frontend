<!-- This is not finised and is quite broken-->

<script setup>
import router from '@/router';
import { useToast } from 'vue-toastification';
import { reactive } from 'vue';
import axios from 'axios';

const form = reactive({
    lines: '',
    data: '',
    hotspot: '',
    talk: '',
    text: '',
    price: '',
    financing_status: false,
    carriers: [],
});

const toast = useToast();

// This captures the form submission in plan
const handleSubmit = async () => {
    const plan = {
        lines: form.lines,
        data: form.data,
        hotspot: form.hotspot,
        talk: form.talk,
        text: form.text,
        price: form.price,
        financing_status: form.financing_status,
        carriers: form.carriers,
    };

      // Try to get recommended plans
    try {
        const response = await axios.post('/api/recommend', plan);
        const recommendedPlans = response.data;
        console.log('Recommended Plans:', recommendedPlans);
        //toast.success('Plan Recommended');
    } catch (error) {
        console.error('Error recommending plan', error);
        toast.error('Plan Not Recommended -- Error')
    }
};
</script>

<template>
    <section class="bg-purple-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-4xl text-center font-bold mb-6">Enter Plan Details:</h2>
                    <h3 class="text-xl text-center mb-6">Enter your current or desired plan, 
                      and we'll suggest better options.</h3>

                    <div class="mb-4">
                        <label for="lines" class="block text-gray-700 font-bold mb-2">Lines</label>
                        <input v-model="form.lines" type="number" id="lines" name="lines" class="border rounded w-full py-2 px-3" required />
                    </div>

                    <div class="mb-4">
                        <label for="data" class="block text-gray-700 font-bold mb-2">Data</label>
                        <input v-model="form.data" type="number" id="data" name="data" class="border rounded w-full py-2 px-3" />
                    </div>

                    <div class="mb-4">
                        <label for="hotspot" class="block text-gray-700 font-bold mb-2">Hotspot</label>
                        <input v-model="form.hotspot" type="number" id="hotspot" name="hotspot" class="border rounded w-full py-2 px-3" />
                    </div>

                    <div class="mb-4">
                        <label for="talk" class="block text-gray-700 font-bold mb-2">Talk</label>
                        <input v-model="form.talk" type="number" id="talk" name="talk" class="border rounded w-full py-2 px-3" />
                    </div>

                    <div class="mb-4">
                        <label for="text" class="block text-gray-700 font-bold mb-2">Text</label>
                        <input v-model="form.text" type="number" id="text" name="text" class="border rounded w-full py-2 px-3" />
                    </div>

                    <div class="mb-4">
                        <label for="price" class="block text-gray-700 font-bold mb-2">Price</label>
                        <input v-model="form.price" type="number" step="0.01" id="price" name="price" class="border rounded w-full py-2 px-3" />
                    </div>

                    <div class="mb-4">
                        <label for="financing_status" class="block text-gray-700 font-bold mb-2">Financing Status</label>
                        <input v-model="form.financing_status" type="checkbox" id="financing_status" name="financing_status" class="border rounded py-2 px-3" />
                    </div>

                    <div class="mb-4">
                        <label for="carriers" class="block text-gray-700 font-bold mb-2">Carriers</label>
                        <input v-model="form.carriers" type="text" id="carriers" name="carriers" class="border rounded w-full py-2 px-3" placeholder="Comma separated list of carriers" />
                    </div>

                    <div>
                        <button class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit">
                            Add Plan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>