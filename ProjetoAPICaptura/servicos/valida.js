// Função para validar os dados de entrada
export function validarUsuario(nome, email, telefone) {
    // Verifica se o nome tem pelo menos 2 caracteres
    if (!nome || nome.length < 2) return 'Nome deve ter pelo menos 2 caracteres.';

    // Verifica se o e-mail está em um formato válido
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido.';

    // Verifica se o telefone segue o formato esperado (XX) XXXXX-XXXX
    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) return 'Telefone inválido. Formato esperado: (XX) XXXXX-XXXX';

    // Retorna null se os dados forem válidos
    return null;
}
