import { topicsService } from "../src/services/topics.service.js";
import { modulesService } from "../src/services/modules.service.js";
import { connectRedis, disconnectRedis } from "../src/config/redis.js";
import { pool } from "../src/config/database.js";
import * as dotenv from "dotenv";

dotenv.config();

async function warmCache() {
  console.log("🔥 Warming Redis cache...");
  await connectRedis();

  try {
    const topics = await topicsService.list({ level: 1 });
    console.log(`✓ Cached topic list for Level 1`);

    for (const topic of topics) {
      await topicsService.getById({ topicId: topic.id, level: 1 });
      console.log(`  ✓ Cached topic details: ${topic.id}`);

      // We need to fetch the topic again with its module list to warm those
      // The topic returned by list() doesn't have the modules array
      // topicsService.getById() returns the topic with the modules array
      const fullTopic = await topicsService.getById({ topicId: topic.id, level: 1 });

      if (fullTopic && "modules" in fullTopic) {
        for (const mod of fullTopic.modules) {
          await modulesService.getById({
            topicId: topic.id,
            moduleId: mod.id,
            level: 1,
          });
        }
        console.log(`    ✓ Cached ${fullTopic.modules.length} modules`);
      }
    }

    console.log("✅ Cache warming complete!");
  } catch (err) {
    console.error("❌ Cache warming failed", err);
  } finally {
    await disconnectRedis();
    await pool.end();
  }
}

warmCache();
