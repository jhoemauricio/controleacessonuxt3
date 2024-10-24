<script setup lang="ts">

//define o emit
const emit = defineEmits(['view']);

//evento que atualiza o view para acesso
function eventoAcesso(){
    emit('view','acesso');
}

function eventoNovo(){
    emit('view','novo');
}
//evento que atualiza o view para historico
function eventoHistorico(){
    emit('view', 'historico');
}

</script>

<template>
    <div class="flex flex-col mt-40">
        <div class="bg-[#FFDE59] w-24 h-8 flex items-center justify-center">
            <p class="font-HankenGrotesk text-sm">Menu</p>
        </div>
        <div class="flex flex-row bg-[#FFF4CD]  items-center justify-center p-8 w-96">
            <div>
                <button @click="eventoNovo" type="button" class="focus:outline-none text-white bg-[#FFDE59] hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-HankenGrotesk rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Visitante</button>
            </div>
            <div>
                <button @click="eventoAcesso" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-HankenGrotesk rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Acesso</button>
            </div>
            <div>
                <button @click="eventoHistorico" type="button" class="focus:outline-none text-white bg-[#00BF63] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-HankenGrotesk rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Histórico</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>