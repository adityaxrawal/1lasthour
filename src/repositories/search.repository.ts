import { query } from '../config/database.js';

export type SearchType = 'concept' | 'formula' | 'all';

export interface SearchParams {
  q: string;
  level: number;
  type: SearchType;
  limit: number;
  offset: number;
}

export const searchRepository = {
  async search({ q, level, type, limit, offset }: SearchParams) {
    const results: Array<{
      type: 'concept' | 'formula';
      id: string;
      text?: string;
      name?: string;
      conceptType?: string;
      topicId: string;
      topicTitle: string;
      moduleId: string;
      moduleTitle: string;
      losCode: string;
    }> = [];

    const searchTerm = `%${q}%`;

    // ─── Concept search ───────────────────────────────────────────────────
    if (type === 'concept' || type === 'all') {
      const conceptLimit = type === 'all' ? Math.ceil(limit / 2) : limit;
      const { rows: conceptRows } = await query(
        `
        SELECT 
          c.id, c.text, c.concept_type AS "conceptType", c.topic_id AS "topicId",
          t.title AS "topicTitle", c.module_id AS "moduleId", m.title AS "moduleTitle",
          (
            SELECT lo.los_code
            FROM learning_outcomes lo
            WHERE lo.id = c.los_id AND lo.module_id = c.module_id AND lo.topic_id = c.topic_id
            LIMIT 1
          ) AS "losCode"
        FROM concepts c
        INNER JOIN modules m ON m.id = c.module_id AND m.topic_id = c.topic_id
        INNER JOIN topics t ON t.id = c.topic_id AND t.level = $1
        WHERE c.text ILIKE $2 OR c.details ILIKE $2
        LIMIT $3 OFFSET $4
      `,
        [level, searchTerm, conceptLimit, offset],
      );

      for (const r of conceptRows) {
        results.push({
          type: 'concept',
          id: r.id,
          text: r.text,
          conceptType: r.conceptType,
          topicId: r.topicId,
          topicTitle: r.topicTitle,
          moduleId: r.moduleId,
          moduleTitle: r.moduleTitle,
          losCode: r.losCode ?? '',
        });
      }
    }

    // ─── Formula search ───────────────────────────────────────────────────
    if (type === 'formula' || type === 'all') {
      const formulaLimit = type === 'all' ? Math.floor(limit / 2) : limit;
      const { rows: formulaRows } = await query(
        `
        SELECT 
          f.id, f.name, f.topic_id AS "topicId",
          t.title AS "topicTitle", f.module_id AS "moduleId", m.title AS "moduleTitle",
          (
            SELECT lo.los_code
            FROM learning_outcomes lo
            WHERE lo.id = f.los_id AND lo.module_id = f.module_id AND lo.topic_id = f.topic_id
            LIMIT 1
          ) AS "losCode"
        FROM formulas f
        INNER JOIN modules m ON m.id = f.module_id AND m.topic_id = f.topic_id
        INNER JOIN topics t ON t.id = f.topic_id AND t.level = $1
        WHERE f.name ILIKE $2 OR f.usage ILIKE $2
        LIMIT $3 OFFSET $4
      `,
        [level, searchTerm, formulaLimit, offset],
      );

      for (const r of formulaRows) {
        results.push({
          type: 'formula',
          id: r.id,
          name: r.name,
          topicId: r.topicId,
          topicTitle: r.topicTitle,
          moduleId: r.moduleId,
          moduleTitle: r.moduleTitle,
          losCode: r.losCode ?? '',
        });
      }
    }

    return results;
  },
};
