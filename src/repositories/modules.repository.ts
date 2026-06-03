import { query } from '../config/database.js';

export const modulesRepository = {
  /**
   * Return full module detail: LOS → concepts + formulas.
   * This is the data-heavy endpoint that powers the ModulePage.
   */
  async findByIdWithContent({ topicId, moduleId }: { topicId: string; moduleId: string }) {
    // 1 — Verify module exists and fetch base data
    const modRes = await query(
      `
      SELECT 
        id, topic_id AS "topicId", number, title, study_time AS "studyTime",
        is_published AS "isPublished", created_at AS "createdAt", updated_at AS "updatedAt"
      FROM modules 
      WHERE id = $1 AND topic_id = $2 LIMIT 1
    `,
      [moduleId, topicId],
    );

    if (modRes.rows.length === 0) return null;
    const moduleData = modRes.rows[0];

    // 2 — Fetch the parent topic (for title in response)
    const topicRes = await query(`SELECT title FROM topics WHERE id = $1 LIMIT 1`, [topicId]);

    // 3 — Fetch all learning outcomes for this module
    const losRes = await query(
      `
      SELECT 
        id, module_id AS "moduleId", topic_id AS "topicId", los_code AS "losCode", 
        title, description, icon, color, sort_order AS "sortOrder", 
        created_at AS "createdAt", updated_at AS "updatedAt"
      FROM learning_outcomes 
      WHERE module_id = $1 AND topic_id = $2 
      ORDER BY sort_order
    `,
      [moduleId, topicId],
    );

    // 4 — Fetch all concepts and formulas in one query each (avoid N+1)
    const conceptRes = await query(
      `
      SELECT 
        id, los_id AS "losId", module_id AS "moduleId", topic_id AS "topicId", 
        text, concept_type AS "conceptType", details, sort_order AS "sortOrder",
        created_at AS "createdAt", updated_at AS "updatedAt"
      FROM concepts 
      WHERE module_id = $1 AND topic_id = $2 
      ORDER BY sort_order
    `,
      [moduleId, topicId],
    );

    const formulaRes = await query(
      `
      SELECT 
        id, los_id AS "losId", module_id AS "moduleId", topic_id AS "topicId", 
        name, latex, formula_text AS "formulaText", variables, usage, description, 
        sort_order AS "sortOrder", created_at AS "createdAt", updated_at AS "updatedAt"
      FROM formulas 
      WHERE module_id = $1 AND topic_id = $2 
      ORDER BY sort_order
    `,
      [moduleId, topicId],
    );

    // 5 — Assemble the nested structure
    const conceptsByLos = new Map<string, any[]>();
    for (const c of conceptRes.rows) {
      const existing = conceptsByLos.get(c.losId) ?? [];
      existing.push(c);
      conceptsByLos.set(c.losId, existing);
    }

    const formulasByLos = new Map<string, any[]>();
    for (const f of formulaRes.rows) {
      const existing = formulasByLos.get(f.losId) ?? [];
      existing.push(f);
      formulasByLos.set(f.losId, existing);
    }

    const learningOutcomesWithContent = losRes.rows.map((los) => ({
      ...los,
      concepts: conceptsByLos.get(los.id) ?? [],
      formulas: formulasByLos.get(los.id) ?? [],
    }));

    return {
      ...moduleData,
      topicId,
      topicTitle: topicRes.rows[0]?.title ?? '',
      losCount: losRes.rows.length,
      conceptCount: conceptRes.rows.length,
      formulaCount: formulaRes.rows.length,
      learningOutcomes: learningOutcomesWithContent,
    };
  },

  /**
   * Return stats-only module list for a topic (powers TopicPage).
   */
  async findWithStatsByTopic({ topicId }: { topicId: string }) {
    const { rows } = await query(
      `
      SELECT 
        m.id, 
        m.topic_id AS "topicId", 
        m.number, 
        m.title, 
        m.study_time AS "studyTime", 
        CAST(COUNT(lo.id) AS INTEGER) AS "losCount"
      FROM modules m
      LEFT JOIN learning_outcomes lo ON lo.module_id = m.id AND lo.topic_id = m.topic_id
      WHERE m.topic_id = $1 AND m.is_published = true
      GROUP BY m.id
      ORDER BY m.number
    `,
      [topicId],
    );

    return rows;
  },
};
