<script setup lang="ts">
import { usuarioVisitante } from '~/store/visitanteStore';
import { onMounted } from 'vue';

const usuarios = usuarioVisitante();


// Chama a função para restaurar os dados do localStorage quando o componente é montado
onMounted(() => {
  usuarios.restoreState();
});

</script>

<template>
    <div class="flex flex-col mt-10 p-2">
            <div class="flex bg-[#00BF63] items-center justify-center w-24 h-8">
                <p class="font-HankenGrotesk text-sm text-white">Histórico</p>
            </div>
            <div class="flex items-center justify-center overflow-x-auto overflow-y-auto">
                <table  class="w-96 font-HankenGrotesk text-xs text-center text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="col" class="px-2 py-2">
                                Visitante
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Nome
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Hora Entrada
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Hora Saída
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Data Entrada
                            </th>
                            <th scope="col" class="px-2 py-2">
                                Data Saída
                            </th>
                    
                        </tr>
                    </thead>
                    <tbody v-for="visitante in usuarios.listUsersHistorico">
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    
                            <td class="flex items-center justify-center">
                               <img :src="visitante.foto" class="rounded-full w-8 h-8">
                            </td>
                            <td class="">
                               {{ visitante.nome }}
                      
                            </td>
                            <td class="">
                                {{ visitante.horaEntrada }}
                            </td>
                            <td class="">
                                {{ visitante.horaSaida }}
                            </td>
                            <td class="">
                                {{ visitante.dataEntrada }}
                            </td>
                            <td class="">
                                {{ visitante.dataSaida }}
                            </td>
                            
                        </tr>
             
                    </tbody>
                </table>
            </div>







    </div>
</template>

<style lang="scss" scoped>

</style>