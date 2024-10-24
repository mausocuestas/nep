-- src/db/schema.sql

-- Instituições
CREATE TABLE IF NOT EXISTS instituicoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) UNIQUE,
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cursos
CREATE TABLE IF NOT EXISTS cursos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    area VARCHAR(50),
    instituicao_id INTEGER REFERENCES instituicoes(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Unidades de Saúde
CREATE TABLE IF NOT EXISTS unidades_saude (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    endereco TEXT,
    telefone VARCHAR(20),
    coordenador VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Preceptores
CREATE TABLE IF NOT EXISTS preceptores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    especialidade VARCHAR(50),
    unidade_id INTEGER REFERENCES unidades_saude(id),
    telefone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Estagiários
CREATE TABLE IF NOT EXISTS estagiarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE,
    celular VARCHAR(20),
    email VARCHAR(100),
    curso_id INTEGER REFERENCES cursos(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Estágios
CREATE TABLE IF NOT EXISTS estagios (
    id SERIAL PRIMARY KEY,
    estagiario_id INTEGER REFERENCES estagiarios(id),
    unidade_id INTEGER REFERENCES unidades_saude(id),
    preceptor_id INTEGER REFERENCES preceptores(id),
    tipo_atividade VARCHAR(50) NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    dias_semana TEXT NOT NULL, -- Armazenado como JSON string
    periodo VARCHAR(20),
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL,
    carga_horaria_diaria INTEGER NOT NULL,
    semestre_previsto VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
