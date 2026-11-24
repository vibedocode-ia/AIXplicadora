-- AIXplicadora PostgreSQL DDL Migration
-- Executa na VPS Hostinger (srv1359371 / Docker Coolify)

-- 1. Extensão UUID nativa
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Tabela de Usuários (Users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'STUDENT', -- STUDENT, PARENT, TEACHER, SUPER_ADMIN
    is_verified BOOLEAN NOT NULL DEFAULT false,
    terms_accepted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 3. Perfis de Usuário (User Profiles)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    academic_level VARCHAR(50) NOT NULL DEFAULT 'fundamental_2', -- fundamental_1, fundamental_2, ensino_medio, graduacao, pos_graduacao, mestrado_doutorado, livre
    default_subject_interest VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- 4. Vínculo Familiar (Guardian Students)
CREATE TABLE IF NOT EXISTS guardian_students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guardian_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    relationship_type VARCHAR(50) DEFAULT 'parent',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(guardian_id, student_id)
);

-- 5. Missões Socráticas (Missions)
CREATE TABLE IF NOT EXISTS missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    academic_level VARCHAR(50) NOT NULL,
    mode VARCHAR(50) NOT NULL DEFAULT 'problem_solving', -- problem_solving, exam_prep, deep_study
    status VARCHAR(50) NOT NULL DEFAULT 'INITIALIZING', -- INITIALIZING, DIAGNOSING, CHALLENGING, HINTING, VERIFYING, AUTONOMY_CHECK, COMPLETED, PAUSED
    current_step INT NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_missions_user_id ON missions(user_id);
CREATE INDEX IF NOT EXISTS idx_missions_status ON missions(status);

-- 6. Anexos Multimodais da Missão (Mission Attachments)
CREATE TABLE IF NOT EXISTS mission_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    attachment_type VARCHAR(50) NOT NULL, -- photo_notebook, photo_book, web_link, document
    url TEXT NOT NULL,
    extracted_text_ocr TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mission_attachments_mission_id ON mission_attachments(mission_id);

-- 7. Turnos de Diálogo Socrático (Mission Turns)
CREATE TABLE IF NOT EXISTS mission_turns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    turn_number INT NOT NULL,
    role VARCHAR(50) NOT NULL, -- user, assistant, system
    content TEXT NOT NULL,
    hint_level INT DEFAULT 0,
    evidence_evaluated BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mission_turns_mission_id ON mission_turns(mission_id);

-- 8. Evidências de Aprendizagem Real (Learning Evidences)
CREATE TABLE IF NOT EXISTS learning_evidences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(150) NOT NULL,
    demonstrated_autonomy BOOLEAN NOT NULL DEFAULT false,
    hint_count INT NOT NULL DEFAULT 0,
    mastery_level VARCHAR(50) DEFAULT 'practiced', -- introduced, practiced, autonomous, mastered
    verified_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_learning_evidences_user_id ON learning_evidences(user_id);

-- 9. Planos e Quotas (Plans)
CREATE TABLE IF NOT EXISTS plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    price_cents INT NOT NULL DEFAULT 0,
    billing_cycle VARCHAR(50) NOT NULL DEFAULT 'monthly',
    mission_quota INT NOT NULL DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 10. Logs de Auditoria e Segurança (Audit Logs)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
