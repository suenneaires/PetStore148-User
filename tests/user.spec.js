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
        // Consultar o usuário pelo username - GET
        const response = await request.get(`user/${user.username}`)

        // Verificar se a consulta retornou status 200
        expect(response.status()).toBe(200)
        const responseJson = await response.json()
        expect(responseJson.id).toBe(user.id)
        expect(responseJson.username).toBe(user.username)
        expect(responseJson.email).toBe(user.email)

    }) // Fecha o GET - Consultar


        // Alteração do campo EMAIL - PUT
    test('Alterar Usuário', async ({ request }) => {
        // Copiar os dados e alterar apenas o email
        const userAtualizado = {
            ...user,
            email: 'suenne.novo@teste.com'
        }

        // Enviar os dados atualizados pelo PUT
        const response = await request.put(`user/${user.username}`, {
            data: userAtualizado
        })

        // Verificar se a alteração retornou status 200
        expect(response.status()).toBe(200)

        // Verificar se message é igual ao ID enviado
        expect((await response.json()).message).toBe(String(user.id))

        // Consultar o usuário após a alteração
        const consulta = await request.get(`user/${user.username}`)

        // Verificar se a consulta retornou status 200
        expect(consulta.status()).toBe(200)

        // Ler os dados retornados pela consulta
        const usuarioConsultado = await consulta.json()

        // Verificar se o email atualizado foi salvo
        expect(usuarioConsultado.email).toBe(userAtualizado.email)

    }) // Fecha o PUT - Alterar

}); // Fecha o grupo de testes

