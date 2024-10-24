<template>
  <div class="w-full h-24 bg-[#00C7B7] flex flex-row items-center justify-between p-6">
    <div>
      <p class="font-HankenGrotesk text-2xl font-bold text-white">Controle de acessos</p>
    </div>
    <div class="relative flex flex-col">
      <button @click="toggleDropdown">
        <img src="/public/favicon.ico" class="w-8 h-8 border rounded-full" />
      </button>
      <!-- Dropdown -->
      <div v-if="isDropdownOpen" class="-ml-20 absolute top-full mt-2 z-10 font-HankenGrotesk bg-white divide-y divide-gray-100 rounded-lg shadow w-32">
        <ul class="p-4">
          <li class="mb-2">
            <a href="#" class="font-HankenGrotesk text-gray-500 hover:text-blue-600">Perfil</a>
          </li>
          <li>
            <a href="#" class="font-HankenGrotesk text-gray-500 hover:text-blue-600" @click="sair">Sair</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { iseAuthStore } from '~/store/authTeste';

const auth = iseAuthStore();
const sair = async()=>{
    auth.logout();
    return navigateTo('/');
}


const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
</style>
