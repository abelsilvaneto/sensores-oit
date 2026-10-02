// ============ BANCO DE PERGUNTAS DO QUIZ ============
const quizData = [
  {
    question: "Qual é o principal objetivo dos sensores em sistemas de automação e IoT?",
    options: [
      "Processar códigos de programação complexos.",
      "Captar grandezas físicas ou químicas e convertê-las em sinais elétricos.",
      "Fornecer energia elétrica para microcontroladores como o Arduino.",
      "Armazenar bancos de dados na nuvem."
    ],
    answer: 1,
    explanation: "Os sensores atuam como os 'olhos e ouvidos' dos sistemas, captando dados do ambiente e transformando-os em sinais elétricos."
  },
  {
    question: "O sensor ultrassônico HC-SR04 calcula a distância utilizando qual princípio?",
    options: [
      "Variação da resistência com a luz.",
      "Emissão e recepção de pulsos de ondas sonoras de alta frequência.",
      "Efeito Hall e presença de campo magnético.",
      "Diferença de capacitância de placas metálicas."
    ],
    answer: 1,
    explanation: "O HC-SR04 emite um pulso sonoro pelo pino TRIG e mede o tempo até o retorno do eco no pino ECHO para calcular a distância."
  },
  {
    question: "Qual sensor é ideal para detectar a presença de movimento humano utilizando radiação de calor?",
    options: [
      "Sensor de chama IR",
      "Sensor LDR",
      "PIR HC-SR501",
      "Sensor Indutivo LJ12A3"
    ],
    answer: 2,
    explanation: "O sensor PIR (Infravermelho Passivo) detecta variações de radiação térmica emitidas pelo corpo humano ou de animais."
  },
  {
    question: "Qual a característica principal do sensor de proximidade Indutivo?",
    options: [
      "Detecta qualquer tipo de material, como plástico e vidro.",
      "Detecta apenas materiais metálicos sem contato físico.",
      "Mede a umidade relativa do ar.",
      "Funciona por meio de emissão de feixes luminosos."
    ],
    answer: 1,
    explanation: "Sensores indutivos criam um campo eletromagnético e só detectam alvos metálicos."
  },
  {
    question: "Como funciona um sensor do tipo LDR (Light Dependent Resistor)?",
    options: [
      "Aumenta a voltagem emitida quando a temperatura sobe.",
      "Sua resistência elétrica diminui quando a intensidade de luz aumenta.",
      "Mede a vazão de água em litros por minuto.",
      "Fornece sinal digital via barramento I2C."
    ],
    answer: 1,
    explanation: "O LDR é um fotoresistor cuja resistência cai de megaohms no escuro para cerca de 1kΩ sob forte luz."
  },
  {
    question: "Qual protocolo de comunicação é utilizado pelo módulo leitor RFID MFRC522 padrão no Arduino?",
    options: [
      "SPI",
      "Bluetooth",
      "1-Wire",
      "PWM"
    ],
    answer: 0,
    explanation: "O MFRC522 utiliza predominantemente o barramento SPI para comunicação com microcontroladores."
  },
  {
    question: "Para medir a corrente elétrica de uma carga em corrente alternada (CA) mantendo isolamento galvânico, podemos utilizar:",
    options: [
      "DHT22",
      "ACS712",
      "ZMPT101B",
      "SW-420"
    ],
    answer: 1,
    explanation: "O ACS712 mede corrente com base no Efeito Hall, proporcionando isolação elétrica entre o circuito de carga e o microcontrolador."
  },
  {
    question: "O sensor DS18B20 destaca-se por qual característica técnica?",
    options: [
      "Ser um sensor digital de temperatura à prova d'água com protocolo 1-Wire.",
      "Medir a rotação de motores com efeito Hall.",
      "Medir a qualidade do ar com semicondutor aquecido.",
      "Gerar uma tensão analógica linear de 10mV/°C."
    ],
    answer: 0,
    explanation: "O DS18B20 é à prova d'água e utiliza o protocolo OneWire, permitindo ligar múltiplos sensores no mesmo pino digital."
  },
  {
    question: "No microcontrolador Arduino UNO, em quais funções básicas é estruturado um sketch C/C++?",
    options: [
      "start() e run()",
      "setup() e loop()",
      "main() e process()",
      "init() e execute()"
    ],
    answer: 1,
    explanation: "O `setup()` executa uma vez ao ligar o Arduino e o `loop()` roda continuamente enquanto a placa estiver energizada."
  },
  {
    question: "Qual módulo é utilizado junto à Célula de Carga para amplificar o sinal e convertê-lo com precisão de 24 bits em balanças?",
    options: [
      "BH1750",
      "KY-040",
      "HX711",
      "LM393"
    ],
    answer: 2,
    explanation: "O ci HX711 é um amplificador e conversor A/D de 24 bits projetado especificamente para pontes de extensômetros em células de carga."
  }
];

// ============ VARIÁVEIS DE ESTADO ============
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// ============ ELEMENTOS DO DOM ============
const questionNumberEl = document.getElementById('question-number');
const progressFillEl = document.getElementById('progress-fill');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const feedbackEl = document.getElementById('feedback');
const feedbackTextEl = document.getElementById('feedback-text');
const btnNextEl = document.getElementById('btn-next');

const quizContentEl = document.getElementById('quiz-content');
const resultScreenEl = document.getElementById('result-screen');
const scoreCountEl = document.getElementById('score-count');
const totalQuestionsEl = document.getElementById('total-questions');
const scorePercentageEl = document.getElementById('score-percentage');
const scoreMessageEl = document.getElementById('score-message');
const btnRestartEl = document.getElementById('btn-restart');

// Ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// ============ INICIALIZAÇÃO ============
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizContentEl.style.display = 'block';
  resultScreenEl.style.display = 'none';
  loadQuestion();
}

// ============ CARREGAR PERGUNTA ============
function loadQuestion() {
  resetState();
  const currentQ = quizData[currentQuestionIndex];

  // Atualizar progresso
  questionNumberEl.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressFillEl.style.width = `${progressPercent}%`;

  // Exibir pergunta
  questionTextEl.textContent = currentQ.question;

  // Criar botões de opção
  currentQ.options.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = optionText;
    btn.addEventListener('click', () => selectOption(index, btn));
    optionsContainerEl.appendChild(btn);
  });
}

// Reseta o estado para a próxima pergunta
function resetState() {
  selectedOption = null;
  btnNextEl.disabled = true;
  feedbackEl.hidden = true;
  feedbackEl.className = 'feedback';
  optionsContainerEl.innerHTML = '';
}

// ============ SELECIONAR OPÇÃO ============
function selectOption(index, button) {
  if (selectedOption !== null) return; // Evita alterar após a primeira resposta

  selectedOption = index;
  const currentQ = quizData[currentQuestionIndex];
  const allButtons = optionsContainerEl.querySelectorAll('.option-btn');

  // Desabilitar todas as opções após a escolha
  allButtons.forEach(btn => btn.disabled = true);

  // Verificar se a resposta está certa
  if (index === currentQ.answer) {
    button.classList.add('correct');
    feedbackEl.classList.add('correct-fb');
    feedbackTextEl.textContent = `✓ Correto! ${currentQ.explanation}`;
    score++;
  } else {
    button.classList.add('wrong');
    allButtons[currentQ.answer].classList.add('correct'); // Destaca a correta
    feedbackEl.classList.add('wrong-fb');
    feedbackTextEl.textContent = `✗ Incorreto. ${currentQ.explanation}`;
  }

  feedbackEl.hidden = false;
  btnNextEl.disabled = false;
}

// ============ PRÓXIMA PERGUNTA OU RESULTADO ============
btnNextEl.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

// ============ TELA FINAL DE RESULTADOS ============
function showResults() {
  quizContentEl.style.display = 'none';
  resultScreenEl.style.display = 'block';

  const percentage = Math.round((score / quizData.length) * 100);
  scoreCountEl.textContent = score;
  totalQuestionsEl.textContent = quizData.length;
  scorePercentageEl.textContent = `${percentage}%`;

  if (percentage === 100) {
    scoreMessageEl.textContent = "Excelente! Você domina completamente o sensoriamento e os conceitos de IoT!";
  } else if (percentage >= 70) {
    scoreMessageEl.textContent = "Muito bem! Você demonstrou ótimo conhecimento em sensores e eletrônica.";
  } else if (percentage >= 50) {
    scoreMessageEl.textContent = "Bom trabalho! Que tal revisar alguns sensores no catálogo para melhorar ainda mais?";
  } else {
    scoreMessageEl.textContent = "Continue praticando! Volte ao catálogo, revise as especificações e tente novamente.";
  }
}

// Reiniciar Quiz
btnRestartEl.addEventListener('click', startQuiz);

// Iniciar ao carregar a página
startQuiz();