export const DISCIPLINAS_POR_SEMESTRE = [
  {
    semestre: "1º Semestre",
    materias: [
      { value: "etica-legislacao", label: "PAC0008 – Ética e Legislação" },
      { value: "analise-expressao-textual", label: "PAC0050 – Análise e Expressão Textual" },
      { value: "calculo-1", label: "PEX0101 – Cálculo I" },
      { value: "algoritmos", label: "PEX1236 – Algoritmos" },
      { value: "lab-algoritmos", label: "PEX1237 – Laboratório de Algoritmos" },
      { value: "intro-computacao", label: "PEX1239 – Intro. à Computação e SI" },
      { value: "seminario-intro", label: "PEX1240 – Seminário de Introdução" }
    ]
  },
  {
    semestre: "2º Semestre",
    materias: [
      { value: "sociologia", label: "PAC0178 – Sociologia" },
      { value: "adm-empreendedorismo", label: "PAC0595 – Administração e Empreendedorismo" },
      { value: "calculo-2", label: "PEX0102 – Cálculo II" },
      { value: "geometria-analitica", label: "PEX0114 – Geometria Analítica" },
      { value: "aed-1", label: "PEX1241 – Algoritmos e Est. de Dados I" },
      { value: "lab-aed-1", label: "PEX1243 – Lab. de Algoritmos e Est. de Dados I" },
      { value: "arquitetura-computadores", label: "PEX1244 – Arq. e Org. de Computadores" }
    ]
  },
  {
    semestre: "3º Semestre",
    materias: [
      { value: "economia-engenharia", label: "PAC0701 – Economia para Engenharia" },
      { value: "matematica-discreta", label: "PAM0324 – Matemática Discreta" },
      { value: "sistemas-operacionais", label: "PEX0093 – Sistemas Operacionais" },
      { value: "algebra-linear", label: "PEX0096 – Álgebra Linear" },
      { value: "funcoes-varias-variaveis", label: "PEX0117 – Intro. às Funções de Várias Var." },
      { value: "aed-2", label: "PEX1246 – Algoritmos e Est. de Dados II" },
      { value: "lab-aed-2", label: "PEX1247 – Lab. de Algoritmos e Est. de Dados II" }
    ]
  },
  {
    semestre: "4º Semestre",
    materias: [
      { value: "redes-computadores", label: "PEX0041 – Redes de Computadores" },
      { value: "poo", label: "PEX0130 – Programação Orientada a Objetos" },
      { value: "banco-dados", label: "PEX1248 – Banco de Dados" },
      { value: "estatistica", label: "PVE0004 – Estatística" }
    ]
  },
  {
    semestre: "5º Semestre",
    materias: [
      { value: "filosofia-ciencia", label: "PAC0012 – Filosofia da Ciência e Met. Cient." },
      { value: "engenharia-software", label: "PEX0162 – Engenharia de Software" },
      { value: "sistemas-distribuidos", label: "PEX0183 – Sistemas Distribuídos" },
      { value: "computacao-grafica", label: "PEX1249 – Computação Gráfica" }
    ]
  },
  {
    semestre: "6º Semestre",
    materias: [
      { value: "analise-projeto-sistemas", label: "PEX1251 – Análise e Projeto de Sist. OO" },
      { value: "multimidia", label: "PEX1253 – Multimídia" },
      { value: "dependabilidade-seguranca", label: "PEX1254 – Dependabilidade e Segurança" },
      { value: "tcc", label: "PEX1260 – Trabalho de Conclusão de Curso" }
    ]
  }
];

// Flattened list for easy lookup
export const DISCIPLINAS = DISCIPLINAS_POR_SEMESTRE.flatMap(grupo => grupo.materias);
