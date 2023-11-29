from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy.spatial.distance import cosine

app = Flask(__name__)
CORS(app, resources={r"/run": {"origins": "http://localhost:3000", "supports_credentials": True,"headers": "Content-Type"}})


@app.route('/run', methods=['POST', 'OPTIONS'])
def find_top_similar_vectors():
    if request.method == 'OPTIONS':
        print("Handling preflight request")
        return _build_cors_prelight_response()
    else:
        data = request.json
        userList = np.array(data.get('userList'))
        databaseListOfObjects = data.get('databaseList')
        databaseList = [np.array(list(vector.values())) for sublist in databaseListOfObjects for vector in sublist]
        top_n = 3
        if databaseList and all(len(vector) == len(userList) for vector in databaseList):
            similarities = [1 - cosine(userList, vector) for vector in databaseList]
            top_indices = np.argsort(similarities)[-top_n:][::-1]
            return jsonify(top_indices.tolist())
        else:
            return jsonify([])

def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True)
