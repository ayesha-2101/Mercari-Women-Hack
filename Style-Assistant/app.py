from flask import Flask, request, render_template
from your_module import get_fashion_recommendations,filter_csv_and_display_images


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        skin_color = request.form['skin_color']
        body_type = request.form['body_type']
        occasion = request.form['occasion']
        preferred_style = request.form['preferred_style']

        # Get fashion recommendations using Gemini AI
        recommendations = get_fashion_recommendations(skin_color, body_type, occasion, preferred_style)
      
        dress_type, color = recommendations
        print (dress_type, color)
        primary_keywords = [dress_type.lower(), color.lower()]
        fallback_keywords = [dress_type.lower(), color.lower()]
        csv_file = "mockdata.csv" 
        matching_images=[]
        matching_images= filter_csv_and_display_images(csv_file, primary_keywords, fallback_keywords)
        
        return render_template('result.html', recommendations=recommendations, matching_images=matching_images)
    

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
