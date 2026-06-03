import { query } from '../config/database.js';

export const topicsRepository = {
  /**
   * Return all topics for a given level, with module count.
   */
  async findByLevel({ level, published }: { level: number; published: boolean }) {
    let sql = `
      SELECT 
        t.id, 
        t.level, 
        t.title, 
        t.description, 
        t.weight, 
        t.study_hours AS "studyHours", 
        t.sort_order AS "sortOrder", 
        t.short_title AS "shortTitle", 
        t.icon_name AS "iconName", 
        CAST(COUNT(m.id) AS INTEGER) AS "moduleCount"
      FROM topics t
      LEFT JOIN modules m ON m.topic_id = t.id AND m.is_published = true
      WHERE t.level = $1
    `;
    const params: any[] = [level];

    if (published) {
      sql += ` AND t.is_published = true`;
    }

    sql += ` GROUP BY t.id ORDER BY t.sort_order`;

    const { rows } = await query(sql, params);
    return rows;
  },

  /**
   * Return a single topic with its modules (without full LOS/concepts — for topic detail page).
   */
  async findByIdWithModules({ topicId, level }: { topicId: string; level: number }) {
    const topicRes = await query(
      `
      SELECT 
        id, level, title, description, weight, study_hours AS "studyHours", 
        sort_order AS "sortOrder", short_title AS "shortTitle", icon_name AS "iconName", 
        is_published AS "isPublished", created_at AS "createdAt", updated_at AS "updatedAt"
      FROM topics
      WHERE id = $1 AND level = $2
      LIMIT 1
    `,
      [topicId, level],
    );

    if (topicRes.rows.length === 0) return null;
    const topic = topicRes.rows[0];

    const modulesRes = await query(
      `
      SELECT 
        id, topic_id AS "topicId", number, title, study_time AS "studyTime",
        is_published AS "isPublished", created_at AS "createdAt", updated_at AS "updatedAt"
      FROM modules
      WHERE topic_id = $1 AND is_published = true
      ORDER BY number
    `,
      [topicId],
    );

    return { ...topic, modules: modulesRes.rows };
  },
};
