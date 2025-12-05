/* eslint-disable no-unneeded-ternary */
import fs from 'fs';
import { decrypt } from '../utils/newEncrypt';

const encodeBase64 = (file: any) => {
  const bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString('base64');
};

const templateTermoCredenciamento = async (medico: any, crm: any, especialidades: any, medicoEspecialidades: any) => {
  const base64Image = encodeBase64('./src/assets/avante_social.png');
  const base64ImageString = `data:image/png;base64,${base64Image}`;
  const medico_razao_social = medico ? medico.med_razao_social : '';
  const med_cpf_cnpj = medico ? medico.med_cpf_cnpj : '';
  const med_email_cnpj = medico && medico.med_email_cnpj !== null ? medico.med_email_cnpj : '';
  const med_nome = medico ? medico.med_nome : '';
  const med_telefone01 = medico ? medico.med_telefone01 : '';
  const usr_email = medico ? medico.usr_usuario.usr_email : '';

  const crm_codigo = crm ? crm.crm_codigo : '';
  const mee_rqe =
    medicoEspecialidades && medicoEspecialidades.mee_rqe !== null
      ? medicoEspecialidades.mee_rqe
      : '';
  const crm_uf = crm ? crm.crm_uf : '';
  const especialidade = especialidades ? especialidades : '';
  const body = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Termo de Credenciamento</title>
</head>
<body style="font-family: 'Liberation Sans', sans-serif; margin: 40px; ">
    <div style="width: 600px; margin: auto;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${base64ImageString}" alt="Logo Avante Social" style="height: 62px; width: 248px; float: left; margin: 0px;">
        </div>
        <br><br><br><br>
        <div style="text-align: center; font-weight: bold; font-size: 18px; margin-bottom: 20px;">
            TERMO DE CREDENCIAMENTO
        </div>
        <div style="margin-left: 20px; margin-bottom: 20px;">
            Termo de Credenciamento para Prestação de Serviços Médicos a serem executados nas unidades de saúde gerenciadas pelo Instituto Jurídico para Efetivação da Cidadania e Saúde – Avante Social, conforme condições previstas no edital de credenciamento nº 34/2021.
        </div>
        <br>
        <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; margin-bottom: 10px;">
                1. CLÁUSULA PRIMEIRA – DA IDENTIFICAÇÃO DAS PARTES
            </div>
            <div style="margin-left: 20px;">
                <p><strong>CREDENCIANTE:</strong> INSTITUTO JURÍDICO PARA EFETIVAÇÃO DA CIDADANIA E SAÚDE - AVANTE SOCIAL, inscrito no CNPJ sob o nº 03.893.350/0001-12, com sede Rua José Hemetério Andrade 950, bairro Buritis, município de Belo Horizonte/MG, CEP 30493-180, neste ato representado por sua Presidente, Dra. Viviane Tompe Souza Mayrink, brasileira, solteira, advogada, inscrita no CPF sob o nº 032.198.616-44.</p>
                
                <p><strong>CREDENCIADO (PESSOA JURÍDICA):</strong></p>
                <p><strong>RAZÃO SOCIAL:</strong> ${decrypt(medico_razao_social)}</p>
                <p><strong>CNPJ:</strong> ${decrypt(med_cpf_cnpj)}</p>
                <p><strong>E-MAIL:</strong> ${decrypt(med_email_cnpj)}</p>
                <p><strong>INFORMAÇÕES PESSOAIS DO PROFISSIONAL MÉDICO:</strong></p>
                <p><strong>NOME COMPLETO:</strong> ${decrypt(med_nome)}</p>
                <p><strong>TELEFONE:</strong> ${decrypt(med_telefone01)}</p>
                <p><strong>E-MAIL:</strong> ${decrypt(usr_email)}</p>
                <p><strong>CRM Nº:</strong> ${crm_codigo}</p>
                <p><strong>RQE:</strong> ${mee_rqe}</p>
                <p><strong>ESTADO DE INSCRIÇÃO NO CRM:</strong> ${crm_uf}</p>
                <p><strong>ESPECIALIDADE:</strong> ${especialidade}</p>
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <div style="font-weight: bold; margin-bottom: 10px;">
                2. CLÁUSULA SEGUNDA – DAS CONSIDERAÇÕES INICIAIS DE REGÊNCIA DO PROCEDIMENTO
            </div>
            <div style="margin-left: 20px;">
                <p>2.1. Considerando que a CREDENCIANTE perfaz a figura de ente privado sem fins lucrativos, na condição de associação civil, a qual traz como objetivos no seu respectivo Estatuto Social a promoção da cidadania, dos direitos humanos e de outros valores universais, bem como o fomento de medidas, planos, programas e projetos na área da saúde, a fim de assegurar a recuperação, a manutenção e a gestão de Unidades de Saúde, em conjunto de atendimentos pré-hospitalares</p>
            </div>
        </div>
    </div>
</body>
</html>


    `;

  return Promise.resolve(body);
};

templateTermoCredenciamento('','','','').catch(() => {
  return false;
});

export default templateTermoCredenciamento;
