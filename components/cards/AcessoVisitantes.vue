<script setup lang="ts">
import { usuarioVisitante } from '~/store/visitanteStore';
import { onMounted } from 'vue'; // Importar onMounted para chamar a restauração do estado
import type { interfaceVisitante } from '~/types/interfaceVisitante';

const usuarios = usuarioVisitante();
const data = new Date();
const hora = data.getHours();
const min = data.getMinutes();
const dia = data.getDate();
const mes = data.getMonth() + 1;
const ano = data.getFullYear();

const HoraSaida = hora.toString().padStart(2, '0') + ':' + min.toString().padStart(2, '0');
const DataSaida = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + ano;

// Chama a função para restaurar os dados do localStorage quando o componente é montado
onMounted(() => {
  usuarios.restoreState();
});

</script>

<template>
  <div class="flex flex-col mt-10 p-2">
    <div class="flex bg-blue-700 items-center justify-center w-24 h-8">
      <p class="font-HankenGrotesk text-sm text-white">Acessos</p>
    </div>
    <div class="flex items-center justify-center overflow-x-auto overflow-y-auto">
      <table class="w-96 font-HankenGrotesk text-xs text-center text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="col" class="px-2 py-2">Visitante</th>
            <th scope="col" class="px-2 py-2">Nome</th>
            <th scope="col" class="px-2 py-2">Entrada</th>
            <th scope="col" class="px-2 py-2">Data</th>
            <th scope="col" class="px-2 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="usuario in usuarios.listUsersVisitantes"
            :key="usuario.id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td class="flex items-center justify-center">
              <img :src="usuario.foto" class="rounded-full w-8 h-8" />
            </td>
            <td>{{ usuario.nome }}</td>
            <td>{{ usuario.horaEntrada }}</td>
            <td>{{ usuario.dataEntrada }}</td>
            <td>
              <button
                @click="usuarios.removerVisitante(usuario,DataSaida,HoraSaida); "
                type="button"
                class="focus:outline-none text-white bg-[#00BF63] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-HankenGrotesk rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Remover
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
