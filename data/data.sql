ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pr_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pr_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pr_statuses_id CASCADE;

DROP TABLE IF EXISTS public.boards;
DROP TABLE IF EXISTS public.cards;
DROP TABLE IF EXISTS public.statuses;

CREATE TABLE boards (
    id serial NOT NULL,
    title text
);

CREATE TABLE cards (
    id serial NOT NULL,
    board_id integer,
    title text,
    status_id integer,
    card_order integer
);

CREATE TABLE statuses (
    id serial NOT NULL,
    title text
);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pr_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pr_cards_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pr_statuses_id PRIMARY KEY (id);