# Data Model: Página "Meus Contatos" (`contatos.astro`)

**Branch**: `07-contatos` | **Date**: 2026-11-11 | **Spec**: [spec.md](./spec.md)

## 1. Contact Entity Structure

Cada canal de contato exibido na grade `.contact-grid` é estruturado com os seguintes atributos:

| Campo | Tipo | Descrição | Exemplo |
|---|---|---|---|
| `id` | String | Identificador único do canal | `telefone`, `email`, `linkedin`, `github` |
| `label` | String | Rótulo descritivo (maiúsculas) | `TELEFONE / WHATSAPP`, `E-MAIL`, `LINKEDIN`, `GITHUB` |
| `value` | String | Valor exibido em destaque (*Barlow Condensed*) | `(11) 98368-0639`, `https://www.linkedin.com/in/...` |
| `detail` | String (Opcional) | Subtítulo ou instrução adicional | `Conecte-se comigo profissionalmente` |
| `href` | String | URL de direcionamento / protocolo de ação | `tel:+5511983680639`, `https://www.linkedin.com/in/...` |
| `icon` | String | Nome ou path do ícone SVG representativo | `phone.svg`, `mail.svg`, `linkedin.svg`, `github.svg` |

## 2. Records Definition (FR-007)

1. **Telefone / WhatsApp**:
   - `id`: `telefone`
   - `label`: `TELEFONE / WHATSAPP`
   - `value`: `(11) 98368-0639`
   - `detail`: `""`
   - `href`: `tel:+5511983680639`
2. **E-mail**:
   - `id`: `email`
   - `label`: `E-MAIL`
   - `value`: `Sergio.rib@live.com`
   - `detail`: `""`
   - `href`: `mailto:Sergio.rib@live.com`
3. **LinkedIn**:
   - `id`: `linkedin`
   - `label`: `LINKEDIN`
   - `value`: `https://www.linkedin.com/in/sergio-ribeiro-cerqueira`
   - `detail`: `Conecte-se comigo profissionalmente`
   - `href`: `https://www.linkedin.com/in/sergio-ribeiro-cerqueira`
4. **GitHub**:
   - `id`: `github`
   - `label`: `GITHUB`
   - `value`: `https://github.com/sergiorib/sergiorib`
   - `detail`: `Veja meus códigos e projetos`
   - `href`: `https://github.com/sergiorib/sergiorib`
