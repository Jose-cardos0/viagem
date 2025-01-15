"use client";

import { useState } from "react";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";

interface TR {
  placa: string;
  data: string;
  hora: string;
  motorista: string;
}

export default function Home() {
  // Estado para armazenar as TRs
  const [trs, setTrs] = useState<TR[]>([]);

  // Estado para a TR atual (em edição)
  const [placa, setPlaca] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [hora, setHora] = useState<string>("");
  const [motorista, setMotorista] = useState<string>("");

  // Função para adicionar uma nova TR
  const adicionarTR = () => {
    if (placa && data && hora && motorista) {
      const novaTR: TR = { placa, data, hora, motorista };
      setTrs([...trs, novaTR]); // Adiciona a nova TR à lista
      // Limpa os campos após adicionar
      setPlaca("");
      setData("");
      setHora("");
      setMotorista("");
    } else {
      alert("Preencha todos os campos antes de adicionar uma TR.");
    }
  };

  // Função para gerar o Excel
  const handleGerarExcel = () => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Relatório");

    // Adiciona cabeçalhos à planilha
    worksheet.addRow(["Placa", "Data e Hora", "Motorista"]);

    // Itera sobre as TRs e adiciona cada uma à planilha
    trs.forEach((tr) => {
      const dataFormatada = formatarData(tr.data); // Formata a data
      const horaFormatada = formatarHora(tr.hora); // Formata a hora
      const dataHoraFormatada = `${dataFormatada} ${horaFormatada}`; // Combina data e hora

      worksheet.addRow([tr.placa, dataHoraFormatada, tr.motorista]);
    });

    // Gera o arquivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        "relatorio.xlsx"
      );
    });
  };

  // Função para formatar a data (de yyyy-MM-dd para dd/MM/yyyy)
  const formatarData = (data: string) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  // Função para formatar a hora (de HH:mm para HH:mm:ss)
  const formatarHora = (hora: string) => {
    return `${hora}:00`; // Adiciona os segundos
  };

  return (
    <main className="w-screen flex flex-col items-center justify-center m-auto p-4">
      {/* Formulário para adicionar uma nova TR */}
      <div className="mb-4">
        <select
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="">Selecione uma placa</option>
          <option value="RRB-1J01">RRB-1J01</option>
          <option value="RRB-8C27">RRB-8C27</option>
          <option value="QMP-7J25">QMP-7J25</option>
          <option value="RRB-3F02">RRB-3F02</option>
          <option value="QMO-7C44">QMO-7C44</option>
          <option value="QMP-7J22">QMP-7J22</option>
          <option value="QMP-0H82">QMP-0H82</option>
          <option value="RQW-2E29">RQW-2E29</option>
          <option value="QMP-7J31">QMP-7J31</option>
          <option value="QMO-5F44">QMO-5F44</option>
          <option value="RRB-9F95">RRB-9F95</option>
          <option value="QMP-7J48">QMP-7J48</option>
          <option value="RRG-7D37">RRG-7D37</option>
          <option value="RRB-9F92">RRB-9F92</option>
          <option value="QMP-7J47">QMP-7J47</option>
          <option value="RRG-7D41">RRG-7D41</option>
          <option value="RRB-0B42">RRB-0B42</option>
          <option value="QMO-5F42">QMO-5F42</option>
          <option value="QMO-7C43">QMO-7C43</option>
          <option value="RRB-3F07">RRB-3F07</option>
          <option value="RRB-8C31">RRB-8C31</option>
          <option value="QMO-1G46">QMO-1G46</option>
          <option value="QMG-3620">QMG-3620</option>
        </select>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="p-2 border rounded-lg mx-2"
        />

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="p-2 border rounded-lg mx-2"
        />

        <select
          value={motorista}
          onChange={(e) => setMotorista(e.target.value)}
          className="p-2 border rounded-lg mx-2"
        >
          <option value="">Selecione um Motorista</option>
          <option value="BRENO OLIVEIRA DE ARAGAO - 9985">
            BRENO OLIVEIRA DE ARAGAO - 9985
          </option>
          <option value="CARLOS HENRIQUE BOMFIM SANTOS - 3053">
            CARLOS HENRIQUE BOMFIM SANTOS - 3053
          </option>
          <option value="CARLOS ROBERTO VIEIRA DA SILVA - 5269">
            CARLOS ROBERTO VIEIRA DA SILVA - 5269
          </option>
          <option value="EDMILSON RESENDE DOS SANTOS - 3166">
            EDMILSON RESENDE DOS SANTOS - 3166
          </option>
          <option value="EMERSON PEREIRA DE JESUS - 4123">
            EMERSON PEREIRA DE JESUS - 4123
          </option>
          <option value="GILDEVAN ALVES DE OLIVEIRA - 4206">
            GILDEVAN ALVES DE OLIVEIRA - 4206
          </option>
          <option value="HEUDO AMARAL SANTOS - 7174">
            HEUDO AMARAL SANTOS - 7174
          </option>
          <option value="HEUDO AMARAL SANTOS JUNIOR - 2048">
            HEUDO AMARAL SANTOS JUNIOR - 2048
          </option>
          <option value="JHONI MARQUES DE ANDRADE - 6945">
            JHONI MARQUES DE ANDRADE - 6945
          </option>
          <option value="JOSE ALEX MATIAS SANTOS - 0539">
            JOSE ALEX MATIAS SANTOS - 0539
          </option>
          <option value="JOSE ANCELMO MOREIRA SANTANA - 5749">
            JOSE ANCELMO MOREIRA SANTANA - 5749
          </option>
          <option value="JOSE FABIO DE SANTANA SILVA - 9959">
            JOSE FABIO DE SANTANA SILVA - 9959
          </option>
          <option value="LUCIO FLAVIO DOS SANTOS - 0751">
            LUCIO FLAVIO DOS SANTOS - 0751
          </option>
          <option value="LUIZ MAGNO DE OLIVEIRA - 7158">
            LUIZ MAGNO DE OLIVEIRA - 7158
          </option>
          <option value="MARCIO AZEVEDO SANTOS - 5913">
            MARCIO AZEVEDO SANTOS - 5913
          </option>
          <option value="MARCIO JOSE NAZARE - 8152">
            MARCIO JOSE NAZARE - 8152
          </option>
          <option value="MIZAEL SANTOS PEREIRA - 5890">
            MIZAEL SANTOS PEREIRA - 5890
          </option>
          <option value="RAFAEL VIEIRA DE SOUZA - 2910">
            RAFAEL VIEIRA DE SOUZA - 2910
          </option>
          <option value="RODRIGO CORREIA SANTOS - 5764">
            RODRIGO CORREIA SANTOS - 5764
          </option>
          <option value="VANALDO BATISTA DA SILVA - 2614">
            VANALDO BATISTA DA SILVA - 2614
          </option>
          <option value="WEDSON DOS SANTOS DANTAS - 5756">
            WEDSON DOS SANTOS DANTAS - 5756
          </option>
          <option value="WHODSON THIAGO SILVA BARRETO - 7141">
            WHODSON THIAGO SILVA BARRETO - 7141
          </option>
          <option value="ALEFE OLIVEIRA DE SOUSA - 6742">
            ALEFE OLIVEIRA DE SOUSA - 6742
          </option>
          <option value="ANTONIO FABIO SANTOS DANTAS - 6668">
            ANTONIO FABIO SANTOS DANTAS - 6668
          </option>
          <option value="FLAVIO JOSE SANTOS DANTAS - 1974">
            FLAVIO JOSE SANTOS DANTAS - 1974
          </option>
          <option value="JOSE CARLOS COSTA DANTAS - 5137">
            JOSE CARLOS COSTA DANTAS - 5137
          </option>

          <option value="LUIZ VANDERLEI FARIAS SILVA - 7369">
            LUIZ VANDERLEI FARIAS SILVA - 7369
          </option>
        </select>

        <button
          onClick={adicionarTR}
          className="bg-green-500 text-white p-2 rounded-lg ml-2"
        >
          Adicionar TR
        </button>
      </div>

      {/* Tabela para exibir as TRs adicionadas */}
      <table className="max-w-7xl mb-4">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Motorista</th>
          </tr>
        </thead>
        <tbody>
          {trs.map((tr, index) => (
            <tr key={index}>
              <td>{tr.placa}</td>
              <td>{formatarData(tr.data)}</td>
              <td>{formatarHora(tr.hora)}</td>
              <td>{tr.motorista}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-green-500 text-white p-2 rounded-lg ml-2"
        onClick={handleGerarExcel}
      >
        Gerar Excel
      </button>
    </main>
  );
}
