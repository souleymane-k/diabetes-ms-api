CREATE TABLE diabetes_months (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  name TEXT NOT NULL 
);

ALTER TABLE diabetes_results
  ADD COLUMN
    folderid INTEGER REFERENCES diabetes_months(id)
    ON DELETE SET NULL;