<script setup>
import { useToast } from 'vue-toastification';
import { reactive } from 'vue';
import axios from 'axios';

const form = reactive({
    carrier : '',
    name : '',
    data : '10000',
    talk : '10000',
    text : '10000',
    hotspot : '0',
    // The key must be a string for json. This is admin only so the complicated formatting is not an issue.
    price : '{"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0}',
    payoff_deal : false,
    mvno : false,
    prepaid : false,
    tax_inclusive : false,
    description : '',
});

const toast = useToast();

// This captures the form submission in plan
const handleSubmit = async () => {
    const plan = {
        carrier: form.carrier,
        name: form.name,
        data: form.data,
        talk: form.talk,
        text: form.text,
        hotspot: form.hotspot,
        price: form.price,
        payoff_deal: form.payoff_deal,
        mvno: form.mvno,
        prepaid: form.prepaid,
        tax_inclusive: form.tax_inclusive,
        description: form.description,
    };

      // Try to create plan
    try {
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
        }; 
        let data = {
            carrier: form.carrier,
            name: form.name,
            data: form.data,
            talk: form.talk,
            text: form.text,
            hotspot: form.hotspot,
            price: form.price,
            payoff_deal: form.payoff_deal,
            mvno: form.mvno,
            prepaid: form.prepaid,
            tax_inclusive: form.tax_inclusive,
            description: form.description,
        };
        const response = await axios.post('/api/plans', data, config);
        const createdPlan = response.data;
        console.log('Created Plan', createdPlan);
        // Set form back to default values
        form.carrier = '';
        form.name = '';
        form.data = '10000';
        form.talk = '10000';
        form.text = '10000';
        form.hotspot = '0';
        form.price = '{"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0}';
        form.payoff_deal = false;
        form.mvno = false;
        form.prepaid = false;
        form.tax_inclusive = false;
        form.description = '';
        toast.success('Plan Created Successfully');
    } catch (error) {
        console.error('Error Creating plan', error);
        toast.error('Plan Not Created -- Error')
    }
};
</script>

<template>
    <section class="bg-purple-50">
        <div class="container m-auto max-w-2xl py-14">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="handleSubmit">
                    <h2 class="text-4xl text-center font-bold mb-6">Enter Plan Details:</h2>

                    <!-- Carrier -->
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="carrier">
                            Carrier
                        </label>
                        <input v-model="form.carrier" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" id="carrier" type="text" placeholder="Carrier" required>
                    </div>

                    <!-- Plan Name -->
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="name">
                            Plan Name
                        </label>
                        <input v-model="form.name" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" id="name" type="text" placeholder="Plan Name" required>
                    </div>

                    <!-- Data -->
                    <div class="mb-4">
                        <label for="data" class="block text-gray-700 font-bold mb-2">Data</label>
                        <input v-model="form.data" id="data" name="data" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" required>
                    </div>

                    <!-- Talk -->
                    <div class="mb-4">
                        <label for="talk" class="block text-gray-700 font-bold mb-2">Talk</label>
                        <input v-model="form.talk" id="talk" name="talk" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" required>
                    </div>

                    <!-- Text -->
                    <div class="mb-4">
                        <label for="text" class="block text-gray-700 font-bold mb-2">Text</label>
                        <input v-model="form.text" id="text" name="text" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" required>
                    </div>

                    <!-- Hotspot -->
                    <div class="mb-4">
                        <label for="hotspot" class="block text-gray-700 font-bold mb-2">Hotspot</label>
                        <input v-model="form.hotspot" id="hotspot" name="hotspot" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" required>
                    </div>

                    <!-- Price -->
                    <div class="mb-4">
                        <label for="price" class="block text-gray-700 font-bold mb-2">Price (Use the provided format. Add or remove numbers as needed. 12 Max.)</label>
                        <input v-model="form.price" id="price" name="price" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" required>
                    </div>

                    <!-- Payoff Deal -->
                    <div class="mb-4">
                        <label for="payoff_deal" class="block text-gray-700 font-bold mb-2">Payoff Deal</label>
                        <input v-model="form.payoff_deal" type="checkbox" id="payoff_deal" name="payoff_deal" class="border rounded py-2 px-3 hover:outline hover:outline-1" />
                    </div>

                    <!-- MVNO -->
                    <div class="mb-4">
                        <label for="mvno" class="block text-gray-700 font-bold mb-2">MVNO</label>
                        <input v-model="form.mvno" type="checkbox" id="mvno" name="mvno" class="border rounded py-2 px-3 hover:outline hover:outline-1" />
                    </div>

                    <!-- Prepaid -->
                    <div class="mb-4">
                        <label for="prepaid" class="block text-gray-700 font-bold mb-2">Prepaid</label>
                        <input v-model="form.prepaid" type="checkbox" id="prepaid" name="prepaid" class="border rounded py-2 px-3 hover:outline hover:outline-1" />   
                    </div>

                    <!-- Tax Inclusive -->
                    <div class="mb-4">
                        <label for="tax_inclusive" class="block text-gray-700 font-bold mb-2">Tax Inclusive</label>
                        <input v-model="form.tax_inclusive" type="checkbox" id="tax_inclusive" name="tax_inclusive" class="border rounded py-2 px-3 hover:outline hover:outline-1" />
                    </div>

                    <!-- Description -->
                    <div class="mb-4">
                        <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea v-model="form.description" id="description" name="description" class="border rounded w-full py-2 px-3 hover:outline hover:outline-1" required></textarea>
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button class="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline" type="submit">
                           Create Plan
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </section>
</template>
