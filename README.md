# workshop-20032021


Esta versão já está com a rota protegida funcionando através do JWT
Para testar, basta chamar a rota de put ou de delete sem alterar a forma como fazemos agora.
Você verá que ela dará um erro, dizendo que não há autenticação.

Para usar a rota, no POSTMAN, abra a opção Headers e informe os seguintes parâmetros:
key: x-access-token
value: token que recebeu no momento do login

chame novamente e verá que a rota funciona perfeitamente.