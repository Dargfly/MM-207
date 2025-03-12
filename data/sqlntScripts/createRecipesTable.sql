CREATE TABLE
  public.recipes (
    id serial NOT NULL,
    object text NOT NULL,
    ingredients jsonb NOT NULL,
    instructions jsonb NOT NULL
  );

ALTER TABLE
  public.recipes
ADD
  CONSTRAINT recipes_pkey PRIMARY KEY (id)