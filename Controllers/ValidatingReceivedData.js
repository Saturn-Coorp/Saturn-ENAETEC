const Joi = require('joi')

// Validating the received data
const complaintValidate = (data) => {
    const schema = Joi.object({
        name:Joi.string().trim().required().messages({
          'string.empty': `O campo (Nome) não pode ser vazio!`
        }),
        cpf:Joi.number().min(11).required().messages({
          'number.min':'CPF deve ter no minimo 11 digitos!',
        }),
        district:Joi.string().trim().required().messages({
          'string.empty': `O campo (Bairro) não pode ser vazio!`
        }),
        street:Joi.string().trim().required().messages({
          'string.empty': `O campo (Rua) pode ser vazio!`
        }),
        content:Joi.string().trim().required().messages({
          'string.empty': `O campo (Conteudo) não pode ser vazio!`
        }),
        image:Joi.string().trim().required().messages({
          'string.empty': `Coloque uma imagem !`
        }),
    })

    return schema.validate(data)
} 

// Validating  if the CPF is exist
function verificationCPF(strCPF) {
  let Sum;
  let Rest;
  Sum = 0;
  if (strCPF == "00000000000" || strCPF == "11111111111"  
  || strCPF == "22222222222" || strCPF == "33333333333" 
  || strCPF == "44444444444" || strCPF == "55555555555" 
  || strCPF == "66666666666" || strCPF == "77777777777"
  || strCPF == "88888888888" || strCPF == "99999999999") return false;

  for (i=1; i<=9; i++) Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Rest = (Sum * 10) % 11;

  if ((Rest == 10) || (Rest == 11))  Rest = 0;
  if (Rest != parseInt(strCPF.substring(9, 10)) ) return false;

  Sum = 0;
  for (i = 1; i <= 10; i++) Sum = Sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Rest = (Sum * 10) % 11;

  if ((Rest == 10) || (Rest == 11))  Rest = 0;
  if (Rest != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}




module.exports = {complaintValidate,verificationCPF}