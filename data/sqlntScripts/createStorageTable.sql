CREATE TABLE
  public.storage (ingredient text NOT NULL, quantity smallint NULL);

ALTER TABLE
  public.storage
ADD
  CONSTRAINT storage_pkey PRIMARY KEY (ingredient)