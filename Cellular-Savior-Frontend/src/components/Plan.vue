<script setup>
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  plan: Object
});

const showFullDescription = ref(false);
const showFullLines = ref(false);

const truncatedDescription = computed(() => {
  let description = props.plan.description;
  if (!showFullDescription.value) {
    description = description.substring(0, 90) + '...';
  }
  return description;
});

const truncatedLineEntries = computed(() => {
  const entries = Object.entries(props.plan.price);
  return showFullLines.value ? entries : entries.slice(0, 3);
});

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

const toggleFullLines = () => {
  showFullLines.value = !showFullLines.value;
};
</script>

<template>
  <!-- Box -->
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ plan.carrier }}</div>
        <h3 class="text-xl font-bold">{{ plan.name }}</h3>
      </div>
      <!-- Show the description of the plan -->
      <div class="mb-3">
        <div>{{ truncatedDescription }}</div>
        <button @click="toggleFullDescription" class="text-pink-500 hover:text-pink-600 mb-5">
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>
      <!-- Show the price of the plan -->
      <div class="mt-4 mb-4">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="border-b p-2">Lines</th>
              <th class="border-b p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="([line, price], i) in truncatedLineEntries" :key="i">
              <td class="border-b p-2">{{ line }}</td>
              <td class="border-b p-2">{{ price }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="toggleFullLines" class="text-pink-500 hover:text-pink-600 mt-2">
          {{ showFullLines ? 'Fewer lines' : 'More lines' }}
        </button>
      </div>
      <!-- Show the rest of the plan details -->
       <!-- API returns -1 as representation of unlimited -->
      <div class="mb-2">Data: {{ plan.data === -1 ? 'unlimited' : plan.data + ' GB' }}</div>
      <div class="mb-2">Hotspot: {{ plan.hotspot === -1 ? 'unlimited' : plan.hotspot + ' GB' }}</div>
      <div class="mb-2">Talk: {{ plan.talk === -1 ? 'unlimited' : plan.talk + ' minutes' }}</div>
      <div class="mb-2">Text: {{ plan.text === -1 ? 'unlimited' : plan.text + ' messages' }}</div>
      <div class="mb-4">Payoff: {{ plan.payoff ? 'Yes' : 'No' }}</div>
    </div>
  </div>
</template>
