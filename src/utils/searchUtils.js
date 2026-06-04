/**
 * @typedef {Object} SearchResult
 * @property {string} id - Unique identifier
 * @property {string} title - Title of the item
 * @property {'topic' | 'module' | 'concept' | 'formula'} type - Type of the item
 * @property {string} path - URL path to the item
 * @property {string} [description] - Description or details
 * @property {string} [context] - Parent context (e.g., Topic name)
 * @property {string[]} [tags] - Tags for filtering (optional)
 * @property {string} matchText - Text used for search matching
 */

/**
 * Flatten the data into a searchable array
 * @param {Array} cfaData - Array of topic data
 * @returns {SearchResult[]}
 */
const getSearchIndex = (cfaData) => {
  const index = [];

  if (!cfaData || !Array.isArray(cfaData)) {
    return [];
  }

  try {
    // 1. Index Topics
    cfaData.forEach((topic) => {
      if (!topic) return;

      index.push({
        id: topic.id,
        title: topic.title,
        type: 'topic',
        path: `/cfa/level-1/topic/${topic.id}`,
        description: topic.description,
        matchText: `${topic.title} ${topic.description}`.toLowerCase(),
      });

      // 2. Index Modules
      const enhancedModules = topic.modules;

      if (enhancedModules) {
        enhancedModules.forEach((module) => {
          if (!module) return;

          const modulePath = `/cfa/level-1/topic/${topic.id}/module/${module.id}`;

          index.push({
            id: module.id,
            title: `Module ${module.number}: ${module.title}`,
            type: 'module',
            path: modulePath,
            context: topic.title,
            description: module.learningOutcomes?.[0]?.description || '',
            matchText: `${module.title} module ${module.number}`.toLowerCase(),
          });

          if (module.learningOutcomes) {
            module.learningOutcomes.forEach((los) => {
              if (los.concepts) {
                los.concepts.forEach((concept) => {
                  index.push({
                    id: concept.id,
                    title: concept.text,
                    type: 'concept',
                    path: modulePath,
                    context: `${topic.title} > ${module.title}`,
                    description: concept.details || '',
                    matchText:
                      `${concept.text} ${concept.details || ''} ${los.title}`.toLowerCase(),
                  });
                });
              }

              if (los.formulas) {
                los.formulas.forEach((formula) => {
                  index.push({
                    id: formula.id || `formula-${Math.random().toString(36).substr(2, 9)}`,
                    title: formula.name,
                    type: 'formula',
                    path: modulePath,
                    context: `${topic.title} > ${module.title}`,
                    description: `Formula: ${formula.latex}`,
                    matchText: `${formula.name} ${formula.latex} formula`.toLowerCase(),
                  });
                });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error building search index:', error);
  }

  return index;
};

let cachedIndex = null;
let cachedDataRef = null;

export const globalSearch = (query, cfaData = []) => {
  if (!query) return [];
  const normalizedQuery = query.toLowerCase().trim();

  if (!cachedIndex || cachedDataRef !== cfaData) {
    cachedIndex = getSearchIndex(cfaData);
    cachedDataRef = cfaData;
  }

  return cachedIndex.filter((item) => item.matchText.includes(normalizedQuery));
};

export const groupResultsByType = (results) => {
  return results.reduce((groups, item) => {
    if (!groups[item.type]) {
      groups[item.type] = [];
    }
    groups[item.type].push(item);
    return groups;
  }, {});
};
