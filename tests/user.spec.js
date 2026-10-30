// Bibliotecas e Frameworks
import { expect, test } from '@playwright/test'

// Post - Incluir Usuário
// Get - Consultar Usuário
// Put - Alterar o Usuário
// Delete - Excluir Usuário

import user from '../data/json/user.json'

// testes executados de forma sequencial
test.describe.serial('Testes Positivos', async () => {

    // Os dados/informações para o teste (vem do user.json)
    test('Incluir Usuário', async ({ request }) => {
        const response = await request.post('user', {
            data: user
        }) // Final da ação de Post

        // Verificar se a resposta tem status 200
        expect(response.status()).toBe(200)

        // Verificar se message contém o ID do usuário enviado
        expect((await response.json()).message).toBe(String(user.id))

    }) // Fecha o Post - Incluir

    test('Consultar Usuário', async ({ request }) => {
        // Consultar o usuário pelo username
        const response = await request.get(`user/${user.username}`)

        // Verificar se a consulta retornou status 200
        expect(response.status()).toBe(200)

        const responseJson = await response.json()

        expect(responseJson.username).toBe(user.username)

        expect(responseJson.email).toBe(user.email)

    }) // Fecha o GET - Consultar

}); // Fecha o grupo de testes