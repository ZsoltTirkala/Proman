import persistence
import data_manager_sql


def get_card_status():
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = data_manager_sql.get_statuses()
    # return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')
    return statuses


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager_sql.get_boards()


def get_cards_for_board(board_id):
    all_cards = data_manager_sql.get_cards(board_id)
    matching_cards = []
    # for card in all_cards:
    #     if card['board_id'] == str(board_id):
    #         card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
    #         matching_cards.append(card)
    return all_cards

#new things


def saving_new_board(new_board_name):
    new_board = data_manager_sql.add_new_board(new_board_name)
    return new_board


def saving_new_card(new_card_title, new_card_status, new_card_board_id):
    new_card = data_manager_sql.add_new_card(new_card_title, new_card_status, new_card_board_id)
    return new_card


def saving_new_status(new_status_title,new_status_board_id):
    new_status = data_manager_sql.add_new_status(new_status_title,new_status_board_id)
    return new_status

def delete_board(board_id):
    data_manager_sql.delete_board_itself(board_id)


def delete_card(card_id):
    data_manager_sql.delete_card(card_id)


def rename_card(card_id, new_title):
    new_card_title = data_manager_sql.rename_card(card_id, new_title)
    return new_card_title

def rename_board(board_id, new_title):
    new_board_title_content = data_manager_sql.rename_board(board_id, new_title)
    return new_board_title_content
