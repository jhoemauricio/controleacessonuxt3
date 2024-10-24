import { iseAuthStore } from '~/store/authTeste';

export default defineNuxtRouteMiddleware((to,from) => {


    const useAuth = iseAuthStore();
    //verifica se autenticacao é false
    if(!useAuth.isAuthenticated){
       
       return navigateTo('/');
    }
})