from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy.spatial.distance import cosine

app = Flask(__name__)
CORS(app)  

@app.route('/run', methods=['POST'])
def find_top_similar_vectors():
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

if __name__ == '__main__':
    app.run(debug=True)