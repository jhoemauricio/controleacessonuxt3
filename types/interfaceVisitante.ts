export interface interfaceVisitante {
    
    nome: string ,
    documento: string ,
    destino: string,
    categoria: string,
    anotacoes: string,
    //ArrayBuffer é usado para manter dados binários. Podem ser os dados binários de uma imagem, por exemplo.
    foto: string | ArrayBuffer | null,
    horaEntrada: string,
    horaSaida: string,
    dataEntrada: string,
    dataSaida: string
  
}

