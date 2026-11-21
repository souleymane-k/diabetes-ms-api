DROP INDEX IF EXISTS diabetes_results_user_id_idx;
ALTER TABLE diabetes_results DROP COLUMN IF EXISTS user_id;
DROP TABLE IF EXISTS diabetes_users;
