import { eTiposLogradouro } from "./eTiposLogradouro";

export class UserProfile {
    id: number = null;
    nome: string = null;
    email: string = null;
    telefone: string = null;
    endereco: Endereco = null;

    constructor(data: any = null) {
        if (data) {
            this.id = data.id ? data.id : null;
            this.nome = data.nome ? data.nome : null;
            this.email = data.email ? data.email : null;
            this.telefone = data.telefone ? data.telefone : null;
        }
    }
}

export class Endereco {
    tipoLogradouro: eTiposLogradouro = null;
    logradouro: string = null;
    numero: number = null;
    complemento?: string = null;
    bairro: string = null;
    cidade: string = null;
    cep: string = null;
    uf: string = null;

    constructor(data: any = null) {
        if (data) {
            //   let logra = data.logradouro.split(" ", 2);
            let index = data.logradouro.indexOf(" ");
            let logra = [data.logradouro.slice(0, index).toLowerCase(), data.logradouro.slice(index + 1)];
            var key = Object.keys(eTiposLogradouro).find((k: any) => k.toLowerCase() == logra[0]);
            this.tipoLogradouro = eTiposLogradouro[key];
            this.logradouro = logra[1];
            this.numero = data.numero ? data.numero : null;
            this.complemento = data.complemento ? data.complemento : null;
            this.bairro = data.bairro ? data.bairro : null;
            this.cidade = data.localidade ? data.localidade : data.cidade ? data.cidade : null;
            this.uf = data.uf ? data.uf : null;
            this.cep = data.cep ? data.cep : null;
        }
    }
}