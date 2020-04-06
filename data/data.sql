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
--
-- ALTER TABLE ONLY boards
--     ADD CONSTRAINT pr_boards_id FOREIGN KEY (id) REFERENCES cards(board_id) ON DELETE CASCADE;
--
-- ALTER TABLE ONLY cards
--     ADD CONSTRAINT pr_statuses_id FOREIGN KEY (id) REFERENCES cards(status_id) ON DELETE CASCADE;

-- INSERT INTO user_data VALUES (1, 'john@nasa.gov', '$2b$12$NQ9qcc7qVjcFp9xXs/h9neCtNE7g21Jbj4KUZ5btwdBiJUnIIlM4G', '2017-05-01 10:41:00', 'image1.jpg');
-- SELECT pg_catalog.setval('user_data_id_seq', 1, true);

INSERT INTO boards VALUES (1, 'Board 1');
INSERT INTO boards VALUES (2, 'Board 2');

INSERT INTO cards VALUES (1,1,'new card 1',0,0);
INSERT INTO cards VALUES (2,1,'new card 2',0,1);
INSERT INTO cards VALUES (3,1,'in progress card',1,0);
INSERT INTO cards VALUES (4,1,'planning',2,0);
INSERT INTO cards VALUES (5,1,'done card 1',3,0);
INSERT INTO cards VALUES (6,1,'done card 1',3,1);
INSERT INTO cards VALUES (7,2,'new card 1',0,0);
INSERT INTO cards VALUES (8,2,'new card 2',0,1);
INSERT INTO cards VALUES (9,2,'in progress card',1,0);
INSERT INTO cards VALUES (10,2,'planning',2,0);
INSERT INTO cards VALUES (11,2,'done card 1',3,0);
INSERT INTO cards VALUES (12,2,'done card 1',3,1);

INSERT INTO statuses VALUES (0,'new');
INSERT INTO statuses VALUES (1,'in progress');
INSERT INTO statuses VALUES (2,'testing');
INSERT INTO statuses VALUES (3,'done');















