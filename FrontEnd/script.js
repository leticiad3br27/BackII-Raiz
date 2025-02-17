document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    const dados = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    fetch('https://sua-api.com/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem').innerText = 'Cadastro realizado com sucesso!';
        // Limpa o formulário após o envio
        document.getElementById('formCadastro').reset();
    })
    .catch(error => {
        document.getElementById('mensagem').innerText = 'Erro ao cadastrar: ' + error.message;
    });
});