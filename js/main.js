/* Inicialização do app */
if(S.goal&&S.focus&&!S.key){S.key=genKey();save()}
S.goal&&S.focus?go(home,0):welcome();
