const config = {
  expiresAt: 7200 / 60, // 3600 = 1h
  expiresAtAtendimento: 7200,
  imprimirStatusContrato: ['Suspenso', 'Ativo'], // 'Suspenso', 'Ativo','Inativo','Cancelado',

  port: 5699,
  ip: 'localhost',
};
export default config;
