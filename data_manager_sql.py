from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import database_common_sql


@database_common_sql.connection_handler
def get_boards(cursor: RealDictCursor) -> list:
    query = """
            SELECT *
            FROM boards
            ORDER BY id
            """

    cursor.execute(query)

    return cursor.fetchall()