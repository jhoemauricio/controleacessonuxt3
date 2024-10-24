import { defineStore } from 'pinia';

export const iseAuthStore = defineStore('auth',{

    state:()=>({
        user: null as any,
        token: null as string | null ,
        isAuthenticated: false
    }),

    actions:{

        //fazer login
        async login(username:string, password:string){

            //simula token retornado da api, o resolve espera um success ja o reject significa que a operação falhou
            return new Promise((resolve, reject)=>{
                setTimeout(() => {

                    //nome e senha ja pré-cadastrado
                    const mockUsername = 'admin@mail.com';
                    const mockPassword = '123456';

                    //confere se o nome do usuario é igual ao registrado
                    if(username === mockUsername && password === mockPassword){
                        // Gera token fake
                        this.token = 'fake-jwt-token';
                        // Retorna o name e role falsos
                        this.user = { name: 'Admin', role:'admin'}
                        //retorna um true
                        this.isAuthenticated = true;
                        //armazena o token no localstorage
                        localStorage.setItem('token',this.token);
                        resolve(true); 
                    } else{
                        reject(new Error('Usuário ou senha incorretos'));
                    }

                }, 1000);


            })
        },

        //sair
        async logout(){

            this.token = null;
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('token');  

        },
        //checa se usuario esta autenticado
        checkAuth(){
            //obterm o localstorage
            const token = localStorage.getItem('token');
            //se existir um token entao passa os dados
            if(token){
                this.token = token;
                this.isAuthenticated = true;
                this.user = { name: 'Admin', role:'admin'}

            } else {
                //senao Autenticacao recebe false
                this.isAuthenticated = false;
            }
        }
    },


})