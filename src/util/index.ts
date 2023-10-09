class util {
  validaCpfCnpj(cpfCnpj: string) {
    if (cpfCnpj.length <= 13 && cpfCnpj.length >= 11) {
      let cpf = cpfCnpj.trim();

      cpf = cpf.replace(/\./g, '');
      cpf = cpf.replace('-', '');
      const Acpf = cpf.split('');

      let v1 = 0;
      let v2 = 0;
      let aux = false;

      for (let i = 1; cpf.length > i; i++) {
        if (cpf[i - 1] != cpf[i]) {
          aux = true;
        }
      }

      if (aux == false) {
        return false;
      }

      for (let i = 0, p = 10; cpf.length - 2 > i; i++, p--) {
        v1 += parseInt(Acpf[i]) * p;
      }

      v1 = (v1 * 10) % 11;

      if (v1 == 10) {
        v1 = 0;
      }

      if (v1 != parseInt(Acpf[9])) {
        return false;
      }

      for (let i = 0, p = 11; cpf.length - 1 > i; i++, p--) {
        v2 += parseInt(Acpf[i]) * p;
      }

      v2 = (v2 * 10) % 11;

      if (v2 == 10) {
        v2 = 0;
      }

      if (v2 != parseInt(Acpf[10])) {
        return false;
      } else {
        return true;
      }
    } else if (cpfCnpj.length <= 18 && cpfCnpj.length >= 14) {
      let cnpj = cpfCnpj.trim();

      cnpj = cnpj.replace(/\./g, '');
      cnpj = cnpj.replace('-', '');
      cnpj = cnpj.replace('/', '');
      const Acnpj = cnpj.split('');

      let v1 = 0;
      let v2 = 0;
      let aux = false;

      for (let i = 1; Acnpj.length > i; i++) {
        if (Acnpj[i - 1] != Acnpj[i]) {
          aux = true;
        }
      }

      if (aux == false) {
        return false;
      }

      for (let i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v1 += parseInt(Acnpj[i]) * p1;
        } else {
          v1 += parseInt(Acnpj[i]) * p2;
        }
      }

      v1 = v1 % 11;

      if (v1 < 2) {
        v1 = 0;
      } else {
        v1 = 11 - v1;
      }

      if (v1 != parseInt(Acnpj[12])) {
        return false;
      }

      for (let i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i++, p1--, p2--) {
        if (p1 >= 2) {
          v2 += parseInt(Acnpj[i]) * p1;
        } else {
          v2 += parseInt(Acnpj[i]) * p2;
        }
      }

      v2 = v2 % 11;

      if (v2 < 2) {
        v2 = 0;
      } else {
        v2 = 11 - v2;
      }

      if (v2 != parseInt(Acnpj[13])) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min) + min);
  }
  delay(Seconds: number) {
    return new Promise(function (resolve) {
      setTimeout(resolve, Seconds * 1000);
    });
  }
}

export default util;
