ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_user_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_card_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_status_id CASCADE;


DROP TABLE IF EXISTS public.users;
CREATE TABLE public.users (
    id SERIAL NOT NULL,
    username VARCHAR(20),
    password VARCHAR
);

DROP TABLE IF EXISTS public.boards;
CREATE TABLE public.boards (
    id SERIAL NOT NULL,
    title VARCHAR(20)
);

DROP TABLE IF EXISTS public.statuses;
CREATE TABLE public.statuses (
    id SERIAL NOT NULL,
    title VARCHAR(20)
);

DROP TABLE IF EXISTS public.cards;
CREATE TABLE public.cards (
    id SERIAL NOT NULL,
    title VARCHAR(20),
    card_order INTEGER,
    board_id SERIAL NOT NULL,
    status_id SERIAL NOT NULL
);


ALTER TABLE ONLY users
    ADD CONSTRAINT pk_user_id PRIMARY KEY (id);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_status_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);


INSERT INTO boards VALUES (1, 'Board 1');
INSERT INTO boards VALUES (2, 'Board 2');
INSERT INTO boards VALUES (3, 'Board 3');
INSERT INTO boards VALUES (4, 'Board 4');

INSERT INTO statuses VALUES (1, 'New');
INSERT INTO statuses VALUES (2, 'In progress');
INSERT INTO statuses VALUES (3, 'Testing');
INSERT INTO statuses VALUES (4, 'Done');


INSERT INTO cards VALUES (1, 'new card 1', null, 1, 1);
INSERT INTO cards VALUES (2, 'in progress card 1', null, 1, 2);
INSERT INTO cards VALUES (3, 'in progress card 2', null, 2, 2);
INSERT INTO cards VALUES (4, 'test card 1', null, 3, 3);
INSERT INTO cards VALUES (5, 'done card 1', null, 2, 4);
INSERT INTO cards VALUES (6, 'done card 2', null, 3, 4);