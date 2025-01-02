<script setup>
import { RouterLink } from 'vue-router';

// Get the last page from localStorage or default to '/plans'. This allows the back button to work.
const previousPage = localStorage.getItem('lastPlansPage') || '/plans';
</script>

<template>

    <section>
      <div class="container m-auto py-6 px-6">
        <RouterLink
          :to="previousPage"
          class="text-indigo-500 hover:text-indigo-600 flex items-center"
        >
          <i class="pi pi-arrow-circle-left mr-3"></i> Back to Plans
        </RouterLink>
      </div>
    </section>

</template>