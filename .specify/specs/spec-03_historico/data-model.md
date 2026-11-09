# Data Model: Histórico Profissional

**Feature**: `03-historico`  
**Status**: Concluído

## 1. Estrutura de Dados da Experiência Profissional

A página de histórico gerencia uma coleção estática de experiências profissionais estruturadas com os seguintes atributos:

- **id**: Identificador único da experiência (ex: `frete-com`)
- **companyName**: Nome da empresa (ex: `Frete.com`)
- **companyLogoPath**: Caminho para o ativo de imagem da logo (ex: `../historico/assets/images/logo_frete.png`)
- **logoHeight**: Altura de exibição da logo (ex: `100px` para Experiência 1)
- **jobTitle**: Cargo ocupado (ex: `Analista de BI`)
- **badges**: Lista de tags informativas (ex: `['Logística', 'PJ', 'Remoto', 'maio 2025 a março 2026', '10 meses']`)
- **description**: Texto descritivo detalhado das atividades executadas e impacto gerado.
- **techStack**: Lista de tecnologias e habilidades utilizadas (ex: `['Microsoft SQL Server', 'Python', 'DuckDB', 'n8n', 'dbt', 'API REST', 'Postman']`)
