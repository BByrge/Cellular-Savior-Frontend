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
  <div class="bg-indigo-200 rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="my-2">{{ plan.carrier }}</div>
        <h3 class="text-2xl text-pink-400 font-bold">
          <a :href="`/plan/${plan.id}`">{{ plan.name }}</a>
        </h3>
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
       <!-- API returns 10000 as representation -->
      <div class="mb-2">
        <strong>Data:</strong> {{ plan.data === 10000 ? 'Unlimited' : plan.data + ' GB' }}
      </div>
      <div class="mb-2">
        <strong>Hotspot:</strong> {{ plan.hotspot === 10000 ? 'Unlimited' : plan.hotspot + ' GB' }}
      </div>
      <div class="mb-2">
        <strong>Talk:</strong> {{ plan.talk === 10000 ? 'Unlimited' : plan.talk + ' minutes' }}
      </div>
      <div class="mb-2">
        <strong>Text:</strong> {{ plan.text === 10000 ? 'Unlimited' : plan.text + ' messages' }}
      </div>
      <div class="mb-4">
        <strong>Payoff:</strong> {{ plan.payoff ? 'Yes' : 'No' }}
      </div>
    </div>
  </div>
</template>
