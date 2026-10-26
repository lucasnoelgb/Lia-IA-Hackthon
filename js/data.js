/* Dados: logo, objetivos (GOALS), focos (FOCI) e estado inicial (S0) */
const LOGO='assets/logo.webp';
const GOALS={
 whatsapp:{i:'chat',t:'Ler mensagens no WhatsApp',m:'ler as mensagens dos seus netos',w:[['FOTO',['FO','TO'],'📷'],['NETO',['NE','TO'],'👶'],['BEIJO',['BEI','JO'],'😘'],['ÁUDIO',['ÁU','DIO'],'🎙️'],['MENSAGEM',['MEN','SA','GEM'],'💬']]},
 onibus:{i:'bus',t:'Ler placas de ônibus',m:'pegar o ônibus sem pedir ajuda',w:[['RUA',['RU','A'],'🛣️'],['PONTO',['PON','TO'],'🚏'],['LINHA',['LI','NHA'],'🚌'],['VOLTA',['VOL','TA'],'🔄'],['CENTRO',['CEN','TRO'],'🏙️']]},
 assinar:{i:'pen',t:'Assinar o meu nome',m:'assinar o seu próprio nome',w:[['NOME',['NO','ME'],'✍️'],['LETRA',['LE','TRA'],'🔤'],['CANETA',['CA','NE','TA'],'🖊️'],['DOCUMENTO',['DO','CU','MEN','TO'],'📄'],['ASSINATURA',['AS','SI','NA','TU','RA'],'📝']]},
 biblia:{i:'learn',t:'Ler a Bíblia',m:'ler a Bíblia com os seus próprios olhos',w:[['VIDA',['VI','DA'],'🌱'],['AMOR',['A','MOR'],'❤️'],['LIVRO',['LI','VRO'],'📖'],['GRAÇA',['GRA','ÇA'],'🙏'],['ESPERANÇA',['ES','PE','RAN','ÇA'],'🌅']]},
 receitas:{i:'food',t:'Escrever minhas receitas',m:'escrever as suas receitas de família',w:[['OVO',['O','VO'],'🥚'],['BOLO',['BO','LO'],'🎂'],['FARINHA',['FA','RI','NHA'],'🌾'],['RECEITA',['RE','CEI','TA'],'📒'],['TEMPERO',['TEM','PE','RO'],'🧂']]},
 outros:{i:'dots',t:'Outro objetivo',m:'aprender no seu ritmo',w:[['CASA',['CA','SA'],'🏠'],['MESA',['ME','SA'],'🍽️'],['AMIGO',['A','MI','GO'],'🤝'],['FAMÍLIA',['FA','MÍ','LIA'],'👨‍👩‍👧'],['TRABALHO',['TRA','BA','LHO'],'🧰']]}
};
const FOCI={reading:['eye','Ler'],writing:['pen','Escrever'],speaking:['mic','Falar e entender']};
const S0={nameDone:false,nick:'',av:0,key:'',goal:'',custom:'',focus:'',mastered:[],wins:0,hist:[]};
