from flask import Flask, render_template, url_for, request
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_card_status()

# new things


@app.route("/boards", methods=['POST'])
@json_response
def save_new_board():
    new_board_name = request.form['name']
    new_board_title = data_handler.saving_new_board(new_board_name)
    return new_board_title


@app.route("/cards", methods=['POST'])
@json_response
def add_new_card():
    new_card_content = request.json['name']
    new_status = request.json['status']
    new_card_status = int(new_status)
    new_card_board_id = request.json['board_id']
    new_card = data_handler.saving_new_card(new_card_content, new_card_status, new_card_board_id)
    return new_card

@app.route("/new-status", methods=['POST'])
@json_response
def add_new_status():
    new_status_title = request.json['name']
    new_status_board_id = request.json['board_id']
    new_status = data_handler.saving_new_status(new_status_title, new_status_board_id)
    return new_status


@app.route("/delete-board", methods=['POST'])
@json_response
def delete_board():
    board_id = request.json['board_id']
    data_handler.delete_board(board_id)


@app.route("/delete-card", methods=['POST'])
@json_response
def delete_card():
    card_id = request.json['card_id']
    data_handler.delete_card(card_id)

@app.route("/rename-card", methods=['POST'])
@json_response
def rename_card():
    card_id = request.json['card_id']
    new_title = request.json['new_title']
    new_card_content = data_handler.rename_card(card_id, new_title)
    return new_card_content


@app.route("/rename-board", methods=['POST'])
@json_response
def rename_board():
    board_id = request.json['board_id']
    new_title = request.json['new_title']
    new_board_title_content = data_handler.rename_board(board_id, new_title)
    return new_board_title_content


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
