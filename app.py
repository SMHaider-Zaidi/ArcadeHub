from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('landing.html')

@app.route('/submitEchoCode', methods=['POST'])
def show_echo_code():

    return render_template('echocode.html')

@app.route('/submitRoadRush', methods=['POST'])
def show_road_rush():

    return render_template('roadRush.html')

@app.route('/submitTicTacToe', methods=['POST'])
def show_tic_tac_toe():

    return render_template('tictactoe.html')

# Main Menu
@app.route('/submitMainMenu', methods=['POST'])
def show_main_menu():

    return render_template('landing.html')

if __name__ == '__main__':
    app.run(debug=True)