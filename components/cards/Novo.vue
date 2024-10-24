<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { usuarioVisitante } from '~/store/visitanteStore';
import type { interfaceVisitante } from '~/types/interfaceVisitante';
import { Form, Field, ErrorMessage } from 'vee-validate';


const visitanteUser = usuarioVisitante();

// Inicializando userVis com um objeto vazio do tipo interfaceVisitante
const userVis = ref<interfaceVisitante>({
    nome: '',
    documento: '',
    destino: '',
    categoria: '',
    anotacoes: '',
    foto: '',
    horaEntrada: '',
    horaSaida: '',
    dataEntrada: '',
    dataSaida: ''
});

// Definindo a imagem padrão
const previewImagem = ref('/favicon.ico');

      

// Variáveis para hora e data que serão atualizadas
const HoraEntrada = ref('');
const dataAtual = ref('');

// Função para atualizar a hora de entrada e a data atual
const atualizarDataHora = () => {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const hora = data.getHours();
    const min = data.getMinutes();

    // Atualiza as variáveis reativas
    HoraEntrada.value = hora.toString().padStart(2, '0') + ':' + min.toString().padStart(2, '0');
    dataAtual.value = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + ano;
};

// Atualiza a hora e a data quando o componente for montado e define um intervalo para continuar atualizando
onMounted(() => {

    atualizarDataHora();

        const intervalo = setInterval(
            atualizarDataHora
            ,1000);

    // Limpa o intervalo quando o componente for desmontado
    onBeforeUnmount(() => {
        clearInterval(intervalo);
    });
});

const success = ref(false);

function desaparecer(){
    setTimeout(() => {
        success.value = false;
    }, 3000);
}

const myForm = ref('');

function limparCampos(){
            // // Limpa os campos
            userVis.value = reactive( {
            nome: ref(''),
            documento: ref(''),
            destino: ref(''),
            categoria: ref(''),
            anotacoes: ref(''),
            foto: ref(''),
            horaEntrada: ref(''),
            horaSaida: ref(''),
            dataEntrada: ref(''),
            dataSaida: ref('')
        });

        success.value = false;
}


// Função para adicionar um usuário visitante
const add = async () => {
    if (userVis.value) {
        // Se a propriedade foto estiver vazia, adiciona o caminho padrão
        if (userVis.value.foto == '') {
            userVis.value.foto = '/favicon.ico';
        }

        // Atribui a hora de entrada e a data atual
        userVis.value.horaEntrada = HoraEntrada.value;
        userVis.value.dataEntrada = dataAtual.value;

        // Adiciona o visitante
        visitanteUser.addVisitante(userVis.value);
     


        // Adiciona o caminho padrão
        previewImagem.value = '/favicon.ico';
        
        success.value = true;
       // Wait until the models are updated in the UI
 
    
    } else {
        console.error('userVis não foi inicializado corretamente');
    }

   
};



// Função para lidar com a imagem base64
const imagemBase64 = async (event: any) => {
    previewImagem.value = URL.createObjectURL(event.target.files[0]);
    const imagem = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        userVis.value.foto = reader.result as string;
    });

    reader.readAsDataURL(imagem);
};



// Função que valida CPF
const validateCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]+/g,''); // Remove caracteres especiais

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0, resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if ((resto === 10) || (resto === 11)) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

// Função que valida RG (pode variar por estado)
const validateRG = (rg: string) => {
  const rgRegex = /^\d{7,9}$/; // RG geralmente possui entre 7 e 9 dígitos
  return rgRegex.test(rg.replace(/[^\d]+/g, '')); // Remover caracteres especiais e testar padrão
};




const schemaValidar = {

    nome(value:any){
      // if the field is empty
      if (!value) {
      
        return 'Campo obrigatório';
      }

      // All is good
      return true;
    },

    destino(value:any){

        if(!value){
            return 'Campo obrigatório';
        }
        return true;
    },

    categoria(value:any){
        
        if(!value){
            return 'Selecione um perfil de acesso';
        }

        return true;
    },

    documento(value:any){

        if (!value) {
            return 'O campo é obrigatório';
        }

        // Remover espaços e caracteres não numéricos
        value = value.replace(/[^\d]+/g, '');

        // Verifica se é um CPF válido
        if (value.length === 11) {
            return validateCPF(value) ? true : 'CPF inválido';
        }

        // Verifica se é um RG válido
        if (value.length >= 7 && value.length <= 9) {
            return validateRG(value) ? true : 'RG inválido';
        }

        return 'Documento inválido';
    }
}



</script>

<template>

    <Form ref="myForm" @submit="add" :validation-schema="schemaValidar" class="flex flex-col mt-10 p-2">
        <div class="flex bg-[#FFDE59] items-center justify-center w-24 h-8">
            <p class="font-HankenGrotesk text-sm text-black">Visitante</p>
        </div>
        <div class="flex flex-col bg-[#FFFF] items-center justify-center p-8 w-96 space-x-4">
            <!-- Formulário de cadastro -->
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium font-HankenGrotesk text-gray-900 dark:text-white">Nome</label>
                <Field v-model="userVis.nome" name="nome" type="text" class="bg-gray-50 border font-HankenGrotesk border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" />
                
                <!-- Nesse caso, "message" é a variável que vai conter a mensagem de erro para o campo com o nome especificado (neste caso, nome) -->
                <ErrorMessage v-slot="message" class="text-sm font-HankenGrotesk"  name="nome">


                    <div class="flex mt-2 items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <!--Acessa a propriedade-->
                                {{ message.message }}

                            </div>
                    </div>

                </ErrorMessage>





            </div>
            <!-- Campos de documento, destino e outros -->
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium font-HankenGrotesk text-gray-900 dark:text-white">RG/CPF</label>
                <Field v-model="userVis.documento" name="documento" type="text" class="bg-gray-50 border font-HankenGrotesk border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" placeholder=""  />
                    <ErrorMessage v-slot="message" class="text-sm font-HankenGrotesk"  name="documento">
                        <div class="flex mt-2 items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <!--Acessa a propriedade-->
                                    {{ message.message }}

                                </div>
                        </div>
                    </ErrorMessage>
            </div>
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium font-HankenGrotesk text-gray-900 dark:text-white">Para onde?</label>
                <Field v-model="userVis.destino" name="destino" type="text"  class="bg-gray-50 border font-HankenGrotesk border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700" required />
                <ErrorMessage v-slot="message" class="text-sm font-HankenGrotesk"  name="destino">
                        <div class="flex mt-2 items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <!--Acessa a propriedade-->
                                    {{ message.message }}

                                </div>
                        </div>
                    </ErrorMessage>
            </div>
            <!-- Categoria e Anotações -->
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium font-HankenGrotesk text-gray-900 dark:text-white">Perfil de acesso</label>
                <Field as="select" v-model="userVis.categoria" name="categoria" class="bg-gray-50 border font-HankenGrotesk border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600">
                    <option disabled>Perfil de acesso</option>
                    <option value="Visita">Visitante</option>
                    <option value="Entrega">Entregador</option>
                    <option value="Serviço">Prestador de serviço</option>
                </Field>
                <ErrorMessage v-slot="message" class="text-sm font-HankenGrotesk"  name="categoria">
                        <div class="flex mt-2 items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <!--Acessa a propriedade-->
                                    {{ message.message }}

                                </div>
                        </div>
                    </ErrorMessage>
            </div>
            <div class="mb-5">
                <label class="block mb-2 text-sm font-medium font-HankenGrotesk text-gray-900 dark:text-white">Anotações</label>
                <Field v-model="userVis.anotacoes" name="anotacoes" rows="3" class="block w-full bg-gray-50 border font-HankenGrotesk text-sm p-6 rounded-lg dark:bg-gray-600"></Field>
            </div>
            <!-- Hora de entrada e data atual -->
            <div class="mb-5 flex flex-row space-x-14">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entrada</label>
                    <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ HoraEntrada }}</p>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
                    <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ dataAtual }}</p>
                </div>
            </div>
            <!-- Imagem e botão de salvar -->
            <div class="flex flex-row justify-center w-full">
                <label>
                    <img :src="previewImagem" alt="Imagem carregada" class="w-24 h-24 object-cover rounded-full border" />
                    <Field @change="imagemBase64" name="file" type="file" class="hidden" />
                </label>
            </div>
            
            <div class="flex flex-row justify-end w-full space-x-3 mt-12">
                <button type="submit" class="sm:text-lg text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5">Salvar</button>
                <button @click="limparCampos" type="submit" class="sm:text-lg text-black bg-slate-100 hover:bg-slate-300 rounded-lg px-5 py-2.5">Novo</button>
              
            </div>

            <div v-if="success" class="flex w-full mt-2 items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span class="sr-only">Info</span>
                                <div>
                                    <p>Salvo!</p>
                                </div>
            </div>


        </div>


    </Form>

</template>
