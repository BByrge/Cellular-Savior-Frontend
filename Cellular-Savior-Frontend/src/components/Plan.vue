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
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="p-6">
      <div class="mb-6">
        <div class="text-gray-500 text-sm uppercase tracking-wide">{{ plan.carrier }}</div>
        <h3 class="text-2xl text-indigo-600 font-bold">
          <a :href="`/plan/${plan.id}`">{{ plan.name }}</a>
        </h3>
      </div>
      <!-- Show the description of the plan -->
      <div class="mb-4">
        <p class="text-gray-700">{{ truncatedDescription }}</p>
        <button @click="toggleFullDescription" class="text-indigo-500 hover:text-indigo-600 mt-2">
          {{ showFullDescription ? 'Less' : 'More' }}
        </button>
      </div>
      <!-- Show the price of the plan -->
      <div class="mt-4 mb-4">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="border-b p-2 text-gray-600">Lines</th>
              <th class="border-b p-2 text-gray-600">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="([line, price], i) in truncatedLineEntries" :key="i">
              <td class="border-b p-2 text-gray-700">{{ line }}</td>
              <td class="border-b p-2 text-gray-700">{{ price }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="toggleFullLines" class="text-indigo-500 hover:text-indigo-600 mt-2">
          {{ showFullLines ? 'Fewer lines' : 'More lines' }}
        </button>
      </div>
      <!-- Show the rest of the plan details -->
      <div class="mb-2">
        <strong class="text-gray-600">Data:</strong> {{ plan.data === 10000 ? 'Unlimited' : plan.data + ' GB' }}
      </div>
      <div class="mb-2">
        <strong class="text-gray-600">Hotspot:</strong> {{ plan.hotspot === 10000 ? 'Unlimited' : plan.hotspot + ' GB' }}
      </div>
      <div class="mb-2">
        <strong class="text-gray-600">Talk:</strong> {{ plan.talk === 10000 ? 'Unlimited' : plan.talk + ' minutes' }}
      </div>
      <div class="mb-2">
        <strong class="text-gray-600">Text:</strong> {{ plan.text === 10000 ? 'Unlimited' : plan.text + ' messages' }}
      </div>
      <div class="mb-4">
        <strong class="text-gray-600">Payoff:</strong> {{ plan.payoff ? 'Yes' : 'No' }}
      </div>
    </div>
  </div>
</template>
