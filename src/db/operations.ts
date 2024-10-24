// src/db/operations.ts
import { executeQuery } from './utils';

// Tipos
export interface Instituicao {
  id?: number;
  nome: string;
  cnpj?: string;
  email?: string;
}

export interface Estagiario {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  curso_id: number;
}

// Operações de Instituição
export const instituicaoOps = {
  create: async (instituicao: Instituicao) => {
    const { nome, cnpj, email } = instituicao;
    const result = await executeQuery(
      'INSERT INTO instituicoes (nome, cnpj, email) VALUES ($1, $2, $3) RETURNING *',
      [nome, cnpj, email]
    );
    return result.rows[0];
  },

  getAll: async () => {
    const result = await executeQuery('SELECT * FROM instituicoes ORDER BY nome');
    return result.rows;
  },

  getById: async (id: number) => {
    const result = await executeQuery('SELECT * FROM instituicoes WHERE id = $1', [id]);
    return result.rows[0];
  },

  update: async (id: number, instituicao: Partial<Instituicao>) => {
    const sets = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(instituicao)) {
      if (value !== undefined) {
        sets.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    values.push(id);
    const query = `
      UPDATE instituicoes 
      SET ${sets.join(', ')}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await executeQuery(query, values);
    return result.rows[0];
  },

  delete: async (id: number) => {
    await executeQuery('DELETE FROM instituicoes WHERE id = $1', [id]);
    return true;
  }
};

// Você pode adicionar outras operações para as demais tabelas seguindo o mesmo padrão
