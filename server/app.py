from flask import Flask, jsonify, request
from flask_cors import CORS
from joblib import load
import pandas as pd
import numpy as np

test = pd.read_csv('testdata.csv')
test['date'] = pd.to_datetime(test['date']).dt.strftime("%Y-%m-%d")
app = Flask(__name__)
CORS(app)

pipe = load("RegressorModel.joblib")


@app.route('/')
def get_data():
    data = {"message": "Store Sale Forecasting"}
    return jsonify(data)


@app.route('/predict', methods=['POST'])
def predict():

    store_nbr = request.json.get('store_nbr')
    family_nbr = request.json.get('family_nbr')
    date = request.json.get('date')
    date = pd.to_datetime(date).strftime("%Y-%m-%d")

    temp = test[test['store_nbr'] == int(store_nbr)]
    temp = temp[temp['family_int'] == int(family_nbr)]
    temp = temp[temp['date'] == date]
    print(temp)
    x_test = temp.drop(columns=['id', 'date'])
    y_test = pipe.predict(x_test)

    print(y_test[0])
    return str(np.round(y_test, 4))


if __name__ == '__main__':
    app.run(debug=True, port=5000)
