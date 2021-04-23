
CREATE TABLE "to-do" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(250) NOT NULL,
    "due_date" DATE,
    "isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "to-do" ("task", "due_date", "isComplete")

VALUES
    ('Buy groceries', '4/23/2021', 'false'),
    ('Mow the lawn', '4/26/2021', 'false'),
    ('Get Project completed', '4/25/2021', 'false');

SELECT * FROM "to-do";