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
def get_cards(cursor: RealDictCursor, board_id):
    query = """
            SELECT *
            FROM cards
            WHERE cards.board_id = board_id
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

# def get_cards_for_board(board_id):
#     all_cards = data_manager_sql.get_cards()
#     matching_cards = []
#     # for card in all_cards:
#     #     if card['board_id'] == str(board_id):
#     #         card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
#     #         matching_cards.append(card)
#     return all_cards
