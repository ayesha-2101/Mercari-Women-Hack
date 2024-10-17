from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# Simple CORS handling
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

import numpy as np
import pandas as pd
import nltk
from transformers import BertTokenizer, BertModel
import torch
from scipy.spatial.distance import cosine
import speech_recognition as sr
import pickle
import pyttsx3
import requests
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt

# Download NLTK punkt tokenizer if not already downloaded
nltk.download('punkt')

# Initialize BERT tokenizer and model
huggingface_model = 'bert-base-uncased'
model = BertModel.from_pretrained(huggingface_model)
tokenizer = BertTokenizer.from_pretrained(huggingface_model)

# Load saved embeddings and metadata
with open('product_embeddings.pkl', 'rb') as f:
    data = pickle.load(f)
    product_embeddings = data['product_embeddings']
    product_ids = data['product_ids']
    product_names = data['product_names']
    product_descriptions = data['product_descriptions']

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Function to calculate BERT embedding for an input sentence
def calculate_input_embedding(input_sentence):
    input_sentence_encoded = tokenizer.encode_plus(input_sentence, add_special_tokens=True, return_tensors='pt', truncation=True)
    input_ids = input_sentence_encoded['input_ids']
    attention_mask = input_sentence_encoded['attention_mask']

    with torch.no_grad():
        output = model(input_ids, attention_mask=attention_mask)

    input_embedding = output.last_hidden_state[:, 0, :].numpy()[0]  # CLS token embedding, selecting the first sentence
    input_embedding = input_embedding.astype(np.float32)  # Ensure float32 type
    return input_embedding

# Endpoint to get the most similar product
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    input_sentence = data.get('input_sentence')
    input_embedding = calculate_input_embedding(input_sentence)

    # Calculate cosine similarity between input sentence embedding and each product embedding
    similarities = []
    for prod_emb in product_embeddings:
        sim_score = 1 - cosine(input_embedding, prod_emb)
        similarities.append(sim_score)

    # Find index of most similar product
    most_similar_index = int(np.argmax(similarities))  # Convert to native Python int
    most_similar_product_id = int(product_ids[most_similar_index])  # Convert to native Python int
    most_similar_product_name = product_names[most_similar_index]
    most_similar_product_description = product_descriptions[most_similar_index]

    response = {
        'product_id': most_similar_product_id,
        'product_name': most_similar_product_name,
        'product_description': most_similar_product_description  # Assuming this is a URL to the image
    }

    return make_response(jsonify(response), 200)

if __name__ == '__main__':
    app.run(debug=True)
