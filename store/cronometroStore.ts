import { defineStore } from "pinia";




export const cronometroUser = defineStore('counter', {

    //estado do cronometro
    state: () => ({

        seg: 0,
        min: 0,
        hor: 0,
        //armazena no formato
        format: ''
    }),

    actions: {
       // cronometragem recebe tipo elemento
        cronometro(elemento: HTMLElement) {

            setInterval(() => {
               
                this.contador(elemento);

            }, 1000);
        },
        //contador que intera o relógio
        contador(elemento: HTMLElement) {

            if (elemento) {
                this.seg++;
                //se segundo for igual a 60 entao zera o segundo e intera os minutos
                if (this.seg === 60) {
                    this.seg = 0;
                    this.min++;
                    //se minutos for igual a 60 entao zera os minutos e intera as horas
                    if (this.min === 60) {
                        this.min = 0;
                        this.hor++;
                    }
                }
                //formata o cronometro 
                this.format =
                    //se hora for menor que 10 entao concatena o '0' com o numero
                    (this.hor < 10 ? '0' + this.hor : this.hor) + ':' +
                    (this.min < 10 ? '0' + this.min : this.min) + ':' +
                    (this.seg < 10 ? '0' + this.seg : this.seg);
                    
                    //retorna o valor formatado para o elemento
                    return elemento.innerText = this.format;

            }
        },






















    },

















    },

)