import { PrismaClient, User } from '@prisma/client';
import axios from 'axios';
import FormDate from 'form-data';
//import { hash } from 'bcryptjs';

// export interface cUser {
//   id: number | undefined;
//   from: string;
//   notifyName: string | undefined;
//   timestamp: number | undefined;
//   stg: number | undefined;
//   createdAt: Date | undefined;
//   expiresAt: number | undefined | null;
//   updatedAt: Date | undefined;
// }

export interface sgpContratoCliente {
  msg: string;
  contratos: Contrato[] | undefined;
}

export interface Contrato {
  telefones_cargos: string[] | undefined;
  cobPermuta: boolean | undefined;
  contratoCentralSenha: string | undefined;
  endereco_complemento: string | undefined;
  clienteId: number | undefined;
  contratoStatus: number | undefined;
  servico_wifi_channel: string | undefined;
  dataCadastro: string | undefined;
  endereco_uf: string | undefined;
  servico_plano: string | undefined;
  endereco_pontoreferencia: string | undefined;
  cobIsento: number | undefined;
  cpfCnpj: string | undefined;
  endereco_logradouro: string | undefined;
  contratoStatusModo: number | undefined;
  telefones: string[] | undefined;
  contratoStatusDisplay: string | undefined;
  contratoCentralLogin: string | undefined;
  tags: string[] | undefined;
  contratoTitulosAReceber: number | undefined;
  servico_wifi_ssid_5: string | undefined;
  servico_grupo: string | undefined;
  endereco_numero: string | undefined;
  contratoValorAberto: number | undefined;
  planointernet: string | undefined;
  servico_login: string | undefined;
  endereco_bairro: string | undefined;
  emails: string[] | undefined;
  razaoSocial: string | undefined;
  servico_mac: string | undefined;
  popNome: string | undefined;
  servico_wifi_password_5: string | undefined;
  popId: number | undefined;
  endereco_cep: string | undefined;
  promessasPagamentoMes: number | undefined;
  servico_wifi_password: string | undefined;
  endereco_cidade: string | undefined;
  servico_senha: string | undefined;
  dataAlteracao: string | undefined;
  servico_wifi_channel_5: string | undefined;
  servico_wifi_ssid: string | undefined;
  contratoId: number | undefined;
  endereco_ll: string | undefined;
}

export interface Contrato1 {
  telefones_cargos: string[] | undefined;
  cobPermuta: boolean | undefined;
  contratoCentralSenha: string | undefined;
  endereco_complemento: string | undefined;
  clienteId: contratoCliente | undefined;
  contratoStatus: number | undefined;
  servico_wifi_channel: string | undefined;
  dataCadastro: string | undefined;
  endereco_uf: string | undefined;
  servico_plano: string | undefined;
  endereco_pontoreferencia: string | undefined;
  cobIsento: number | undefined;
  cpfCnpj: string | undefined;
  endereco_logradouro: string | undefined;
  contratoStatusModo: number | undefined;
  telefones: string[] | undefined;
  contratoStatusDisplay: string | undefined;
  contratoCentralLogin: string | undefined;
  tags: string[] | undefined;
  contratoTitulosAReceber: number | undefined;
  servico_wifi_ssid_5: string | undefined;
  servico_grupo: string | undefined;
  endereco_numero: string | undefined;
  contratoValorAberto: number | undefined;
  planointernet: string | undefined;
  servico_login: string | undefined;
  endereco_bairro: string | undefined;
  emails: string[] | undefined;
  razaoSocial: string | undefined;
  servico_mac: string | undefined;
  popNome: string | undefined;
  servico_wifi_password_5: string | undefined;
  popId: number | undefined;
  endereco_cep: string | undefined;
  promessasPagamentoMes: number | undefined;
  servico_wifi_password: string | undefined;
  endereco_cidade: string | undefined;
  servico_senha: string | undefined;
  dataAlteracao: string | undefined;
  servico_wifi_channel_5: string | undefined;
  servico_wifi_ssid: string | undefined;
  contratoId: number | undefined;
  endereco_ll: string | undefined;
}

export interface contratoCliente {
  msg: string;
  status: number;
  contratoId: number;
  cpfCnpj: string;
  razaoSocial: string;
}
export interface wer {
  msg: string | undefined;
  contratos: Contrato[] | undefined;
  contratoOnline: contratoCliente[] | undefined;
}
export interface Chamado {
  cpfcnpj: string;
  senha: string | undefined;
  contrato: string | number;
  conteudo: string;
  contato: string;
  contato_numero: string;
  motivoos: string;
  ocorrenciatipo: string;
}

export interface ListaTitulos {
  cpfcnpj: string;
  senha: string | undefined;
  contrato: string | number;
}

export interface EnviarEmail {
  cpfcnpj: string | undefined;
  senha: string | undefined;
  contrato: string | number;
  email: string | undefined;
}
export interface Promessa {
  cpfcnpj: string | undefined;
  senha: string | undefined;
  contrato: string | number | undefined;
}
export interface Promessa_resp {
  status: number;
  razaosocial: string;
  protocolo: string | null | undefined;
  liberado: boolean;
  data_promessa: Date | null | undefined;
  cpfcnpj: string;
  contrato: number;
  msg: string;
}

export interface chamado_resp {
  status: number;
  razaosocial: string;
  protocolo: string;
  cpfcnpj: string;
  contrato: number;
  msg: string;
}

export interface ListaTitulos_resp {
  faturas: Fatura[];
}

export interface Fatura {
  vencimento_atualizado: Date;
  status: Status;
  data_pagamento: Date | null;
  idtransacao: string;
  codigopix: string;
  pagarcartaocheckout: null;
  numero_documento: number;
  gerapix: boolean;
  statusid: number;
  vencimento: Date;
  pagarcartaodebito: boolean;
  valorcorrigido: number;
  valor: number;
  link: string;
  linhadigitavel: string;
  pagarcartao: boolean;
  id: number;
}

export enum Status {
  Gerado = 'Gerado',
  Pago = 'Pago',
}

export interface email_resp {
  status: number;
  razaoSocial: string;
  protocolo: string;
  cpfCnpj: string;
  msg: string;
  contratoId: number;
}

class ura {
  async criarChamado(chamado: Chamado) {
    const form = new FormDate();
    form.append('cpfcnpj', chamado.cpfcnpj);
    form.append('senha', chamado.senha);
    form.append('contrato', chamado.contrato);
    form.append('conteudo', chamado.conteudo);
    form.append('contato', chamado.contato);
    form.append('contato_numero', chamado.contato_numero);
    form.append('motivoos', chamado.motivoos);
    form.append('ocorrenciatipo', chamado.ocorrenciatipo);

    const config = {
      method: 'post',
      url: 'https://sgp.powercomnetwork.com.br/' + 'api/central/chamado/',
      data: form,
    };
    const response = await (await axios(config)).data;

    return response;
  }

  async listTitulos(chamado: ListaTitulos) {
    const form = new FormDate();
    form.append('cpfcnpj', chamado.cpfcnpj);
    form.append('senha', chamado.senha);
    form.append('contrato', chamado.contrato);

    const config = {
      method: 'post',
      url: 'https://sgp.powercomnetwork.com.br/' + 'api/central/titulos/',
      data: form,
    };
    const response = await (await axios(config)).data;

    return response as ListaTitulos_resp;
  }
  async promessaPagamento(chamado: Promessa) {
    const form = new FormDate();
    form.append('cpfcnpj', chamado.cpfcnpj);
    form.append('senha', chamado.senha);
    form.append('contrato', chamado.contrato);

    const config = {
      method: 'post',
      url:
        'https://sgp.powercomnetwork.com.br/' +
        'api/central/promessapagamento/',
      data: form,
    };
    const response = await (await axios(config)).data;

    return response as Promessa_resp;
  }

  async enviarEmail(contatoEmail: EnviarEmail) {
    const form = new FormDate();
    form.append('cpfcnpj', contatoEmail.cpfcnpj);
    form.append('senha', contatoEmail.senha);
    form.append('contrato', contatoEmail.contrato);
    form.append('email', contatoEmail.email);

    const config = {
      method: 'post',
      url: 'https://sgp.powercomnetwork.com.br/' + 'api/central/envia2via/',
      data: form,
    };
    const response = await (await axios(config)).data;

    return response as email_resp;
  }

  async contrato(cpfCnpj: string) {
    const form = new FormDate();
    // form.append('token', '15cd7c0a-b844-428e-a502-d20793f161df');
    form.append('token', process.env.TOKEN);
    form.append('app', 'urasgp');
    form.append('cpfcnpj', cpfCnpj);

    const config = {
      method: 'post',
      url: 'https://sgp.powercomnetwork.com.br/' + 'api/ura/consultacliente/',
      data: form,
    };

    const response = await (await axios(config)).data;

    return response as sgpContratoCliente;
  }
  async contratoVerificarAcesso(Contrato_Cliente: string) {
    const form = new FormDate();
    form.append('token', process.env.TOKEN);
    form.append('app', 'urasgp');
    form.append('contrato', Contrato_Cliente);

    const config = {
      method: 'post',
      url: 'https://sgp.powercomnetwork.com.br/' + 'api/ura/verificaacesso/',
      data: form,
    };

    const response = await (await axios(config)).data;

    return response as contratoCliente;
  }
}
export default ura;
