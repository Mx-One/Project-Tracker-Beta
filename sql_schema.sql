-- SUPABASE SCHEMA:

-- Schema for user profile
CREATE TABLE user_profile (
  user_id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT[] NOT NULL,
  avatar TEXT,
  created_at DATE DEFAULT now()
);

-- Schema for project
CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    project_address VARCHAR NOT NULL,
    client VARCHAR NOT NULL,
    contract_amount FLOAT NOT NULL,
    paid FLOAT NOT NULL,
    user_id_fk UUID NOT NULL,
    status VARCHAR NOT NULL,
    date_quoted DATE NOT NULL,
    date_started DATE,
    date_finished DATE,
    FOREIGN KEY (user_id_fk) REFERENCES user_profile(user_id)
    CONSTRAINT STATUS CHECK (status IN ('quoted', 'active', 'finished'))
);

-- Schema for sales records
CREATE TABLE sales (
    sales_id SERIAL PRIMARY KEY,
    project_id_fk INTEGER NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (project_id_fk) REFERENCES project(id)
);
