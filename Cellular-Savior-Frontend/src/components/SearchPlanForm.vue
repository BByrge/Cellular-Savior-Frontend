<!-- This is not finised and is quite broken-->

<script setup>
import { useToast } from 'vue-toastification';
import { reactive } from 'vue';

const toast = useToast();
const MNOs = ['Verizon', 'T-Mobile', 'AT&T', 'USCellular', 'Boost Mobile'];

const form = reactive({
    lines: '1',
    data: '10000',
    hotspot: '0',
    talk: '10000',
    text: '10000',
    //price: '',
    financing_status: false,
    carriers: MNOs,
});


// This captures the form submission in plan
const handleSubmit = async () => {
    const plan = {
        lines: form.lines,
        data: form.data,
        hotspot: form.hotspot,
        talk: form.talk,
        text: form.text,
        //price: form.price,
        financing_status: form.financing_status,
        carriers: form.carriers,
    };

      // Store form data in local storage and redirect to /recommend
    try {
        localStorage.setItem('plan', JSON.stringify(plan));
        window.location.href = '/recommend';
    } catch (error) {
        console.error('Error recommending plan', error);
        toast.error('Plan Not Recommended -- Error')
    }
};
</script>

<template>
    <section class="bg-indigo-100">
        <div class="container m-auto max-w-2xl py-14">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-4xl text-center font-bold mb-6">Enter Plan Details:</h2>
                    <h3 class="text-xl text-center mb-6">Enter your current or desired plan, 
                      and we'll suggest better options.</h3>

                        <!-- # of lines -->
                    <div class="mb-4">
                        <label for="lines" class="block text-gray-700 font-bold mb-2">Lines</label>
                        <select v-model="form.lines" id="lines" name="lines" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" required>
                            <option v-for="number in 12" :key="number" :value="number">{{ number }}</option>
                        </select>
                    </div>

                    <!-- Data -->
                    <div class="mb-4">
                        <label for="data" class="block text-gray-700 font-bold mb-2">Data</label>
                        <select v-model.number="form.data" id="data" name="data" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1">
                            <option :value="0">0</option>
                            <option :value="5">5</option>
                            <option :value="10">10</option>
                            <option :value="20">20</option>
                            <option :value="50">50</option>
                            <option :value="10000">Unlimited</option>
                        </select>
                    </div>

                    <!-- Hotspot -->
                    <div class="mb-4">
                        <label for="hotspot" class="block text-gray-700 font-bold mb-2">Hotspot</label>
                        <select v-model.number="form.hotspot" id="hotspot" name="hotspot" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1">
                            <option :value="0">0</option>
                            <option :value="5">5</option>
                            <option :value="10">10</option>
                            <option :value="20">20</option>
                            <option :value="50">50</option>
                            <option :value="10000">Unlimited</option>
                        </select>
                    </div>

                    <!-- Talk -->
                    <div class="mb-4">
                        <label for="talk" class="block text-gray-700 font-bold mb-2">Talk</label>
                        <select v-model.number="form.talk" id="talk" name="talk" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1">
                            <option :value="0">0</option>
                            <option :value="50">50</option>
                            <option :value="200">200</option>
                            <option :value="500">500</option>
                            <option :value="1000">1000</option>
                            <option :value="10000">Unlimited</option>
                        </select>
                    </div>

                    <!-- Text -->
                    <div class="mb-4">
                        <label for="text" class="block text-gray-700 font-bold mb-2">Text</label>
                        <select v-model.number="form.text" id="text" name="text" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1 ">
                            <option :value="0">0</option>
                            <option :value="50">50</option>
                            <option :value="200">200</option>
                            <option :value="500">500</option>
                            <option :value="1000">1000</option>
                            <option :value="10000">Unlimited</option>
                        </select>
                    </div>

                    <!-- This may or may not be part of the form -->
                    <!-- Price -->
                    <!-- <div class="mb-4">
                        <label for="price" class="block text-gray-700 font-bold mb-2">Price</label>
                        <input v-model="form.price" type="number" id="price" name="price" class="border rounded w-full py-2 px-3" min="0" step="1" />
                    </div> -->

                        <!-- This may or may not be part of the form -->
                        <!-- Financing Status
                    <div class="mb-4">
                        <label for="financing_status" class="block text-gray-700 font-bold mb-2">Financing Status</label>
                        <input v-model="form.financing_status" type="checkbox" id="financing_status" name="financing_status" class="border rounded py-2 px-3" />
                    </div> -->
                    
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

                        <div class="mb-6">
                            <label v-for="mno in MNOs" :key="mno" class="inline-flex items-center mr-4">
                                <input type="checkbox" :value="mno" v-model="form.carriers" class="rounded">
                                <span class="ml-2">{{ mno }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button class="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit">
                           Recommend Plans 
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </section>
</template>