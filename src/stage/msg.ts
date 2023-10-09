export interface Stages {
  stage: Stage[];
}

export interface Stage {
  id: number;
  delay: number;
  MSGs: MSGS[];
}
export interface MSGS {
  msg: msg[];
  apikey: string;
}

export interface msg {
  type: MSG_TYPE;
  value: string;
}

export enum MSG_TYPE {
  text = 'TEXT',
  file = 'FILE',
  title = 'TITLE',
  boleto_pix = 'BOLETO_PIX',
  send_msg = 'SEND_MGS',
}

/**
 * Anuncio em todas as mesnsagens do bot
 * iniciar mensagem com \n\n
 */

const ENTERPRISE = 'POWERCOM NETWORK';
const tempMSG: Stages = {
  stage: [
    {
      // stage 0
      id: 0,
      delay: 2,
      MSGs: [
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value:
                'Ola sou "Julia" sua assistente virtual \nDigite o número correspondente ao serviço desejado:\n\n',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 2°
          msg: [
            {
              type: MSG_TYPE.title,
              value:
                'Ola sou "Rafael" seu assistente virtual \nEscolha um dos números correspondente ao serviço desejado:\n\n',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 3°
          msg: [
            {
              type: MSG_TYPE.title,
              value:
                'Ola sou "Miguel" assistente virtual \nPosso te ajuda com seguintes serviços :\n\n',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 1
      id: 1,
      delay: 1,
      MSGs: [
        {
          // 1°
          msg: [
            { type: MSG_TYPE.title, value: '1' },
            { type: MSG_TYPE.text, value: 'FALAR COM ATENDENTE 🙌 \n' },
            {
              type: MSG_TYPE.title,
              value: 'FALAR COM ATENDENTE',
            },
            {
              type: MSG_TYPE.title,
              value: 'ATENDENTE',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 2°
          msg: [
            { type: MSG_TYPE.text, value: '2' },
            { type: MSG_TYPE.text, value: 'FATURA📝\n' },
            {
              type: MSG_TYPE.title,
              value: 'FATURA',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 3°
          msg: [
            { type: MSG_TYPE.text, value: '3' },
            { type: MSG_TYPE.text, value: 'Promessa de Pagamento\n' },
            {
              type: MSG_TYPE.title,
              value: 'Promessa',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 4°
          msg: [
            { type: MSG_TYPE.text, value: '4' },
            { type: MSG_TYPE.text, value: 'Falha no Acesso😢 \n' },
            {
              type: MSG_TYPE.title,
              value: 'FATURA',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 5°
          msg: [
            { type: MSG_TYPE.text, value: '5' },
            { type: MSG_TYPE.text, value: 'Encerra Atendimento  \n' },
            {
              type: MSG_TYPE.title,
              value: 'Encerra',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 6°
          msg: [
            { type: MSG_TYPE.text, value: '6' },
            {
              type: MSG_TYPE.text,
              value: 'Ainda Não e cleinte\n Conheça nosso Planos\n',
            },
            {
              type: MSG_TYPE.title,
              value: 'Planos',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 2
      id: 2,
      delay: 2,
      MSGs: [
        {
          // 1°
          msg: [{ type: MSG_TYPE.text, value: 'Aguade um instante.' }],
          apikey: 'aaa',
        },

        {
          // 2°
          msg: [
            {
              type: MSG_TYPE.title,
              value: 'CPF/CNPJ INVALIDO \n digite novamente.',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 20
      id: 20,
      delay: 2,
      MSGs: [
        {
          // 1°
          msg: [{ type: MSG_TYPE.title, value: 'Segue os Titulos.\n' }],
          apikey: 'aaa',
        },
        {
          // 2°
          msg: [
            {
              type: MSG_TYPE.text,
              value: 'https://sgp.powercomnetwork.com.br',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 3°
          msg: [
            {
              type: MSG_TYPE.text,
              value: `*Para pagar com PIX*, e necessario selecionar e *copiar toda a mensagem do PIX do codigo completo* (letras, simbolos e numeros) e colar no aplicativo do seu banco em Pix copia e cola.\n*O banco nao aceitara links ou codigos incompletos para pagamento.*`,
            },
          ],
          apikey: 'aaa',
        },
        {
          // 4°
          msg: [
            {
              type: MSG_TYPE.text,
              value: `*Fatura enviada por email com sucesso*`,
            },
          ],
          apikey: 'aaa',
        },
        {
          // 4°
          msg: [
            {
              type: MSG_TYPE.text,
              value: `CPF/CNPJ INVALIDO \n digite novamente`,
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 1000
      id: 1000,
      delay: 1,
      MSGs: [
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value:
                'Para iniciamos o seu atendimento, por gentileza nos confimer Seu CPF/CNPJ',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 2°
          msg: [
            {
              type: MSG_TYPE.title,
              value: 'Por gentileza nos confimer Seu CPF/CNPJ',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 1001
      id: 1001,
      delay: 1,
      MSGs: [
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value: 'Digite CPF/CNPJ Por gentileza',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 2°
          msg: [
            {
              type: MSG_TYPE.title,
              value: 'Por gentileza nos confimer Seu CPF/CNPJ',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 1005
      id: 1005,
      delay: 1,
      MSGs: [
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.send_msg,
              value: `A sua opinião é muito importante para a ${ENTERPRISE}. Por favor, entre em contato sempre que precisar. Obrigado(a)!`,
            },
          ],
          apikey: 'aaa',
        },
        {
          // 2°
          msg: [
            {
              type: MSG_TYPE.title,
              value: 'Muito obrigado(a) por seu contato.',
            },
          ],
          apikey: 'aaa',
        },
        {
          msg: [
            {
              type: MSG_TYPE.title,
              value:
                'Obrigado por entrar em contato conosco. Estamos sempre aqui para ajudá-lo. Tenha um ótimo dia!',
            },
          ],
          apikey: 'aaa',
        },
        {
          msg: [
            {
              type: MSG_TYPE.title,
              value:
                'Foi um prazer ajudá-lo. Se você tiver mais alguma dúvida, não hesite em entrar em contato.',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      id: 1600,
      delay: 1,
      MSGs: [
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value: `Conheça nossos planos\n\n`,
            },
            {
              type: MSG_TYPE.text, // 1
              value: 'Plano de 60MB\n',
            },
            {
              type: MSG_TYPE.text, // 2
              value: 'Plano de 110MB\n',
            },
            {
              type: MSG_TYPE.text, // 3
              value: 'Plano de 210MB\n',
            },
            {
              type: MSG_TYPE.text, // 4
              value: 'Plano de 410MB\n',
            },
            {
              type: MSG_TYPE.text, // 5
              value: 'Plano de 1GB',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      id: 1601,
      delay: 2,
      MSGs: [
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value: `Plano de 60MB\n\n`,
            },
            {
              type: MSG_TYPE.send_msg, // 1
              value: 'Perfeito para estudantes',
            },
            {
              type: MSG_TYPE.title, // 2
              value: 'incluir \n\n',
            },
            {
              type: MSG_TYPE.text, // 3
              value: 'Wi-Fi grátis\n',
            },
            {
              type: MSG_TYPE.send_msg, // 4
              value: 'Podendo incluir\n',
            },
            {
              type: MSG_TYPE.text, // 5
              value: 'Extensores Wi-Fi a partir de R$15/mês',
            },
            {
              type: MSG_TYPE.title, // 6
              value:
                '\n\nApenas R$39,90/mês\nficando R$59,90/mês do terceiro mês',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value: `Plano de 110MB\n\n`,
            },
            {
              type: MSG_TYPE.send_msg, // 1
              value: 'Perfeito para estudantes e profissionais em home office',
            },
            {
              type: MSG_TYPE.title, // 2
              value: 'incluir \n\n',
            },
            {
              type: MSG_TYPE.text, // 3
              value: 'Wi-Fi grátis\n',
            },
            {
              type: MSG_TYPE.send_msg, // 4
              value: 'Podendo incluir\n',
            },
            {
              type: MSG_TYPE.text, // 5
              value: 'Extensores Wi-Fi a partir de R$15/mês',
            },
            {
              type: MSG_TYPE.text, // 6
              value:
                '\n\nApenas R$49,90/mês\nficando R$74,90/mês do terceiro mês',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value: `Plano de 210MB\n\n`,
            },
            {
              type: MSG_TYPE.send_msg, // 1
              value:
                'Ideal para quem gosta de velocidade ou leva os games a sério',
            },
            {
              type: MSG_TYPE.title, // 2
              value: 'incluir \n\n',
            },
            {
              type: MSG_TYPE.text, // 3
              value: 'Wi-Fi grátis\n',
            },
            {
              type: MSG_TYPE.send_msg, // 4
              value: 'Podendo incluir\n',
            },
            {
              type: MSG_TYPE.text, // 5
              value: 'Extensores Wi-Fi a partir de R$15/mês',
            },
            {
              type: MSG_TYPE.text, // 6
              value:
                '\n\nApenas R$69,90/mês\nficando R$89,90/mês do terceiro mês',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value: `Plano de 410MB\n\n`,
            },
            {
              type: MSG_TYPE.send_msg, // 1
              value:
                'Tenha a melhor velocidade para navegar em qualquer situação',
            },
            {
              type: MSG_TYPE.title, // 2
              value: 'incluir \n\n',
            },
            {
              type: MSG_TYPE.text, // 3
              value: 'Wi-Fi grátis\n',
            },
            {
              type: MSG_TYPE.send_msg, // 4
              value: 'Podendo incluir\n',
            },
            {
              type: MSG_TYPE.text, // 5
              value: 'Extensores Wi-Fi a partir de R$15/mês',
            },

            {
              type: MSG_TYPE.text, // 6
              value:
                '\n\nApenas R$89,90/mês\nficando R$99,90/mês do terceiro mês',
            },
          ],
          apikey: 'aaa',
        },
        {
          // 1°
          msg: [
            {
              type: MSG_TYPE.title,
              value: `Plano de 1GB\n\n`,
            },
            {
              type: MSG_TYPE.send_msg, // 1
              value:
                'Tenha a melhor velocidade para navegar em qualquer situação, incluindo Cloud e Realidade Virtual.',
            },
            {
              type: MSG_TYPE.title, // 2
              value: 'incluir \n\n',
            },
            {
              type: MSG_TYPE.text, // 3
              value: 'Wi-Fi grátis\n',
            },
            {
              type: MSG_TYPE.text, // 5
              value: '1 Extensor Wi-Fi',
            },
            {
              type: MSG_TYPE.send_msg, // 4
              value: 'Podendo incluir\n',
            },
            {
              type: MSG_TYPE.text, // 5
              value: 'Extensores Wi-Fi a partir de R$15/mês',
            },
            {
              type: MSG_TYPE.text, // 6
              value: '\n\nApenas R$399,90/mês',
            },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 2000
      id: 2000,
      delay: 1,
      MSGs: [
        {
          // 1°
          msg: [{ type: MSG_TYPE.text, value: 'Seu Atendimento foi iniciado' }],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 2001
      id: 2001,
      delay: 1,
      MSGs: [
        {
          // 1°
          msg: [
            { type: MSG_TYPE.text, value: 'Seu Atendimento foi Finalizado.' },
          ],
          apikey: 'aaa',
        },
      ],
    },
    {
      // stage 9000
      id: 9000,
      delay: 2,
      MSGs: [
        {
          // 1° ponto de corte para split text
          msg: [{ type: MSG_TYPE.send_msg, value: '/*SEND*/' }],
          apikey: 'aaa',
        },
      ],
    },
  ],
};
//const Anuncio = '';

export default tempMSG;
