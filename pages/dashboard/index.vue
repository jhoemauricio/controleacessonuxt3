<script setup lang="ts">

import Cabecalho from '~/components/headers/Cabecalho.vue';
import CardMenu from '~/components/cards/CardMenu.vue';
import HistoricoVisitantes from '~/components/cards/HistoricoVisitantes.vue';
import AcessoVisitantes from '~/components/cards/AcessoVisitantes.vue';
import Novo from '~/components/cards/Novo.vue';

//usa o middleware para acessar a rota
definePageMeta({
    middleware: ["auth"]
});



//valor que recebera do emit
const valor = ref('novo');

//funcao que atualiza o valor.value com o emit recebido
const handleView = (dados: any)=>{

    valor.value = dados;
}

</script>

<template>
    <div class="flex flex-col w-full">
            <div class="flex justify-center items-center fixed w-full">
                <Cabecalho />
            </div>
            <div class="flex justify-center items-center">
                <CardMenu @view="handleView"/>
            </div>
            <div v-if="valor == 'historico'" class="flex justify-center items-center">
                <HistoricoVisitantes/>
            </div>
            <div v-if="valor == 'acesso'" class="flex justify-center items-center">
                <AcessoVisitantes/>
            </div>
            <div v-if="valor == 'novo'" class="flex justify-center items-center">
                <Novo />
            </div>
          
    </div>
</template>

<style lang="scss" scoped>

</style>