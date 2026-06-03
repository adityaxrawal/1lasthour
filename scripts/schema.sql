-- ═══════════════════════════════════════════════════════════════
-- TABLE: topics
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS topics (
    id TEXT PRIMARY KEY,
    level SMALLINT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    weight TEXT NOT NULL,
    study_hours TEXT,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    short_title TEXT,
    icon_name TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_topics_level ON topics(level);
CREATE INDEX IF NOT EXISTS idx_topics_level_sort ON topics(level, sort_order);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: modules
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS modules (
    id TEXT NOT NULL,
    topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    number SMALLINT NOT NULL,
    title TEXT NOT NULL,
    study_time TEXT,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_modules_topic ON modules(topic_id);
CREATE INDEX IF NOT EXISTS idx_modules_topic_number ON modules(topic_id, number);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: learning_outcomes
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS learning_outcomes (
    id TEXT NOT NULL,
    module_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    los_code TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (id, module_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_los_module ON learning_outcomes(module_id, topic_id);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: concepts
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS concepts (
    id TEXT NOT NULL,
    los_id TEXT NOT NULL,
    module_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    text TEXT NOT NULL,
    concept_type TEXT NOT NULL,
    details TEXT,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (id, los_id, module_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_concepts_los ON concepts(los_id, module_id, topic_id);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: formulas
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS formulas (
    id TEXT NOT NULL,
    los_id TEXT NOT NULL,
    module_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    name TEXT NOT NULL,
    latex TEXT,
    formula_text TEXT,
    variables JSONB,
    usage TEXT,
    description TEXT,
    sort_order SMALLINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (id, los_id, module_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_formulas_los ON formulas(los_id, module_id, topic_id);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: users
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT,
    display_name TEXT,
    role TEXT NOT NULL DEFAULT 'student',
    email_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- TABLE: refresh_tokens
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    revoked_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_hash ON refresh_tokens(token_hash);
