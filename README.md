# Home Tasker Planner 🏙

Bem-vindo à aplicação de gerenciamento de condomínio baseada em Angular! Esta aplicação permite que moradores tenham controle sobre suas contas, reservem áreas comuns, recebam avisos do condomínio, realizem login e cadastro, registrem ocorrências, cadastrem visitantes e registrem a hora de saída deles.

## View da Tela Principal

![image](https://github.com/olirrvt/HomeTaskPlanner/assets/100844800/e17dd771-05c2-4f1a-987e-8d842cfaea20)

## Instalação

1. Certifique-se de ter o Node.js instalado em sua máquina. Caso não tenha, faça o download em https://nodejs.org/ e siga as instruções de instalação.

2. Clone este repositório em sua máquina local:

```
git clone https://github.com/olirrvt/HomeTaskPlanner.git

```

3. Navegue para o diretório da aplicação:
   
```
cd hometaskplanner
```

4. Instale as dependências necessárias:

```
npm install
```

## Configuração

1. Antes de executar a aplicação, é necessário configurar o backend. Certifique-se de ter o servidor e o banco de dados configurados corretamente.
Você tem que ter a API dele que eu mesmo desenvolvi. (https://github.com/olirrvt/HomeTaskAPI)


## Executando a aplicação

1. Após a configuração, inicie a aplicação:

```
ng serve
```

2. Acesse a aplicação no seu navegador, digitando o seguinte endereço na barra de URL:

```
http://localhost:4200/
```

## Funcionalidades da Aplicação

### Login e Cadastro

- Na página inicial, os usuários podem fazer login com suas credenciais ou criar uma nova conta se ainda não tiverem uma.
- As informações de login e cadastro são validadas antes do envio ao servidor.
- Tecnologia usadas para o Login: JWT.

### Gerenciamento de Contas

- Os moradores têm acesso a informações das suas contas do condomínio, não é possível realizar o pagamento, apenas uma notificação.

### Reserva de Áreas Comuns

- Os moradores podem visualizar as áreas comuns disponíveis para reserva, bem como a disponibilidade de cada uma.
- A reserva é feita selecionando a data e o horário desejados e, em seguida, confirmando a reserva.

### Avisos do Condomínio

- Os moradores recebem avisos e notificações importantes do condomínio na página de avisos.
- Novos avisos são exibidos para os moradores assim que forem publicados pelo administrador.

### Registro de Ocorrências

- Os moradores podem registrar ocorrências ou problemas no condomínio através de um formulário.
- As ocorrências são enviadas ao administrador para análise e resolução.

### Cadastro de Visitantes

- Os moradores têm a opção de cadastrar visitantes e informar a duração da visita.
- O registro de saída do visitante também é registrado na aplicação.

## Contribuição

Se você deseja contribuir para a melhoria desta aplicação, sinta-se à vontade para abrir um pull request ou reportar problemas através das issues.

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo

 LICENSE para obter mais detalhes.

---

Esperamos que esta aplicação de gerenciamento de condomínio baseada em Angular atenda às suas necessidades. Se tiver alguma dúvida ou sugestão, não hesite em entrar em contato. Aproveite o uso da aplicação!
