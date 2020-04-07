from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import database_common_sql


@database_common_sql.connection_handler
def get_boards(cursor: RealDictCursor):
    query = """
            SELECT *
            FROM boards
            ORDER BY id
            """

    cursor.execute(query)
    boards = cursor.fetchall()
    return boards

@database_common_sql.connection_handler
def get_cards(cursor: RealDictCursor):
    query = """
            SELECT *
            FROM cards
            ORDER BY id
            """

    cursor.execute(query)
    cards = cursor.fetchall()

    return cards

@database_common_sql.connection_handler
def get_statuses(cursor: RealDictCursor):
    query = """
            SELECT *
            FROM statuses
            ORDER BY id
            """

    cursor.execute(query)
    statuses = cursor.fetchall()
    return statuses
