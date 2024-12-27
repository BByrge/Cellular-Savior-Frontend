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

                        <!-- # of lines -->
                    <div class="mb-4">
                        <label for="lines" class="block text-gray-700 font-bold mb-2">Lines</label>
                        <select v-model="form.lines" id="lines" name="lines" class="border rounded w-full py-2 px-3" required>
                            <option v-for="number in 12" :key="number" :value="number">{{ number }}</option>
                        </select>
                    </div>
                    
                    <!-- Data -->
                    <div class="mb-4">
                        <label for="data" class="block text-gray-700 font-bold mb-2">Data</label>
                        <select v-model="form.data" id="data" name="data" class="border rounded w-full py-2 px-3">
                            <option value="0">0</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="-1">Unlimited</option>
                        </select>
                    </div>

                    <!-- Hotspot -->
                    <div class="mb-4">
                        <label for="hotspot" class="block text-gray-700 font-bold mb-2">Hotspot</label>
                        <select v-model="form.hotspot" id="hotspot" name="hotspot" class="border rounded w-full py-2 px-3">
                            <option value="0">0</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="-1">Unlimited</option>
                        </select>
                    </div>

                    <!-- Talk -->
                    <div class="mb-4">
                        <label for="talk" class="block text-gray-700 font-bold mb-2">Talk</label>
                        <select v-model="form.talk" id="talk" name="talk" class="border rounded w-full py-2 px-3">
                            <option value="0">0</option>
                            <option value="50">50</option>
                            <option value="200">200</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="-1">Unlimited</option>
                        </select>
                    </div>

                    <!-- Text -->
                    <div class="mb-4">
                        <label for="text" class="block text-gray-700 font-bold mb-2">Text</label>
                        <select v-model="form.text" id="text" name="text" class="border rounded w-full py-2 px-3">
                            <option value="0">0</option>
                            <option value="50">50</option>
                            <option value="200">200</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="-1">Unlimited</option>
                        </select>
                    </div>

                    <!-- Price -->
                    <div class="mb-4">
                        <label for="price" class="block text-gray-700 font-bold mb-2">Price</label>
                        <input v-model="form.price" type="number" step="10" id="price" name="price" class="border rounded w-full py-2 px-3" />
                    </div>

                        <!-- Financing Status -->
                    <div class="mb-4">
                        <label for="financing_status" class="block text-gray-700 font-bold mb-2">Financing Status</label>
                        <input v-model="form.financing_status" type="checkbox" id="financing_status" name="financing_status" class="border rounded py-2 px-3" />
                    </div>
                    
                    <!-- Carriers -->
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">
                            Networks (MNO)
                            <sup class="text-blue-500 ml-1 cursor-pointer relative group">
                                ?
                                <span
                                    class="absolute hidden group-hover:block bg-white border border-gray-300 text-gray-700 text-sm px-2 py-1 rounded mt-2 w-96"
                                >
                                    MVNOs (TracFone, Mint, Google Fi, etc.) using these networks will also be included in results.
                                </span>
                            </sup>
                        </label>

                        <div>
                            <label class="inline-flex items-center mr-4">
                                <input type="checkbox" name="carriers" value="Verizon" v-model="form.carriers" class="rounded">
                                <span class="ml-2">Verizon</span>
                            </label>
                            <label class="inline-flex items-center mr-4">
                                <input type="checkbox" name="carriers" value="T-Mobile" v-model="form.carriers" class="rounded">
                                <span class="ml-2">T-Mobile</span>
                            </label>
                            <label class="inline-flex items-center mr-4">
                                <input type="checkbox" name="carriers" value="AT&T" v-model="form.carriers" class="rounded">
                                <span class="ml-2">AT&T</span>
                            </label>
                            <label class="inline-flex items-center mr-4">
                                <input type="checkbox" name="carriers" value="USCellular" v-model="form.carriers" class="rounded">
                                <span class="ml-2">USCellular</span>
                            </label>
                            <label class="inline-flex items-center mr-4">
                                <input type="checkbox" name="carriers" value="Boost Mobile" v-model="form.carriers" class="rounded">
                                <span class="ml-2">Boost Mobile</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit">
                           Recommend Plans 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>