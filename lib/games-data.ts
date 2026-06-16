import type { Categoria, PairType } from './store'

// ===================== DADO DO AMOR =====================

export interface DadoFace {
  id: string;
  emoji: string;
  nome: string;
  cor: string;
  descricao: string;
}

// ===================== FASES DO ATO =====================

export type FaseSexo = 1 | 2 | 3 | 4

export interface DadoFaseInfo {
  fase: FaseSexo
  emoji: string
  label: string
  sublabel: string
  cor: string
}

export const DADO_FASES_INFO: DadoFaseInfo[] = [
  { fase: 1, emoji: '🔥', label: 'Aquecimento', sublabel: 'Beijo, toque, provocação', cor: '#ff9f43' },
  { fase: 2, emoji: '💦', label: 'Excitação',   sublabel: 'Oral, dedos, estimulação', cor: '#f0197d' },
  { fase: 3, emoji: '🌋', label: 'Penetração',  sublabel: 'Posições, transa', cor: '#8b5cf6' },
  { fase: 4, emoji: '💥', label: 'Finalização', sublabel: 'Até o fim', cor: '#ff4757' },
]

// ---- Fase 1: Aquecimento ----
const DADO_F1: DadoFace[] = [
  { id: 'beijo',     emoji: '💋', nome: 'Beijo Intenso',   cor: '#ff9f43', descricao: '{A}, beija {B} com língua, mordendo o lábio de baixo. Pelo menos 2 minutos sem parar.' },
  { id: 'pescoco',   emoji: '🔥', nome: 'Pescoço & Orelha',cor: '#ff9f43', descricao: '{A}, beija, morde e lamba o pescoço e a orelha {daB} devagar até {eleB} arrepiar.' },
  { id: 'tira-roupa',emoji: '👕', nome: 'Tira a Roupa',    cor: '#ff9f43', descricao: '{A}, tira uma peça de roupa {daB} do jeito que quiser — pode usar os dentes.' },
  { id: 'massagem',  emoji: '🤲', nome: 'Massagem Sensual',cor: '#ff9f43', descricao: '{A}, massageia {B} por 3 minutos. Começa pelos ombros e vai descendo devagar.' },
  { id: 'sussurro',  emoji: '🫦', nome: 'Sussurra',        cor: '#ff9f43', descricao: '{A}, sussurra {emB} a coisa mais suja que vai fazer com {eleB} mais tarde. Detalha.' },
  { id: 'coxa',      emoji: '🦵', nome: 'Coxa Interna',    cor: '#ff9f43', descricao: '{A}, beija e lamba a coxa interna {daB} de baixo para cima — para antes de chegar lá.' },
  { id: 'venda',     emoji: '🎁', nome: 'Olhos Vendados',  cor: '#ff9f43', descricao: '{A}, venda os olhos {daB} e toca em 5 lugares diferentes com a língua. {B} tenta adivinhar.' },
  { id: 'mordi-seio',emoji: '💜', nome: 'Seio & Peito',    cor: '#ff9f43', descricao: '{A}, beija, chupa e morde os seios ou o peito {daB} até {eleB} pedir para parar.' },
]

// ---- Fase 2: Excitação ----
const DADO_F2: DadoFace[] = [
  { id: 'oral',        emoji: '👅', nome: 'Oral',            cor: '#f0197d', descricao: '{A}, faz sexo oral {emB} por no mínimo 3 minutos. Foco total — é só sobre {eleB} agora.' },
  { id: 'dedos',       emoji: '✋', nome: 'Dedos',           cor: '#f0197d', descricao: '{A}, usa os dedos para estimular {B} devagar até {eleB} implorar por mais.' },
  { id: 'masturba',    emoji: '💦', nome: 'Masturba',        cor: '#f0197d', descricao: '{A}, masturba {B} do jeito que {eleB} mais gosta. Olha nos olhos enquanto faz.' },
  { id: 'oral-ativo',  emoji: '🫦', nome: 'Oral Ativo',     cor: '#f0197d', descricao: '{B}, senta no rosto {daA}. {A} usa a língua sem parar por 2 minutos.' },
  { id: 'estimula-pg', emoji: '⭐', nome: 'Ponto G',         cor: '#f0197d', descricao: '{A}, estimula o ponto G ou próstata {daB} com os dedos por 5 minutos. Sem pressa.' },
  { id: 'ordem-exec',  emoji: '⚡', nome: 'Ordem',           cor: '#f0197d', descricao: '{B} dá uma ordem sexual para {A}. {A} obedece imediatamente e sem questionar.' },
  { id: 'dois-ao-mesmo', emoji: '🔁', nome: 'Simultâneo',   cor: '#f0197d', descricao: '{A} e {B} se estimulam ao mesmo tempo por 2 minutos. Quem para primeiro paga um desafio.' },
  { id: 'prova',       emoji: '👁️', nome: 'Se Aguenta',      cor: '#f0197d', descricao: '{A}, estimula {B} até o limite. {B} não pode gozar ainda — se gozar, reinicia a fase.' },
]

// ---- Fase 3: Penetração ----
const DADO_F3_BASE: DadoFace[] = [
  { id: 'transa',      emoji: '🌋', nome: 'Transa Agora',   cor: '#8b5cf6', descricao: '{A} e {B}: para de jogar e vai transar. Escolhe a posição na hora. Só volta quando acabar.' },
  { id: 'posicao-nova',emoji: '🔥', nome: 'Posição Nova',   cor: '#8b5cf6', descricao: '{A} e {B}: escolhem uma posição que nunca tentaram e testam agora, sem desculpa.' },
  { id: 'quickie',     emoji: '⚡', nome: 'Quickie',         cor: '#8b5cf6', descricao: '{A} e {B}: 5 minutos de sexo intenso e rápido. Sem aquecimento — entra e vai.' },
  { id: 'por-cima',    emoji: '🏇', nome: 'Por Cima',        cor: '#8b5cf6', descricao: '{B}, fica por cima e controla tudo. Ritmo, profundidade, tempo — você manda.' },
  { id: 'doggy',       emoji: '🐕', nome: 'Por Trás',        cor: '#8b5cf6', descricao: '{B} de quatro, {A} por trás. Segura os quadris e define o ritmo.' },
  { id: 'parede',      emoji: '🧱', nome: 'Na Parede',       cor: '#8b5cf6', descricao: '{A} e {B}: em pé contra a parede. Pode ser de frente ou por trás. Vai com força.' },
]

const DADO_F3_BDSM: DadoFace[] = [
  { id: 'dominacao',   emoji: '⛓️', nome: 'Dominação',      cor: '#7c3aed', descricao: '{A}, você manda {emB} por 5 minutos. {B} obedece qualquer ordem sem questionar.' },
  { id: 'palmada',     emoji: '👋', nome: 'Palmada',         cor: '#7c3aed', descricao: '{A}, dá uma palmada forte na bunda {daB} e beija o lugar logo depois.' },
]

// ---- Fase 4: Finalização ----
const DADO_F4: DadoFace[] = [
  { id: 'oral-fim',    emoji: '💋', nome: 'Oral até Gozar', cor: '#ff4757', descricao: '{A}, faz sexo oral {emB} até {eleB} gozar. Não para. Não tem mais próxima fase.' },
  { id: 'mao-fim',     emoji: '💦', nome: 'Mão até Acabar', cor: '#ff4757', descricao: '{A}, masturba {B} até {eleB} gozar olhando nos olhos.' },
  { id: 'posicao-fav', emoji: '🌋', nome: 'Posição Favorita',cor: '#ff4757', descricao: '{B}, escolhe a posição favorita para gozar. {A} dá tudo o que tem.' },
  { id: 'vale-tudo-fim',emoji: '😈', nome: 'Vale Tudo',      cor: '#ff4757', descricao: '{A}, você tem controle total agora. Faz {B} gozar do jeito que você escolher.' },
  { id: 'goza-onde',   emoji: '💥', nome: 'Escolhe Onde',   cor: '#ff4757', descricao: '{B} decide onde quer que {A} goe. Fala agora — e {A} cumpre.' },
]

export function getDadoFaseFaces(fase: FaseSexo, cats: Categoria[]): DadoFace[] {
  if (fase === 1) return DADO_F1
  if (fase === 2) return DADO_F2
  if (fase === 3) {
    let f3 = [...DADO_F3_BASE]
    if (cats.includes('bdsm')) f3 = f3.concat(DADO_F3_BDSM)
    return f3
  }
  return DADO_F4
}

// kept for backward compat — returns all faces flat
export const DADO_FACES: DadoFace[] = [...DADO_F1, ...DADO_F2, ...DADO_F3_BASE, ...DADO_F4];

// ===================== KAMA SUTRA =====================

export interface KamaPosicao {
  id: string;
  emoji: string;
  nome: string;
  descricao: string;
}

export const KAMA_SUAVE: KamaPosicao[] = [
  { id: 'colher', emoji: '🌙', nome: 'Colher', descricao: 'Deita de lado, um por trás do outro. Penetração suave com as mãos livres para acariciar seios e clitóris.' },
  { id: 'lotus', emoji: '🌸', nome: 'Lótus', descricao: 'Um senta no colo do outro, pernas entrelaçadas, penetração rasa e profundo contato. Beija muito.' },
  { id: 'missionario', emoji: '💫', nome: 'Missionário', descricao: 'Clássico mas gostoso: face a face, dá para beijar, morder o pescoço e olhar nos olhos enquanto fode.' },
  { id: 'abraco', emoji: '🤗', nome: 'Abraço', descricao: 'De frente um ao outro deitados, pernas entrelaçadas. Penetração lenta com bastante contato de pele.' },
  { id: 'almofada', emoji: '☁️', nome: 'Almofada', descricao: 'Coloca almofada debaixo dos quadris de quem recebe. Muda o ângulo, penetra mais fundo. Experimenta.' },
  { id: 'contemplacao', emoji: '👁️', nome: 'Contemplação', descricao: 'Sentados frente a frente, parceiro/a no colo. Penetração com beijo e olho no olho — muito íntimo.' },
  { id: 'bambu', emoji: '🎋', nome: 'Bambu', descricao: 'De lado, alinhados, pernas juntas. Penetração com fricção intensa no clitóris a cada movimento.' },
  { id: 'borboleta', emoji: '🦋', nome: 'Borboleta', descricao: 'Quem recebe na beira da cama, pernas fechadas. O outro em pé — penetração lenta, sensação única.' },
  { id: 'uniao', emoji: '🔗', nome: 'União', descricao: 'Sentados frente a frente, pernas abertas entrelaçadas, quadris juntos. Movimentos circulares.' },
  { id: 'encaixe', emoji: '🧩', nome: 'Encaixe', descricao: 'Colher aberta com a perna de cima levantada. Penetração mais profunda, mãos livres para o clitóris.' },
  { id: 'jardim', emoji: '🌺', nome: 'Jardim', descricao: 'Pés nos ombros de quem penetra. Ângulo diferente, sensação intensa — ajusta a profundidade pelos ombros.' },
  { id: 'roca', emoji: '🪑', nome: 'Balanço', descricao: 'Sentados, quem está por cima controla o ritmo em movimento de vai e vem. Penetração no seu tempo.' },
  { id: 'quatro', emoji: '🐪', nome: 'Quatro Apoios', descricao: 'De quatro, movimentos lentos. Penetração por trás com as mãos alcançando clitóris ou peito.' },
  { id: 'ponte', emoji: '🌉', nome: 'Ponte', descricao: 'Quem recebe faz ponte, abrindo mais. O outro ajoelhado na frente. Penetração com ângulo incrível.' },
  { id: 'ninho', emoji: '🐦', nome: 'Ninho', descricao: 'Colher com joelhos dobrados e perna de cima dobrada. Penetração profunda, abraço total.' },
  { id: 'espelho', emoji: '🪞', nome: 'Espelho', descricao: 'Sentados frente a frente num espelho. Penetração enquanto os dois se veem transando. Hot.' },
  { id: 'lua', emoji: '🌙', nome: 'Lua', descricao: 'Colher com quem recebe levantando o quadril ligeiramente. Penetração mais profunda, estimula o ponto G.' },
  { id: 'trono', emoji: '👑', nome: 'Trono', descricao: 'Cadeira ou poltrona: um sentado, o outro no colo de frente ou de costas. Penetração com gravidade.' },
  { id: 'lareira', emoji: '🔥', nome: 'Lareira', descricao: 'De lado frente a frente, pernas entrelaçadas. Movimento lento, muito beijo, clitóris encostando.' },
  { id: 'seda', emoji: '🎀', nome: 'Seda', descricao: 'Quem penetra por cima apoiado nos cotovelos, barriga com barriga, contato máximo. Vai devagar.' },
];

export const KAMA_QUENTE: KamaPosicao[] = [
  { id: 'cavalgada', emoji: '🏇', nome: 'Cavalgada', descricao: 'Por cima, controlando tudo. Penetração no ritmo que quiser, inclina para frente para bater o clitóris.' },
  { id: 'arco', emoji: '🏹', nome: 'Arco', descricao: 'De costas, inclina para trás enquanto o/a parceiro/a penetra por baixo. Estimula o ponto G direto.' },
  { id: 'escorpiao', emoji: '🦂', nome: 'Escorpião', descricao: 'De quatro, pernas fechadas. Parceiro por trás com as pernas fora. Apertado, profundo, intenso.' },
  { id: 'cadeira', emoji: '🪑', nome: 'Cadeira', descricao: 'Senta na beira da cama/cadeira, parceiro/a por cima de frente. As mãos ficam livres para tudo.' },
  { id: 'andorinha', emoji: '🕊️', nome: 'Andorinha', descricao: 'Deitado/a, pernas nos ombros. Penetração muito profunda, parceiro controla o ritmo e a força.' },
  { id: 'preguica', emoji: '🦥', nome: 'Preguiça', descricao: 'De lado por trás, perna de cima levantada. Mão livre no clitóris e penetração gostosa.' },
  { id: 'aranha', emoji: '🕷️', nome: 'Aranha', descricao: 'Sentados frente a frente inclinados para trás, pernas entrelaçadas. Penetração funda, fricção total.' },
  { id: 'elefante', emoji: '🐘', nome: 'Elefante', descricao: 'De bruços, pernas fechadas, quem penetra por cima. Apertado ao máximo, profundidade intensa.' },
  { id: 'serpente', emoji: '🐍', nome: 'Serpente', descricao: 'Colher com quem recebe esticado/a reto. Penetração rasa mas muito apertada. Vai devagar.' },
  { id: 'teia', emoji: '🕸️', nome: 'Teia', descricao: 'Deitado/a, parceiro agachado sobre você. Controle total de profundidade, visual incrível.' },
  { id: 'aguia', emoji: '🦅', nome: 'Águia', descricao: 'Pernas abertas em V, parceiro ajoelhado entre elas. Penetração com acesso ao clitóris e ao peito.' },
  { id: 'leao', emoji: '🦁', nome: 'Leão', descricao: 'Por trás, de joelhos, parceiro se inclina para frente. Penetração com as mãos dominando os quadris.' },
  { id: 'tigre', emoji: '🐯', nome: 'Tigre', descricao: 'De quatro, quem penetra em pé atrás. Dá para controlar a força e puxar os cabelos.' },
  { id: 'cisne', emoji: '🦢', nome: 'Cisne', descricao: 'De bruços, almofada sob o abdômen, quadris levantados. Penetração profunda e gostosa.' },
  { id: 'parede', emoji: '🎍', nome: 'Parede', descricao: 'Em pé contra a parede, por trás ou de frente. Intenso, apaixonado, sem cama necessária.' },
  { id: 'cavalgada-invertida', emoji: '🔥', nome: 'Cavalgada Invertida', descricao: 'Por cima, virada de costas. Penetração diferente, o/a parceiro/a vê e agarra tudo.' },
  { id: 'beira-cama', emoji: '🌊', nome: 'Beira da Cama', descricao: 'Quem recebe na beira, de costas, pés no chão. Parceiro em pé penetrando — ótimo ângulo.' },
  { id: 'ancora', emoji: '⚓', nome: 'Âncora', descricao: 'Pernas enroladas na cintura. Puxa para dentro a cada movimento. Profundidade e calor juntos.' },
  { id: 'ventania', emoji: '💨', nome: 'Em Pé', descricao: 'Em pé, parceiro/a levantado/a com as pernas na cintura. Usa a parede de apoio. Intenso.' },
  { id: 'vulcao', emoji: '🌋', nome: 'Vulcão', descricao: 'Almofada embaixo dos quadris, ângulo mudado completamente. Penetração mais funda com menos força.' },
];

export const KAMA_INTENSO: KamaPosicao[] = [
  { id: 'gaviao', emoji: '🦅', nome: 'Gavião', descricao: 'Pernas dobradas sobre os ombros de quem penetra. Ângulo extremo — vai fundo. Segura nos quadris.' },
  { id: 'parafuso', emoji: '🔩', nome: 'Parafuso', descricao: 'De lado perpendicular um ao outro. Entrada diferente, fricção intensa nas paredes. Vai devagar no começo.' },
  { id: 'pistao', emoji: '💥', nome: 'Pistão', descricao: 'Deitado/a, pernas bem abertas. Quem penetra em pé, ritmo forte e rápido. Sem parar até acabar.' },
  { id: 'montanha', emoji: '⛰️', nome: 'Montanha', descricao: 'Quem recebe dobrado/a quase ao meio. Parceiro em pé por trás. Penetração mais funda possível.' },
  { id: 'tornado', emoji: '🌪️', nome: 'Tornado', descricao: 'Cavalgada com rotação lenta. Quem está por cima gira 360° devagar enquanto permanece penetrado/a.' },
  { id: 'raio', emoji: '⚡', nome: 'Raio', descricao: 'Em pé, um levantado com as pernas na cintura. Bate fundo com toda a força. Parede é essencial.' },
  { id: 'explosao', emoji: '💣', nome: 'Explosão', descricao: 'Na borda da cama, pernas no ombro. Penetração com ângulo e profundidade máxima. Segura as coxas.' },
  { id: 'queda-livre', emoji: '🪂', nome: 'Queda Livre', descricao: 'Suspenso/a com pernas enroladas, parceiro controlando. Penetração intensa, sem apoio, só confiança.' },
  { id: 'pinca', emoji: '🦞', nome: 'Pinça', descricao: 'Deitado/a, pernas juntas e erguidas na vertical. Quem penetra por cima. Apertadíssimo, vai fundo.' },
  { id: 'furacao', emoji: '🌀', nome: 'Furacão', descricao: 'Colher com perna de cima levantada bem alto. Ritmo rápido e forte. Mão no clitóris obrigatório.' },
  { id: 'bigorna', emoji: '⚒️', nome: 'Bigorna', descricao: 'Pernas dobradas sobre o peito de quem recebe. Penetração mais profunda do catálogo. Respira.' },
  { id: 'catapulta', emoji: '🏰', nome: 'Catapulta', descricao: 'Quadris elevados ao máximo com almofadas. Parceiro ajoelhado penetrando com força total.' },
  { id: 'caldeirão', emoji: '🪄', nome: 'Caldeirão', descricao: 'Cavalgada com quem está embaixo segurando e guiando os quadris. Profundidade e ritmo controlados.' },
  { id: 'turbina', emoji: '✈️', nome: 'Turbina', descricao: 'Em pé, parceiro/a inclinado/a a 45°, apoiado em algo. Penetração potente e ritmada.' },
  { id: 'eclipse', emoji: '🌑', nome: 'Eclipse', descricao: 'Pernas totalmente abertas e elevadas. Parceiro segura os tornozelos, controle absoluto do ritmo.' },
  { id: 'maremoto', emoji: '🌊', nome: 'Maremoto', descricao: 'Em pé, de costas na parede. Parceiro batendo forte pela frente. Dá para beijar e puxar o cabelo.' },
  { id: 'terremoto', emoji: '🌍', nome: 'Terremoto', descricao: 'Sentado/a com pernas abertas ao máximo. Parceiro de joelhos na frente. Penetração profunda e direta.' },
  { id: 'sol', emoji: '☀️', nome: 'Sol Ardente', descricao: 'Cavalgada inclinada para frente, coxas abertas. Clitóris bate em cada movimento. Ritmo intenso.' },
  { id: 'dragao', emoji: '🦎', nome: 'Dragão', descricao: 'De bruços, quadris levemente levantados. Quem penetra por cima, peso total. Muito apertado.' },
  { id: 'meteoro', emoji: '☄️', nome: 'Meteoro', descricao: 'Suspenso nas bordas da cama, parceiro em pé. Ângulo extremo, penetração máxima, força total.' },
];

// ===================== EU NUNCA =====================

export interface EuNuncaItem {
  texto: string
  cat: Categoria
}

export const EU_NUNCA_ITEMS: EuNuncaItem[] = [
  // --- PRELIMINARES ---
  { texto: 'gozei só de sexo oral sem precisar de mais nada', cat: 'preliminares' },
  { texto: 'fiz sexo oral e engoli', cat: 'preliminares' },
  { texto: 'fiquei molhado/a ou duro/a só com um beijo', cat: 'preliminares' },
  { texto: 'me masturbei com outra pessoa me olhando', cat: 'preliminares' },
  { texto: 'mandei foto ou vídeo nu/a para alguém', cat: 'preliminares' },
  { texto: 'chupei peito até deixar marca', cat: 'preliminares' },
  { texto: 'dei uma chupada tão boa que a pessoa gritou', cat: 'preliminares' },
  { texto: 'fiz sexo oral por mais de 20 minutos sem parar', cat: 'preliminares' },
  { texto: 'gemi muito alto e me arrependi depois', cat: 'preliminares' },
  { texto: 'transei sem tirar toda a roupa porque não deu tempo', cat: 'preliminares' },
  { texto: 'fiz algo íntimo com risco real de alguém aparecer', cat: 'preliminares' },
  { texto: 'usei gelo ou cera durante sexo', cat: 'preliminares' },
  { texto: 'fingi que não tava excitado/a quando tava completamente molhado/a ou duro/a', cat: 'preliminares' },
  { texto: 'deixei alguém me ver nu/a sem perceber que tava vendo', cat: 'preliminares' },
  { texto: 'provoquei alguém sexualmente sem intenção de ir até o fim', cat: 'preliminares' },
  { texto: 'transei no banheiro de outra pessoa durante uma festa', cat: 'preliminares' },
  { texto: 'tive um orgasmo só de preliminares', cat: 'preliminares' },
  { texto: 'fui interrompido durante sexo e continuei mesmo assim', cat: 'preliminares' },
  { texto: 'passei vergonha num momento íntimo e ri no meio', cat: 'preliminares' },
  { texto: 'fiz sexo oral sendo que nunca tinha feito antes e adorei', cat: 'preliminares' },
  // --- PENETRAÇÃO ---
  { texto: 'transei na primeira noite com alguém que acabei de conhecer', cat: 'penetracao' },
  { texto: 'transei em carro, banheiro público ou lugar aberto', cat: 'penetracao' },
  { texto: 'acordei alguém no meio da madrugada para transar e a pessoa aceitou', cat: 'penetracao' },
  { texto: 'transei por mais de 2 horas seguidas', cat: 'penetracao' },
  { texto: 'tive um segundo round sem sair da cama', cat: 'penetracao' },
  { texto: 'transei ao ar livre — praia, mata ou sacada', cat: 'penetracao' },
  { texto: 'gozei mais de uma vez na mesma transa', cat: 'penetracao' },
  { texto: 'usei vibrador ou brinquedo junto com penetração', cat: 'penetracao' },
  { texto: 'transei de manhã antes de escovar o dente', cat: 'penetracao' },
  { texto: 'tentei uma posição nova e ficou melhor do que esperava', cat: 'penetracao' },
  { texto: 'transei e a cama fez barulho suficiente para alguém ouvir', cat: 'penetracao' },
  { texto: 'transei com alguém muito mais experiente e aprendi muito', cat: 'penetracao' },
  { texto: 'precisei de uma pausa para beber água e voltei', cat: 'penetracao' },
  { texto: 'transei tão bem que fiquei com o corpo doendo no dia seguinte', cat: 'penetracao' },
  { texto: 'transei na cozinha, sala ou lugar fora do quarto', cat: 'penetracao' },
  // --- ANAL ---
  { texto: 'recebi estimulação anal com a língua e adorei', cat: 'anal' },
  { texto: 'experimentei penetração anal e gostei', cat: 'anal' },
  { texto: 'usei plug anal e saí de casa com ele', cat: 'anal' },
  { texto: 'dei estimulação anal para o/a parceiro/a com a língua', cat: 'anal' },
  { texto: 'tentei anal sem preparação e correu mal', cat: 'anal' },
  { texto: 'tive um orgasmo com estimulação anal simultânea', cat: 'anal' },
  { texto: 'usei vibrador ou dildo anal junto com sexo vaginal', cat: 'anal' },
  { texto: 'pedi para experimentar anal e meu parceiro/a topou de cara', cat: 'anal' },
  { texto: 'fiz preparação completa para anal e valeu cada minuto', cat: 'anal' },
  { texto: 'gozei só de penetração anal sem estimulação extra', cat: 'anal' },
  // --- BDSM ---
  { texto: 'fui amarrado/a e gozei sem conseguir me mexer', cat: 'bdsm' },
  { texto: 'dominei alguém completamente e mandei nele/ela o tempo todo', cat: 'bdsm' },
  { texto: 'transei vendado/a sem saber o que ia vir', cat: 'bdsm' },
  { texto: 'dei ou recebi palmada na bunda durante sexo', cat: 'bdsm' },
  { texto: 'fiz roleplay de chefe e subordinado/a do começo ao fim', cat: 'bdsm' },
  { texto: 'amarrei alguém com o que tinha à mão — cinto, gravata, meia', cat: 'bdsm' },
  { texto: 'obedeci cada ordem sem questionar enquanto transava', cat: 'bdsm' },
  { texto: 'fui humilhado/a verbalmente durante sexo e gostei muito', cat: 'bdsm' },
  { texto: 'usei algemas de verdade durante sexo', cat: 'bdsm' },
  { texto: 'combinei uma palavra de segurança e precisei usar', cat: 'bdsm' },
]

export function getEuNunca(cats: Categoria[]): string[] {
  return EU_NUNCA_ITEMS.filter((i) => cats.includes(i.cat)).map((i) => i.texto)
}

// backward compat alias
export const EU_NUNCA: string[] = EU_NUNCA_ITEMS.map((i) => i.texto)

// ===================== ROLETA PRELIMINAR =====================

export interface RoletaTempo {
  label: string;
  segundos: number;
}

// ---- Roleta por fases ----

export interface RoletaFaseContent {
  acoes: string[]
  onde: string[]
}

const ROLETA_FASES_BASE: Record<FaseSexo, RoletaFaseContent> = {
  1: {
    acoes: ['Beije', 'Lamba', 'Morda suavemente', 'Sople devagar', 'Trace com os dedos', 'Aperte', 'Beije com vontade', 'Chupe'],
    onde: ['no pescoço', 'na orelha', 'nos lábios', 'na nuca', 'na coxa interna', 'no ombro', 'nas costas', 'na barriga'],
  },
  2: {
    acoes: ['Faça oral em', 'Use os dedos em', 'Mastürbe', 'Estimule com a língua', 'Chupe', 'Belisque e lamba'],
    onde: ['nos seios', 'no clitóris', 'no pênis', 'na virilha', 'nas nádegas', 'no ventre baixo', 'por dentro'],
  },
  3: {
    acoes: ['Penetre', 'Fique por cima em', 'Fique por trás em', 'Escolha uma posição com', 'Fique de lado com'],
    onde: ['[posição missionário]', '[por cima]', '[por trás]', '[de lado]', '[de pé na parede]', '[beira da cama]'],
  },
  4: {
    acoes: ['Faça oral até gozar em', 'Masturbe até gozar', 'Escolhe onde goza'],
    onde: ['na boca', 'na barriga', 'onde {B} quiser', 'dentro', 'no peito'],
  },
}

export function getRoletaFaseContent(fase: FaseSexo, cats: Categoria[]): RoletaFaseContent {
  const base = { ...ROLETA_FASES_BASE[fase] }
  const acoes = [...base.acoes]
  const onde = [...base.onde]
  if (fase <= 2 && cats.includes('bdsm')) {
    acoes.push('Domine', 'Amarre as mãos de', 'Dê uma palmada em')
    onde.push('onde mandar', 'na bunda')
  }
  return { acoes, onde }
}

// backward compat
export const ROLETA_ACOES: string[] = [...ROLETA_FASES_BASE[1].acoes, ...ROLETA_FASES_BASE[2].acoes];
export const ROLETA_ONDE: string[] = [...ROLETA_FASES_BASE[1].onde, ...ROLETA_FASES_BASE[2].onde];

export const ROLETA_TEMPO: RoletaTempo[] = [
  { label: '30 seg', segundos: 30 },
  { label: '1 min', segundos: 60 },
  { label: '2 min', segundos: 120 },
  { label: '3 min', segundos: 180 },
  { label: '5 min', segundos: 300 },
];

// ===================== FANTASIA =====================

export interface Personagem {
  id: string;
  emoji: string;
  nome: string;
}

export interface Cenario {
  id: string;
  emoji: string;
  nome: string;
  descricao: string;
}

export const PERSONAGENS_A: Personagem[] = [
  { id: 'professor', emoji: '👩‍🏫', nome: 'Professora' },
  { id: 'medica', emoji: '👩‍⚕️', nome: 'Médica' },
  { id: 'policial', emoji: '👮‍♀️', nome: 'Policial' },
  { id: 'chef', emoji: '👩‍🍳', nome: 'Chef Estrelada' },
  { id: 'ceo', emoji: '💼', nome: 'CEO Poderosa' },
  { id: 'artista', emoji: '🎨', nome: 'Artista Famosa' },
  { id: 'exploradora', emoji: '🗺️', nome: 'Exploradora' },
  { id: 'rainha', emoji: '👸', nome: 'Rainha' },
  { id: 'detetive', emoji: '🔍', nome: 'Detetive' },
  { id: 'bailarina', emoji: '🩰', nome: 'Bailarina' },
  { id: 'hacker', emoji: '💻', nome: 'Hacker Misteriosa' },
  { id: 'astronauta', emoji: '👩‍🚀', nome: 'Astronauta' },
  { id: 'atriz', emoji: '🎬', nome: 'Atriz Premiada' },
  { id: 'veterinaria', emoji: '🐾', nome: 'Veterinária' },
  { id: 'vilã', emoji: '😈', nome: 'Vilã Sedutora' },
];

export const PERSONAGENS_B: Personagem[] = [
  { id: 'estudante', emoji: '🎓', nome: 'Estudante Novo' },
  { id: 'paciente', emoji: '🩺', nome: 'Paciente Misterioso' },
  { id: 'suspeito', emoji: '🕵️', nome: 'Suspeito Inocente' },
  { id: 'sous-chef', emoji: '🍽️', nome: 'Sous-Chef Ambicioso' },
  { id: 'estagiario', emoji: '📋', nome: 'Estagiário Dedicado' },
  { id: 'musico', emoji: '🎸', nome: 'Músico Underground' },
  { id: 'viajante', emoji: '🎒', nome: 'Viajante Perdido' },
  { id: 'cavaleiro', emoji: '🛡️', nome: 'Cavaleiro Leal' },
  { id: 'testemunha', emoji: '👁️', nome: 'Testemunha Chave' },
  { id: 'professor-visitante', emoji: '🧑‍🏫', nome: 'Professor Visitante' },
  { id: 'alvo', emoji: '🎯', nome: 'Alvo do Sistema' },
  { id: 'cosmonauita', emoji: '🚀', nome: 'Cosmonauta Rival' },
  { id: 'diretor', emoji: '🎥', nome: 'Diretor Exigente' },
  { id: 'animal-resgatado', emoji: '🐶', nome: 'Dono do Animal' },
  { id: 'heroi', emoji: '🦸', nome: 'Herói Ingênuo' },
];

export const CENARIOS: Cenario[] = [
  { id: 'escritorio', emoji: '🏢', nome: 'Escritório Tarde da Noite', descricao: 'Trabalhando até tarde, apenas vocês dois no andar.' },
  { id: 'hotel', emoji: '🏨', nome: 'Hotel de Luxo', descricao: 'Viagem de negócios, quarto reservado por engano para dois.' },
  { id: 'biblioteca', emoji: '📚', nome: 'Biblioteca Fechada', descricao: 'Presos dentro após o fechamento, apenas a luz da lua.' },
  { id: 'aviao', emoji: '✈️', nome: 'Voo Internacional', descricao: 'Sentados juntos por acaso numa viagem longa de madrugada.' },
  { id: 'spa', emoji: '💆', nome: 'Spa Privativo', descricao: 'Sessão exclusiva reservada, atendimento personalizado.' },
  { id: 'galeria', emoji: '🖼️', nome: 'Galeria de Arte', descricao: 'Vernissage particular, champagne, arte e tensão no ar.' },
  { id: 'ilha', emoji: '🏝️', nome: 'Ilha Deserta', descricao: 'Barco à deriva, ilha paradisíaca, sobrevivência mútua.' },
  { id: 'cobertura', emoji: '🌆', nome: 'Cobertura com Vista', descricao: 'Festa na cobertura, vocês dois isolados na varanda.' },
  { id: 'laboratorio', emoji: '🔬', nome: 'Laboratório Secreto', descricao: 'Pesquisa proibida, horas noturnas, descobertas inesperadas.' },
  { id: 'castelo', emoji: '🏰', nome: 'Castelo Medieval', descricao: 'Reino distante, segredos de corte, paixão proibida.' },
  { id: 'nave', emoji: '🚀', nome: 'Nave Espacial', descricao: 'Missão de anos-luz, últimas almas no universo visível.' },
  { id: 'cabana', emoji: '🏡', nome: 'Cabana na Neve', descricao: 'Tempestade de neve, lareira, sem sinal de celular.' },
  { id: 'teatro', emoji: '🎭', nome: 'Camarins do Teatro', descricao: 'Bastidores após o espetáculo, adrenalina ainda no ar.' },
  { id: 'trem', emoji: '🚂', nome: 'Trem Noturno', descricao: 'Compartimento privativo, trilhos noturnos, horas intermináveis.' },
  { id: 'piscina', emoji: '🏊', nome: 'Piscina Privativa', descricao: 'Piscina no rooftop, fim de festa, vocês dois restantes.' },
];

// ===================== VERDADE OU DESAFIO =====================

export const VERDADES_LEVE: string[] = [
  'Qual a parte do meu corpo você mais gosta?',
  'O que você pensa quando estamos transando e você fecha os olhos?',
  'Qual foi a primeira vez que me achou sexy?',
  'Qual é a coisa mais maluca que você já fez por tesão?',
  'Tem alguma coisa que você gosta que eu faça mas nunca me pediu?',
  'Qual é o lugar da casa onde você mais quer transar mas nunca transamos?',
  'O que eu faço que te deixa mais excitado/a sem nem perceber?',
  'Você já ficou com tesão de mim num momento completamente inapropriado?',
  'Qual é a fantasia que você mais pensa mas nunca falou?',
  'Qual foi a nossa transa favorita até hoje e por quê?',
  'Tem alguma coisa que você nunca pediu mas morre de vontade?',
  'O que você olha primeiro quando entro num quarto?',
  'Qual parte de mim você mais gosta de tocar?',
  'Você já se masturbou pensando em mim? Conta o que imaginou.',
  'Qual é a sua posição favorita e o que te faz gostar dela?',
  'O que você pensou na primeira vez que transamos?',
  'Tem algo que você quer fazer comigo que acha que eu não toparia?',
  'Qual é o elogio mais quente que eu já te fiz?',
  'O que você faz quando quer provocar tesão em mim?',
  'Qual é a coisa mais ousada que você já fez e nunca contou?',
  'Você tem mais prazer quando você domina ou quando eu domino?',
  'O que me faz ser diferente de todo mundo que você já transou?',
  'Qual roupa ou look meu te deixa mais louco/a?',
  'Você pensa em sexo enquanto fazemos coisas do dia a dia? O quê?',
  'O que você gosta que eu faça com a boca que nunca me pediu mais?',
  'Qual é a parte do sexo que você mais antecipa?',
  'Você prefere quando inicio eu ou quando você inicia?',
  'Qual é a coisa que mais te deixa na vontade antes de transarmos?',
  'O que você quer que eu faça diferente da próxima vez?',
  'Qual foi a vez que mais gozou na vida? Me conta o que aconteceu.',
];

export const VERDADES_PICANTE: string[] = [
  'Já chupou alguém e ficou tão gostoso que não quis parar?',
  'Qual é o seu kink que você tem vergonha de admitir?',
  'Você prefere dar ou receber oral? Por quê?',
  'Já transou num lugar onde podia ser pego/a e ficou mais excitado/a por isso?',
  'Qual é o som que você faz quando está no auge do prazer?',
  'Já ficou tão excitado/a que foi agressivo/a sem querer?',
  'O que você faz com a boca que sabe que enlouquece a pessoa?',
  'Qual parte do meu corpo você mais quer lamber?',
  'Já gozou mais rápido do que queria e ficou envergonhado/a?',
  'Qual é a coisa mais suja que você já pediu durante sexo?',
  'Você gosta de falar palavrão durante sexo? O que costuma dizer?',
  'Já ficou tão tesão que transou num lugar ridículo?',
  'Qual é a posição que você mais goza?',
  'O que você pensa quando está me chupando?',
  'Você já gravou ou fotografou algo íntimo?',
  'Qual é a coisa mais ousada que você já pediu na cama?',
  'Já fez sexo oral em alguém logo de manhã sem nem escovar o dente?',
  'O que você quer que eu faça com a língua que nunca pedi diretamente?',
  'Você prefere quando eu te falo coisas sujas no ouvido ou em silêncio?',
  'Já fingiu um orgasmo? Para quem? Por quê?',
  'Qual é a parte do sexo que você sente que faz melhor do que qualquer um?',
  'O que deixa você mais molhado/a ou mais duro/a em segundos?',
  'Já fez sexo num banheiro de festa ou restaurante?',
  'Você pensa em sexo quando vê alguma coisa específica do cotidiano?',
  'Qual é o momento que você mais se lembra de ter gozado gostoso?',
  'Já se masturbou logo antes de me ver para chegar mais calmo/a?',
  'O que eu já fiz que você queria que eu repetisse toda vez?',
  'Qual é a fantasia que você tem vergonha de me contar ainda?',
  'Você gosta quando eu puxo seu cabelo? O que mais gosta que eu faça com força?',
  'Qual é a coisa que mais te deixa na vontade mas você aguenta sem pedir?',
];

export const VERDADES_HOT: string[] = [
  'Quero que você descreva em detalhes o que vai fazer comigo essa noite.',
  'Me conta a sua fantasia mais suja — não omite nada.',
  'O que você quer que eu faça com a boca em você agora?',
  'Onde você quer que eu goe?',
  'Me fala o que você grita quando goza.',
  'Qual é o lugar do meu corpo que você mais quer enfiar a língua?',
  'O que você faria se eu dissesse que você pode fazer qualquer coisa comigo agora?',
  'Você prefere me ver gozando ou me sentir gozando?',
  'Qual é a coisa mais obscena que você já disse durante sexo?',
  'Você gosta quando eu fico submisso/a ou prefere que eu te domine?',
  'Me conta a vez que você mais se arrependeu de não ter transado com alguém.',
  'O que você quer que eu use ou vista para te deixar completamente louco/a?',
  'Descreve como você quer que essa noite termine.',
  'Qual é o seu ponto G secreto que poucos encontraram?',
  'O que você quer ouvir enquanto eu estou dentro de você / você está dentro de mim?',
  'Me conta uma fantasia envolvendo lugar da nossa casa que ainda não realizamos.',
  'O que você faria se eu chegasse agora e ficasse completamente nu/a sem falar nada?',
  'Qual é o rolê mais safado que você quer fazer comigo antes do ano acabar?',
  'Você prefere sexo rápido e intenso ou lento e torturante?',
  'Me fala o que passa na sua cabeça quando está prestes a gozar.',
  'Qual é o barulho que eu faço que mais te excita?',
  'O que você gosta que eu faça com a mão enquanto estamos transando?',
  'Me conta a cena mais quente que já imaginou com a gente dois.',
  'O que você quer provar de mim que ainda não provou?',
  'Você quer que eu seja mais agressivo/a? O que quer que eu faça diferente?',
  'Qual é o fetiche que você nunca admitiu mas gostaria de experimentar comigo?',
  'O que você mais gosta que eu diga no seu ouvido no momento certo?',
  'Me conta o que você pensa quando está me vendo tirar a roupa.',
  'O que você quer fazer comigo que nunca teve coragem de propor?',
  'Me fala o que faz você perder completamente o controle.',
];

export const DESAFIOS_LEVE: string[] = [
  'Beija a pessoa à sua esquerda no pescoço por 10 segundos.',
  'Morde o lábio inferior do parceiro e fica assim por 5 segundos.',
  'Sussurra no ouvido do parceiro o que você quer fazer com ele/ela mais tarde.',
  'Faz uma massagem no couro cabeludo do parceiro por 1 minuto.',
  'Passa o dedo devagar no pescoço e orelha do parceiro por 30 segundos.',
  'Olha nos olhos do parceiro por 1 minuto inteiro sem desviar.',
  'Dança colado/a no parceiro por uma música inteira.',
  'Elogia cada parte do corpo do parceiro um por um, sem pressa.',
  'Beija a nuca do parceiro três vezes bem devagar.',
  'Pede permissão para fazer uma coisa que nunca fez com ele/ela.',
  'Conta ao parceiro o que te deixa mais excitado/a nele/nela.',
  'Faz o parceiro rir sem falar nada — só com o corpo.',
  'Descreve com voz baixa e calma o que vai fazer depois do jogo.',
  'Passa a mão devagar pelos braços do parceiro de cima para baixo, 2 minutos.',
  'Fica por trás do parceiro e abraça por 1 minuto sem falar nada.',
  'Beija a parte do corpo do parceiro que você mais gosta.',
  'Conta uma coisa que você pensa sobre o parceiro mas nunca disse.',
  'Faz o parceiro arrepiar sem encostar nos pontos óbvios.',
  'Segura o rosto do parceiro e fica olhando por 30 segundos.',
  'Escreve algo com o dedo nas costas do parceiro sem ele/ela ver.',
];

export const DESAFIOS_PICANTE: string[] = [
  'Faz sexo oral no parceiro por 2 minutos — sem parar no meio.',
  'Tira uma peça de roupa do parceiro usando só os dentes.',
  'Faz uma massagem nos seios ou no peito do parceiro por 2 minutos.',
  'Passa a língua devagar no pescoço do parceiro de baixo para cima.',
  'Coloca a mão nas partes íntimas do parceiro por 1 minuto.',
  'Beija o parceiro com língua por 2 minutos sem deixar o beijo morrer.',
  'Faz o parceiro gemer usando só as mãos, sem tirar a roupa.',
  'Venda os olhos do parceiro e toca em 5 lugares diferentes com a língua.',
  'Fica nu/a na frente do parceiro por 1 minuto sem fazer mais nada.',
  'Mastúrba o parceiro enquanto ele/ela faz outra coisa.',
  'Morde as nádegas do parceiro, suave e depois mais forte.',
  'Faz o parceiro arrepiar chupando cada dedo da mão.',
  'Desce com a língua da barriga até a virilha bem devagar.',
  'Faz uma lap dance completa para o parceiro até ele/ela pedir para parar.',
  'Faz o parceiro tirar sua própria roupa enquanto você fica parado/a olhando.',
  'Dá uma palmada na bunda do parceiro e beija logo em seguida.',
  'Faz o parceiro ficar duro/molhado/a usando só palavras — sem tocar.',
  'Chupa o pescoço do parceiro até deixar uma marquinha.',
  'Pede ao parceiro para se masturbar enquanto você assiste.',
  'Senta no colo do parceiro e faz movimentos como se estivesse transando, sem penetração.',
];

export const DESAFIOS_HOT: string[] = [
  'Faz sexo oral no parceiro até ele/ela gozar — sem parar.',
  'Dá permissão pro parceiro te usar como ele/ela quiser por 5 minutos.',
  'Faz o parceiro gozar usando só a mão, olhando nos olhos.',
  'Transa com o parceiro por 5 minutos e para quando o timer acabar — mesmo que esteja no meio.',
  'Coloca o parceiro de costas, desce com a língua da nuca até as nádegas devagar.',
  'Faz o parceiro descrever em voz alta o que sente enquanto você toca nele/ela.',
  'Se masturba na frente do parceiro até gozar.',
  'Faz sexo com o parceiro numa posição que nunca tentaram.',
  'Pede ao parceiro para te amarrar e te usar por 3 minutos.',
  'Faz o parceiro implorar por mais antes de dar o que ele/ela quer.',
  'Faz barulho — geme muito alto durante 1 minuto inteiro.',
  'Escolhe uma parte do corpo do parceiro e fica nela por 3 minutos só com a língua.',
  'Dá uma palmada forte e depois beija o lugar que bateu.',
  'Faz o parceiro ficar na posição de quatro e te dá liberdade total.',
  'Conta em voz alta a fantasia mais suja que você já teve com o parceiro.',
  'Propõe algo que nunca fizeram e faz agora se o parceiro topar.',
  'Tira toda a roupa do parceiro só com os dentes.',
  'Faz o parceiro sentar no seu rosto.',
  'Penetra o parceiro e para completamente. Não mexe até o parceiro implorar.',
  'Define a próxima posição que vocês vão transar e demonstra como quer.',
];

// ===================== MISSÃO SECRETA =====================

export const MISSOES: string[] = [
  'Antes da revelação, toca a coxa do alvo pelo menos uma vez.',
  'Faz o alvo te dar um beijo no pescoço antes da revelação.',
  'Consegue que o alvo fique sozinho com você num cômodo.',
  'Sussurra algo picante no ouvido do alvo sem que os outros ouçam.',
  'Faz o alvo corar ou gaguejou sem tocar nele/ela.',
  'Faz o alvo te contar algo íntimo que ele/ela não contaria para qualquer um.',
  'Faz o alvo te olhar com tesão antes da revelação.',
  'Convence o alvo a te dar uma massagem no ombro ou pescoço.',
  'Faz o alvo ficar com vergonha boa ao responder uma pergunta sua.',
  'Faz o alvo rir enquanto você estava mentalmente pensando em algo sexual.',
  'Encoste suas pernas nas pernas do alvo e mantenha sem que perceba.',
  'Provoca o alvo sexualmente usando só palavras e olhares.',
  'Faz o alvo te chamar pelo nome várias vezes.',
  'Consegue um toque físico do alvo em você — em qualquer parte.',
  'Faz o alvo pensar que você está interessado/a nele/ela de verdade.',
  'Cria um código secreto com o alvo que os outros não entendam.',
  'Faz o alvo te convidar para ficar ao lado dele/dela.',
  'Descobre qual é a fantasia do alvo sem parecer que é missão.',
  'Faz o alvo admitir que te acha atraente.',
  'Consegue um beijo no rosto do alvo antes do jogo acabar.',
  'Faz o alvo pensar em você enquanto está conversando com outra pessoa.',
  'Descobre o que mais excita o alvo de forma casual.',
  'Faz o alvo te olhar nos olhos por mais de 5 segundos seguidos.',
  'Provoca ciúme no alvo de forma sutil.',
  'Faz o alvo pedir para ficar mais perto de você.',
  'Consegue que o alvo te toque no braço ou ombro naturalmente.',
  'Faz o alvo revelar algo sobre a vida íntima dele/dela.',
  'Deixa o alvo com vontade de saber mais sobre você.',
  'Faz o alvo rir da sua piada íntima que só vocês dois entenderiam.',
  'Termina a noite com o alvo te querendo mais do que no começo.',
];

// ===================== INTIMIDADE =====================

export const INTIMIDADE_CONHECER: string[] = [
  'Qual foi o momento da sua vida em que você mais se sentiu verdadeiramente feliz?',
  'O que você mais admira em mim que nunca me disse diretamente?',
  'Se você pudesse mudar algo no jeito que nos conhecemos, o que seria?',
  'Qual é a memória da nossa relação que você mais adora?',
  'Qual foi o maior sacrifício que você fez por amor?',
  'O que te faz acordar animado pela manhã?',
  'Qual é o seu maior sonho que ainda não contou para quase ninguém?',
  'O que você aprendeu sobre si mesmo nessa relação?',
  'Qual é a coisa que mais te assusta no futuro?',
  'Se você soubesse que fosse morrer em um mês, o que faria diferente?',
  'Qual é o momento em que você se sentiu mais amado por mim?',
  'O que você gostaria que eu entendesse melhor sobre você?',
  'Qual é a decisão que mais se arrepende de ter tomado?',
  'O que você precisava ouvir mais quando era criança?',
  'Qual é a coisa mais importante que seus pais te ensinaram?',
  'Se pudesse ter uma conversa com seu eu do passado, o que diria?',
  'Qual foi o momento em que você mais precisou de mim?',
  'O que você faz quando está mal que eu ainda não percebo?',
  'Qual é o seu maior orgulho pessoal?',
  'O que você mais sente saudade da sua infância?',
  'Qual é a pessoa que mais influenciou quem você é hoje?',
  'O que você acha que nos faz funcionar bem juntos?',
  'Qual é o desafio que mais te moldou como pessoa?',
  'Se nossa relação fosse um filme, como você chamaria?',
  'O que você quer que as pessoas digam de você quando não está presente?',
];

export const INTIMIDADE_DESEJOS: string[] = [
  'Qual é o desejo mais íntimo que você ainda não me contou?',
  'O que você gostaria que eu fizesse mais frequentemente?',
  'Qual é a coisa que você mais deseja que eu te surpreenda?',
  'Que tipo de toque te faz sentir mais amado?',
  'O que você precisaria para se sentir mais desejado por mim?',
  'Qual é a fantasia que você ainda não teve coragem de me contar?',
  'O que você adoraria que nos tornássemos melhores juntos?',
  'Qual é o momento íntimo que você mais quer repetir?',
  'O que você gostaria que eu soubesse sobre como te amar melhor?',
  'Qual é o lugar onde você mais deseja que façamos algo especial?',
  'O que você quer que eu saiba sobre o que te faz feliz na cama?',
  'Qual é a coisa que você deseja que eu peça para você?',
  'O que você quer que eu explore mais em você?',
  'Qual é o seu pedido secreto que você está esperando fazer?',
  'O que te faz sentir mais seguro para ser vulnerável comigo?',
  'Qual é o gesto pequeno meu que mais significa para você?',
  'O que você quer que eu continue fazendo para sempre?',
  'Qual é a necessidade que você sente que ainda não verbalizou?',
  'O que você mais deseja que nossa relação se torne?',
  'Qual é a coisa que você nunca se permitiu pedir mas precisa?',
  'O que você precisaria para se sentir ainda mais próximo de mim?',
  'Qual é o sonho que você quer que realizemos juntos?',
  'O que você deseja sentir mais vezes ao meu lado?',
  'Qual é a coisa que você quer dizer sim para mas ainda não disse?',
  'O que você mais deseja que o futuro traga para nós dois?',
];

export const INTIMIDADE_FANTASIA: string[] = [
  'Se pudéssemos viver uma fantasia esta semana, qual seria?',
  'Qual é o cenário de roleplay que mais te atrai?',
  'Qual é a fantasia que você tinha há anos e nunca realizou?',
  'Se não houvesse julgamentos, o que você proporia para nós dois?',
  'Qual é o lugar mais ousado onde você fantasiou que ficássemos?',
  'O que você sempre quis que eu usasse numa noite especial?',
  'Qual é a cena de filme que você gostaria de recriar conosco?',
  'Se tivéssemos uma noite em hotel de luxo sem regras, o que proporia?',
  'Qual é a fantasia que você mais se arrepende de não ter realizado?',
  'O que você exploraria em mim se soubesse que eu estaria aberto?',
  'Qual é o papel que você gostaria de interpretar comigo?',
  'Se pudesse me surpreender de qualquer forma, o que faria?',
  'Qual é o horário ou momento do dia que mais te excita?',
  'O que você gostaria de tentar uma vez só para ver?',
  'Qual é a música que você gostaria que tocasse numa noite especial?',
  'Se criássemos um ritual íntimo só nosso, qual seria?',
  'Qual é a fantasia que envolve um lugar específico da nossa casa?',
  'O que você imagina quando pensa na noite mais perfeita conosco?',
  'Qual é a coisa mais ousada que você proporia se eu te dessem total liberdade?',
  'Se pudéssemos congelar um momento íntimo para sempre, qual seria?',
  'Qual é o jogo íntimo que você gostaria que inventássemos juntos?',
  'O que você gostaria de descobrir sobre mim que ainda não sabe?',
  'Qual é a fantasia que você achou que nunca aconteceria mas poderia?',
  'Se eu dissesse sim para qualquer coisa esta noite, o que pediria?',
  'Qual é a coisa que mais te excita imaginar que faríamos juntos?',
];

// ===================== DADO — CONTEÚDO EXTRA =====================

export const DADO_FACES_PENETRACAO: DadoFace[] = [
  { id: 'transa', emoji: '🌋', nome: 'Transa Agora', cor: '#f0197d', descricao: '{A} e {B}: para de jogar e vai transar. Escolhe a posição na hora e só volta quando acabar.' },
  { id: 'nova-posicao', emoji: '🔥', nome: 'Posição Nova', cor: '#ff6b6b', descricao: '{A} e {B}: escolhem uma posição que nunca tentaram e testam agora, sem desculpa.' },
  { id: 'ponto-g', emoji: '⭐', nome: 'Ponto G', cor: '#8b5cf6', descricao: '{A}, estimula o ponto G ou próstata {daB} por 5 minutos. Foco total, sem pressa.' },
  { id: 'quickie', emoji: '⚡', nome: 'Quickie', cor: '#f0197d', descricao: '{A} e {B}: 5 minutos de sexo intenso agora — sem aquecimento, sem enrolação.' },
];

export const DADO_FACES_BDSM: DadoFace[] = [
  { id: 'dominacao', emoji: '⛓️', nome: 'Dominação Total', cor: '#7c3aed', descricao: '{A}, você manda {emB} por 5 minutos. {B} obedece qualquer ordem sem questionar.' },
  { id: 'vendado', emoji: '🙈', nome: 'Vendado/a', cor: '#4c1d95', descricao: '{A}, venda os olhos {daB} e faz o que quiser. {B} não pode se mexer.' },
  { id: 'palmada', emoji: '👋', nome: 'Palmada', cor: '#8b5cf6', descricao: '{A}, dá uma palmada bem dada na bunda {daB} e beija logo em seguida.' },
];

export function getDadoFaces(cats: Categoria[]): DadoFace[] {
  let faces = [...DADO_FACES]
  if (cats.includes('penetracao')) faces = faces.concat(DADO_FACES_PENETRACAO)
  if (cats.includes('bdsm')) faces = faces.concat(DADO_FACES_BDSM)
  return faces
}

// ===================== ROLETA — CONTEÚDO EXTRA =====================

export const ROLETA_ACOES_EXTRA: string[] = [
  'Faça oral em',
  'Use os dedos em',
  'Mastürbe',
  'Estimule com a língua',
]

export const ROLETA_ACOES_BDSM: string[] = [
  'Domine completamente',
  'Amarre as mãos de',
  'Dê uma palmada em',
  'Dê uma ordem para',
]

export const ROLETA_ONDE_PRELIM: string[] = [
  'nos seios',
  'na virilha',
  'nas nádegas',
  'no clitóris / pênis',
  'no ventre baixo',
]

export const ROLETA_ONDE_BDSM: string[] = [
  'onde mandar',
  'na bunda',
  'onde for proibido',
]

export function getRoletaAcoes(cats: Categoria[]): string[] {
  let list = [...ROLETA_ACOES]
  if (cats.includes('penetracao')) list = list.concat(ROLETA_ACOES_EXTRA)
  if (cats.includes('bdsm')) list = list.concat(ROLETA_ACOES_BDSM)
  return list
}

export function getRoletaOnde(cats: Categoria[]): string[] {
  let list = [...ROLETA_ONDE]
  if (cats.includes('preliminares') || cats.includes('penetracao')) list = list.concat(ROLETA_ONDE_PRELIM)
  if (cats.includes('bdsm')) list = list.concat(ROLETA_ONDE_BDSM)
  return list
}

// ===================== FANTASIA — PERSONAGENS GENDERED =====================

export const PERSONAGENS_F: Personagem[] = [
  { id: 'professora', emoji: '👩‍🏫', nome: 'Professora' },
  { id: 'medica', emoji: '👩‍⚕️', nome: 'Médica' },
  { id: 'policial-f', emoji: '👮‍♀️', nome: 'Policial' },
  { id: 'chef-f', emoji: '👩‍🍳', nome: 'Chef Estrelada' },
  { id: 'ceo-f', emoji: '💼', nome: 'CEO Poderosa' },
  { id: 'artista-f', emoji: '🎨', nome: 'Artista Famosa' },
  { id: 'exploradora', emoji: '🗺️', nome: 'Exploradora' },
  { id: 'rainha', emoji: '👸', nome: 'Rainha' },
  { id: 'detetive-f', emoji: '🔍', nome: 'Detetive' },
  { id: 'bailarina', emoji: '🩰', nome: 'Bailarina' },
  { id: 'hacker-f', emoji: '💻', nome: 'Hacker Misteriosa' },
  { id: 'vilã', emoji: '😈', nome: 'Vilã Sedutora' },
  { id: 'astronauta-f', emoji: '👩‍🚀', nome: 'Astronauta' },
  { id: 'secretaria', emoji: '📋', nome: 'Secretária Discreta' },
  { id: 'massagista-f', emoji: '💆‍♀️', nome: 'Massagista Especialista' },
]

export const PERSONAGENS_M: Personagem[] = [
  { id: 'estudante', emoji: '🎓', nome: 'Estudante' },
  { id: 'medico', emoji: '🩺', nome: 'Médico' },
  { id: 'detetive-m', emoji: '🕵️', nome: 'Detetive' },
  { id: 'chef-m', emoji: '🍽️', nome: 'Chef Renomado' },
  { id: 'ceo-m', emoji: '👔', nome: 'CEO Dominante' },
  { id: 'musico', emoji: '🎸', nome: 'Músico Famoso' },
  { id: 'viajante', emoji: '🎒', nome: 'Viajante Misterioso' },
  { id: 'cavaleiro', emoji: '🛡️', nome: 'Cavaleiro' },
  { id: 'policial-m', emoji: '👮‍♂️', nome: 'Policial' },
  { id: 'professor-m', emoji: '🧑‍🏫', nome: 'Professor Particular' },
  { id: 'segurança', emoji: '🦺', nome: 'Segurança Pessoal' },
  { id: 'heroi', emoji: '🦸‍♂️', nome: 'Herói Ingênuo' },
  { id: 'massagista-m', emoji: '💆‍♂️', nome: 'Massagista Especialista' },
  { id: 'diretor', emoji: '🎥', nome: 'Diretor Exigente' },
  { id: 'mecanico', emoji: '🔧', nome: 'Mecânico Tatuado' },
]

export function getPersonagens(pairType: PairType): { A: Personagem[]; B: Personagem[] } {
  if (pairType === 'MM') return { A: PERSONAGENS_M, B: PERSONAGENS_M }
  if (pairType === 'FF') return { A: PERSONAGENS_F, B: PERSONAGENS_F }
  return { A: PERSONAGENS_F, B: PERSONAGENS_M }
}

// ===================== MISSÃO SECRETA — MISSÕES EXTRAS =====================

export interface MissaoItem {
  texto: string
  cat: Categoria
}

export const MISSOES_EXTRAS: MissaoItem[] = [
  // penetracao
  { texto: 'Convença o alvo a ir para um cômodo separado com você por pelo menos 3 minutos.', cat: 'penetracao' },
  { texto: 'Sussurre algo explícito no ouvido do alvo sem que os outros ouçam.', cat: 'penetracao' },
  { texto: 'Toque a coxa interna do alvo por 5 segundos durante uma conversa.', cat: 'penetracao' },
  { texto: 'Faça o alvo ficar animado/a usando só palavras e olhares — sem toque nenhum.', cat: 'penetracao' },
  { texto: 'Proponha ao alvo algo que ambos queiram fazer mais tarde esta noite.', cat: 'penetracao' },
  { texto: 'Dê um beijo no pescoço do alvo num momento mais privado.', cat: 'penetracao' },
  { texto: 'Faça o alvo perceber que você está provocando-o/a de propósito.', cat: 'penetracao' },
  // bdsm
  { texto: 'Dê uma ordem ao alvo e descubra se ele/ela obedece sem questionar.', cat: 'bdsm' },
  { texto: 'Faça o alvo pedir licença para sair da sala onde você está.', cat: 'bdsm' },
  { texto: 'Estabeleça um jogo de poder silencioso com o alvo sem que os outros percebam.', cat: 'bdsm' },
  { texto: 'Faça o alvo te obedecer em algo pequeno sem revelar que é uma missão.', cat: 'bdsm' },
]

export function getMissoes(cats: Categoria[]): string[] {
  const extras = MISSOES_EXTRAS.filter((m) => cats.includes(m.cat)).map((m) => m.texto)
  return [...MISSOES, ...extras]
}
