CREATE TABLE funds (

  id BIGSERIAL PRIMARY KEY,

  fund_code VARCHAR(100) UNIQUE,

  fund_name VARCHAR(500),

  short_name VARCHAR(500),

  description TEXT,

  nav_date DATE,

  one_week NUMERIC(10,4),
  two_weeks NUMERIC(10,4),
  one_month NUMERIC(10,4),
  three_months NUMERIC(10,4),
  six_months NUMERIC(10,4),
  one_year NUMERIC(10,4),
  three_years NUMERIC(10,4),
  five_years NUMERIC(10,4),

  fund_type VARCHAR(50),

  updated_at TIMESTAMP DEFAULT NOW()

);