from flask import Flask, request, jsonify
from transformers import pipeline, BartTokenizer
from flask_cors import CORS  # Import CORS

# Initialize the Flask app
app = Flask(__name__)

# Initialize CORS
CORS(app)  # Allow all domains by default


@app.route('/')
def hello():
    return 'Hello, World!'


summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")


@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        # Get the input text from the request body
        data = request.json.get("text", "")

        if not data:
            return jsonify({"error": "No text provided"}), 400

        # Clean up text
        # Adjust if necessary, but this should be in tokens not characters
        data = data[:1000]
        data = data.replace("'", "").replace('"', "").replace(
            "’", "").replace("”", "").replace("“", "")
        data = data.replace("—", "").replace(
            "–", "").replace("…", "").replace("•", "")

        # Tokenize input data
        inputs = tokenizer(data, return_tensors="pt",
                           truncation=True, padding=True,
                           max_length=2048, return_token_type_ids=True)
        print(f"Tokenized inputs: {inputs}")

        # Generate the summary
        summary = summarizer(data, max_length=200,
                             min_length=5, do_sample=False)

        # Return the summary
        return jsonify({"summary": summary[0]['summary_text']})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred during summarization"}), 500


# Run the server
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080, debug=True)
