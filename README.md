# JobConvo - Teste

## Tecnologias Utilizadas

- **Python**: 3.10.12
- **Node.js**: v20.5.0
- **Frontend**: React.js
- **Backend**: Django Rest Framework

## Descrição do Projeto

JobConvo é uma aplicação desenvolvida para conectar empresas e candidatos, facilitando o processo de recrutamento e seleção. A aplicação permite que empresas publiquem vagas e candidatos se inscrevam nessas vagas, fornecendo uma plataforma intuitiva para ambos os lados.

## Instruções de Configuração

### Clonando o Repositório

Primeiro, clone o projeto a partir da URL do GitHub:

```bash
$ git clone https://github.com/BielBatemarque/JobConvo-senior.git
```

### Configurando o Frontend

1. Navegue até o diretório do frontend:

    ```bash
    $ cd frontend
    ```

2. Instale as dependências do projeto:

    ```bash
    $ npm install
    ```

3. Após a instalação das dependências, inicie o servidor de desenvolvimento:

    ```bash
    $ npm start
    ```

4. O frontend estará disponível em: [http://localhost:3000](http://localhost:3000)

### Configurando o Backend

1. Navegue até o diretório do backend:

    ```bash
    $ cd backend
    ```

2. (Opcional) Crie um ambiente virtual e ative-o:

    ```bash
    $ python3 -m venv venv
    $ source venv/bin/activate
    ```

3. Instale as dependências do backend:

    ```bash
    $ pip install -r requirements.txt
    ```

4. Após a instalação das dependências, inicie o servidor do Django:

    ```bash
    $ python3 manage.py runserver
    ```

5. O backend estará disponível em: [http://localhost:8000](http://localhost:8000)

## Opções de Usuários

### Usuário Empresa
- **Username**: senior
- **Senha**: 123

### Usuário Candidato
- **Username**: gabriel
- **Senha**: 123

## Testes

Foi aplicado TDD (Test-Driven Development) para alguns casos no backend, garantindo que a lógica e as funcionalidades do projeto atendam às especificações.

---
