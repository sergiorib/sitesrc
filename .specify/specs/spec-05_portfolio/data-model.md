# Data Model: Portfolio Page Entities

## 1. Entities

### CategorySection
- **Description**: Represents a group of projects classified under a specific Data Science domain.
- **Fields**:
  - `category_id`: string (slug, e.g., `bi-analytics`, `machine-learning`, `deep-learning`, `data-engineering`, `cloud-devops`, `gen-ai`, `stat-modeling`)
  - `category_title`: string (Display name, e.g., 'Análise de Dados e BI')
  - `projects`: Array<ProjectCard> (empty for categories without published projects)

### ProjectCard
- **Description**: Represents an interactive card displaying project summary information and linking to its detail page.
- **Fields**:
  - `project_name`: string (e.g., 'Customer Lifecycle Analytics (CLA)')
  - `project_resume`: string (Summary description)
  - `project_link`: string (Absolute path or URL, e.g., `/pages/portfolio/projetos/AES1/AES1.html`)
  - `project_image`: string (Absolute path, e.g., `/pages/portfolio/assets/images/projeto_CLA.avif`)
  - `habilities_list`: Array<HabilityTag>

### HabilityTag
- **Description**: Skill or technology tag associated with a project.
- **Fields**:
  - `name`: string (e.g., 'PowerBI', 'Python', 'SQL', 'DuckDB', 'Apache Airflow', 'Delta Lake', 'Spark', 'DBT')
  - `type`: enum (`hard_skill`, `soft_skill`)

---

## 2. Exhaustive Data Record Inventory (Section 2.4 Compliance)

Strict inventory of project cards defined in Section 2.4 of `spec.md` (Total: 3 cards across 7 categories):

1. **Category `bi-analytics` ('Análise de Dados e BI')** - 1 card:
   - `project_name`: "Customer Lifecycle Analytics (CLA)"
   - `project_resume`: "Projeto de análise CLA completa (RFM, LTV, Cohort, CAC e Churn) em um contexto de e-commerce de cosméticos."
   - `project_link`: `/pages/portfolio/projetos/AES1/AES1.html`
   - `project_image`: `/pages/portfolio/assets/images/projeto_CLA.avif`
   - `habilities_list`:
     - Hard Skill: "PowerBI"
     - Hard Skill: "Python"
     - Hard Skill: "SQL"
     - Hard Skill: "DuckDB"

2. **Category `machine-learning` ('Machine Learning')** - 0 cards (Category header only).

3. **Category `deep-learning` ('Deep Learning')** - 0 cards (Category header only).

4. **Category `data-engineering` ('Engenharia de Dados')** - 2 cards:
   - Card 1:
     - `project_name`: "Pipeline de dados de Transações de Fintech"
     - `project_resume`: "Projeto de criação de uma pipeline utilizando uma arquitetura do tipo MDS (Modern Data Stack)."
     - `project_link`: `https://github.com/sergiorib/cla-omnibox/blob/main/README.md`
     - `project_image`: `/pages/portfolio/assets/images/projeto_pipeline1.avif`
     - `habilities_list`:
       - Hard Skill: "Apache Airflow"
       - Hard Skill: "Delta Lake"
       - Hard Skill: "Spark"
       - Hard Skill: "DBT"
       - Hard Skill: "Python"
   - Card 2:
     - `project_name`: "Projeto de teste"
     - `project_resume`: "Projeto apenas para teste da especificação."
     - `project_link`: `/pages/portfolio/projetos/testes/pagina_teste.html`
     - `project_image`: `/pages/portfolio/assets/images/projeto_CLA.avif`
     - `habilities_list`:
       - Hard Skill: "Tecnologia 1"
       - Hard Skill: "Tecnologia 2"
       - Hard Skill: "Tecnologia 3"
       - Hard Skill: "Tecnologia 4"

5. **Category `cloud-devops` ('Cloud & MLOps')** - 0 cards (Category header only).

6. **Category `gen-ai` ('IA Generativa & LLMs')** - 0 cards (Category header only).

7. **Category `stat-modeling` ('Modelagem Estatística')** - 0 cards (Category header only).
