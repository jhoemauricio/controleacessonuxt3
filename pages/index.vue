<script setup lang="ts">
import {ref} from 'vue';
import {iseAuthStore} from '~/store/authTeste';

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const authStore = iseAuthStore();

const submitLogin = async()=>{

    try {

        await authStore.login(username.value, password.value);
    
            navigateTo('/dashboard');
        
        }catch(error){

        errorMessage.value = 'Email ou senha incorretos';
    }
}

onMounted(() => {

    //carrega o localStorage que estao salvo com o token
    authStore.checkAuth();
    //se tiver entao verifica se esta autenticado e vai para pagina autenticada
    if(authStore.isAuthenticated){
        navigateTo('/dashboard');
    }
})



</script>

<template>


<div class="flex flex-col items-center justify-center h-screen w-screen">
        <div class="flex justify-center">
            <svg class="w-24 h-24 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="0.9" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
        </div>
        <div class="flex items-center justify-center p-4 2xl:p-6">
            <p class="font-HankenGrotesk text-2xl font-bold sm:text-4xl 2xl:text-6xl">Sitema de controle de acesso</p>
        </div>
        <form @submit.prevent="submitLogin">
            <div class=" sm:flex sm:flex-row sm:space-x-4 md:flex-col 2xl:flex-col lg:flex-col xl:flex-col">
                <div>
                    <div>
                        <!-- <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-HankenGrotesk">Nome</label> -->
                        <input v-model="username"  type="email" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 2xl:text-2xl text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-HankenGrotesk" placeholder="email" />
                    </div>
                    <div>
                        <!-- <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-HankenGrotesk">Documento(RG/CPF/CNH)</label> -->
                        <input v-model="password" type="password"  class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 2xl:text-2xl text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 font-HankenGrotesk" placeholder="password"/>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-center 2xl:p-4">       
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 sm:text-sm md:text-sm lg:text-sm 2xl:text-2xl font-HankenGrotesk">Entrar</button>
            </div>
            <div v-if="errorMessage" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">  <p>{{ errorMessage }}</p></span> 
            </div>
          
        </form>
     
    </div>

    <!-- <div>
        <p>LOGIN</p>
            <form @submit.prevent="submitLogin">
                <input v-model="username" type="text"  />
                <input v-model="password" type="text" />
                <button class="w-16 h-16 bg-slate-400 text-white" type="submit">Entrar</button>
                <p v-if="errorMessage">{{ errorMessage }}</p>
            </form>
    </div> -->
</template>

<style lang="scss" scoped>

</style>