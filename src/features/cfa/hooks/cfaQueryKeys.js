export const cfaQueryKeys = {
  all: ['cfa'],
  topics: (level) => [...cfaQueryKeys.all, 'topics', level],
  topic: (topicId, level) => [...cfaQueryKeys.all, 'topic', topicId, level],
  module: (topicId, moduleId, level) => [...cfaQueryKeys.all, 'module', topicId, moduleId, level],
};
