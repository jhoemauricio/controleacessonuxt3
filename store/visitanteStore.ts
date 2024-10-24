import { defineStore } from 'pinia';
import type { interfaceVisitante } from '~/types/interfaceVisitante';


export const usuarioVisitante = defineStore('visitanteUser', {

    state: () => (
        { 
            //array tipado com interfaceVisitante
            usersVisitantes: process.client?JSON.parse(localStorage.getItem('usersVisitantes') || '[]') as interfaceVisitante[]:[],
            usersHistorico: process.client?JSON.parse(localStorage.getItem('usersHistorico') || '[]') as interfaceVisitante[]:[]
        }
    ),

    getters: {
    //lista os visitantes
     listUsersVisitantes(state){
        return state.usersVisitantes
     },
     listUsersHistorico(state){
        return state.usersHistorico
     }
    },

    actions: {
        //adiciona o visitante
        addVisitante(userVisitante: interfaceVisitante){
       
            this.usersVisitantes.push(userVisitante);

            localStorage.setItem('usersVisitantes', JSON.stringify(this.usersVisitantes));


        },
        //remove o visitante
        removerVisitante(userVisitante: interfaceVisitante,data:string, hora:string){
            //define um indice
            const indice = this.usersVisitantes.indexOf(userVisitante);
                //se encontrar o indice
                if(indice !== -1){
                    //encontra o indice e remove uma quantidade
                    const deletado = this.usersVisitantes.splice(indice,1)[0]; // Obtém o objeto removido
                 
                    deletado.dataSaida = data;
                    deletado.horaSaida = hora;
                    // Adiciona o visitante removido ao histórico
                    this.usersHistorico.push(deletado);


                    localStorage.setItem('usersVisitantes', JSON.stringify(this.usersVisitantes));
                    localStorage.setItem('usersHistorico', JSON.stringify(this.usersHistorico));



                }
        },

              // Chamada para restaurar o estado do localStorage caso precise em algum outro ponto
              restoreState() {
                if (process.client) {
                    this.usersVisitantes = JSON.parse(localStorage.getItem('usersVisitantes') || '[]');
                    this.usersHistorico = JSON.parse(localStorage.getItem('usersHistorico') || '[]');
                }
            }

  
     
    }


  })