
CREATE TABLE "to-do" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(250) NOT NULL,
    "due_date" DATE,
    "isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "to-do" ("task", "due_date", "isComplete")

VALUES
    ('Feed the dog', '4/23/2021', 'False'),
    ('Mow the lawn', '4/26/2021', 'False');

SELECT * FROM "to-do";