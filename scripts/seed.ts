import pg from "pg";
const { Pool } = pg;
import * as dotenv from "dotenv";

// Import directly from the data folder
import { CFA_LEVEL_1_DATA } from "../data/level1-v2/index.js";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const ICON_MAP: Record<string, string> = {
  "quantitative-methods": "Calculator",
  economics: "Globe",
  "financial-statement-analysis": "BookOpen",
  "corporate-issuers": "Briefcase",
  "equity-investments": "TrendingUp",
  "fixed-income": "Activity",
  derivatives: "Target",
  "alternative-investments": "Users",
  "portfolio-management": "BarChart",
  "ethical-and-professional-standards": "Scale",
};

async function seed() {
  console.log("🌱 Seeding CFA Level 1 data...");
  await pool.query("DELETE FROM formulas");
  await pool.query("DELETE FROM concepts");
  await pool.query("DELETE FROM learning_outcomes");
  await pool.query("DELETE FROM modules");
  await pool.query("DELETE FROM topics WHERE level = 1"); // Idempotent

  for (let i = 0; i < CFA_LEVEL_1_DATA.length; i++) {
    const topic = CFA_LEVEL_1_DATA[i];
    await pool.query(
      `INSERT INTO topics (id, level, title, description, weight, study_hours, sort_order, icon_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        topic.id,
        1,
        topic.title,
        topic.description ?? null,
        topic.weight,
        topic.studyHours ?? null,
        i,
        ICON_MAP[topic.id] ?? null,
      ]
    );

    for (let mi = 0; mi < (topic.modules?.length ?? 0); mi++) {
      const mod = topic.modules[mi];
      await pool.query(
        `INSERT INTO modules (id, topic_id, number, title, study_time)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          mod.id,
          topic.id,
          mod.number ?? mi + 1,
          mod.title,
          mod.studyTime ?? null,
        ]
      );

      for (let li = 0; li < (mod.learningOutcomes?.length ?? 0); li++) {
        const los = mod.learningOutcomes[li];
        await pool.query(
          `INSERT INTO learning_outcomes (id, module_id, topic_id, los_code, title, description, icon, color, sort_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            los.losId,
            mod.id,
            topic.id,
            los.losCode,
            los.title,
            los.description ?? null,
            los.icon ?? null,
            los.color ?? null,
            li,
          ]
        );

        for (let ci = 0; ci < (los.concepts?.length ?? 0); ci++) {
          const c = los.concepts[ci];
          await pool.query(
            `INSERT INTO concepts (id, los_id, module_id, topic_id, text, concept_type, details, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              c.id,
              los.losId,
              mod.id,
              topic.id,
              c.text,
              c.type,
              c.details ?? null,
              ci,
            ]
          );
        }

        for (let fi = 0; fi < (los.formulas?.length ?? 0); fi++) {
          const f = los.formulas[fi];
          await pool.query(
            `INSERT INTO formulas (id, los_id, module_id, topic_id, name, latex, variables, usage, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              f.id,
              los.losId,
              mod.id,
              topic.id,
              f.name,
              f.latex ?? null,
              f.variables ? JSON.stringify(f.variables) : null,
              f.usage ?? null,
              fi,
            ]
          );
        }
      }
    }
    console.log(`  ✓ ${topic.title} (${topic.modules?.length ?? 0} modules)`);
  }

  console.log("✅ Seed complete!");
  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
