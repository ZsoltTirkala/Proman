from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import database_common_sql


@database_common_sql.connection_handler
def add_new_answer(cursor: RealDictCursor, question_id, answer_message, username) -> list:
    image = None
    query = """
                INSERT INTO answer (submission_time, vote_number, question_id, message, image, accepted_status, user_id)
                VALUES (CURRENT_TIMESTAMP, 0, %(question_id)s, %(answer_message)s, %(img)s, False, (SELECT id FROM "user" WHERE username = %(u_n)s))
                """

    cursor.execute(query,
                   {'question_id': question_id,
                    'answer_message': answer_message,
                    "img": image,
                    "u_n": username}
                   )
