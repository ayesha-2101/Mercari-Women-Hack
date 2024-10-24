# import os
# import csv
# import requests
# from PIL import Image
# from io import BytesIO
# from langchain import PromptTemplate
# from langchain.schema import StrOutputParser
# from langchain_google_genai import ChatGoogleGenerativeAI

# def get_fashion_recommendations(skin_color, body_type, occasion, preferred_style):
#     os.environ['GOOGLE_API_KEY'] = 'AIzaSyDGkSLsqjwLb5QNwl-U7hz0UHrnHGvMyS4'

#     # Set up the Google Generative AI model
#     llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7, top_p=0.85)

#     # Create a prompt template for querying Gemini based on the inputs
#     llm_prompt_template = """Based on the following details:
#     - Skin color: {skin_color}
#     - Body type: {body_type}
#     - Occasion: {occasion}
#     - Preferred style: {preferred_style}

#     Suggest one best dress recommendation that would best suit the person for this occasion. 
#     The prompt should just return two words: one for the dress type from:
#     ['Tops', 'Capris', 'Dresses', 'Shorts', 'Tshirts', 'Skirts', 'Jeans', 'Leggings',
#     'Rompers', 'Lehenga Choli', 'Salwar', 'Shirts', 'Jackets', 'Kurtas', 'Sweatshirts',
#     'Blazers', 'Formal Shoes', 'Flats', 'Heels']
    
#     And another word for the color from:
#     ['White', 'Black', 'Blue', 'Pink', 'Red', 'Yellow', 'Green', 'Orange', 'Purple', 
#     'Beige', 'Maroon', 'Cream', 'Gold', 'Bronze', 'Silver']

#     OUTFIT RECOMMENDATION:"""
    
#     llm_prompt = PromptTemplate.from_template(llm_prompt_template)

#     # Define the chain for generating fashion recommendations
#     input_data = {
#         "skin_color": skin_color,
#         "body_type": body_type,
#         "occasion": occasion,
#         "preferred_style": preferred_style
#     }

#     response = (
#         llm_prompt | llm | StrOutputParser()
#     ).invoke(input_data)

#     return response.strip().split()

# def filter_csv_and_display_images(csv_file, primary_keywords, fallback_keywords):
#     matching_images = []

#     # Read the CSV and filter based on keywords
#     with open(csv_file, 'r') as file:
#         reader = csv.reader(file)
#         next(reader)  # Skip header if any

#         # First attempt: Match both primary keywords
#         for row in reader:
#             print ("new", row)
#             if all(keyword in row[0].lower() + row[1].lower() for keyword in primary_keywords):
#                 matching_images.append(row[4])  # Image URL in the 5th column
#                 if len(matching_images) >= 6:
#                     break

#     # If fewer than 6 images, try matching on just one keyword
#     if len(matching_images) < 6:
#         with open(csv_file, 'r') as file:
#             reader = csv.reader(file)
#             next(reader)  # Skip header if any

#             for row in reader:
#                 print(row)
#                 if any(keyword in row[0].lower() + row[1].lower() for keyword in fallback_keywords):
#                     matching_images.append(row[4])
#                     if len(matching_images) >= 6:
#                         break
    
#     print (len(matching_images))
#     print("Matching Images:")
#     for url in matching_images:
#         print(url)
    
#     # Display the images
#     for url in matching_images:
#         try:
#             response = requests.get(url)
#             img = Image.open(BytesIO(response.content))
#             img.show()
#         except Exception as e:
#             print(f"Error displaying image from {url}: {e}")

#     return matching_images

# # Example usage:
# if __name__ == "__main__":
#     skin_color = "fair"
#     body_type = "hourglass"
#     occasion = "wedding"
#     preferred_style = "elegant and modern"

#     # Get fashion recommendations
#     recommendations = get_fashion_recommendations(skin_color, body_type, occasion, preferred_style)
#     print("Recommendations:", recommendations)

#     # Extract keywords for filtering images
#     dress_type, color = recommendations
#     primary_keywords = [dress_type.lower(), color.lower()]
#     fallback_keywords = [dress_type.lower(), color.lower()]

#     # Filter and display images from CSV
#     csv_file = "mockdata.csv"  # Replace with your actual CSV file path
#     filter_csv_and_display_images(csv_file, primary_keywords, fallback_keywords)


import os
import csv
import requests
from PIL import Image
from io import BytesIO
from langchain import PromptTemplate
from langchain.schema import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI

def get_fashion_recommendations(skin_color, body_type, occasion, preferred_style):
    os.environ['GOOGLE_API_KEY'] = 'AIzaSyDGkSLsqjwLb5QNwl-U7hz0UHrnHGvMyS4'

    # Set up the Google Generative AI model
    llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.7, top_p=0.85)

    # Create a prompt template for querying Gemini based on the inputs
    llm_prompt_template = """Based on the following details:
    - Skin color: {skin_color}
    - Body type: {body_type}
    - Occasion: {occasion}
    - Preferred style: {preferred_style}

    Suggest one best dress recommendation that would best suit the person for this occasion. 
    The prompt should just return only and just only two words: one for the dress type from :
    ['Tops', 'Capris', 'Dresses', 'Shorts', 'Tshirts', 'Skirts', 'Jeans', 'Leggings',
    'Rompers', 'Lehenga_Choli', 'Salwar', 'Shirts', 'Jackets', 'Kurtas', 'Sweatshirts',
    'Blazers', 'Formal_Shoes', 'Flats', 'Heels']
    
    And another word for the color from:
    ['White', 'Black', 'Blue', 'Pink', 'Red', 'Yellow', 'Green', 'Orange', 'Purple', 
    'Beige', 'Maroon', 'Cream', 'Gold', 'Bronze', 'Silver']

    OUTFIT RECOMMENDATION:"""
    
    llm_prompt = PromptTemplate.from_template(llm_prompt_template)

    # Define the chain for generating fashion recommendations
    input_data = {
        "skin_color": skin_color,
        "body_type": body_type,
        "occasion": occasion,
        "preferred_style": preferred_style
    }

    response = (
        llm_prompt | llm | StrOutputParser()
    ).invoke(input_data)

    return response.strip().split()


def filter_csv_and_display_images(csv_file, primary_keywords, fallback_keywords):
    # Initialize a list to hold dictionaries with item details
    data = []

    # Read the CSV and filter based on keywords
    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header if any

        # First attempt: Match both primary keywords
        for row in reader:
            print("new", row)
            if all(keyword in row[0].lower() + row[1].lower() for keyword in primary_keywords):
                # Create a dictionary for the matched item
                item = {
                    "imageurl": row[4],  # Image URL in the 5th column
                    "title": row[3],      # Title in the 4th column
                    "price": row[6],      # Price in the 7th column
                    "rating": row[5]      # Rating in the 6th column
                }
                data.append(item)  # Append the dictionary to the list
                if len(data) >= 10:
                    break

    if len(data) < 10:
        with open(csv_file, 'r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header if any

            for row in reader:
                print(row)
                if any(keyword in row[0].lower() + row[1].lower() for keyword in fallback_keywords):
                    # Create a dictionary for the matched item
                    item = {
                        "imageurl": row[4],
                        "title": row[3],
                        "price": row[6],
                        "rating": row[5]
                    }
                    data.append(item)  # Append the dictionary to the list
                    if len(data) >= 10:
                        break
    
    print(len(data))
    print("Matching Items:")
    for item in data:
        print(item)

    # Display the images
    for item in data:
        url = item["imageurl"]
        try:
            response = requests.get(url)
            img = Image.open(BytesIO(response.content))
            #img.show()
        except Exception as e:
            print(f"Error displaying image from {url}: {e}")

    return data  # Return the list of dictionaries

# Example usage:
if __name__ == "__main__":
    skin_color = "fair"
    body_type = "hourglass"
    occasion = "wedding"
    preferred_style = "elegant and modern"

    # Get fashion recommendations
    recommendations = get_fashion_recommendations(skin_color, body_type, occasion, preferred_style)
    print("Recommendations:", recommendations)

    # Extract keywords for filtering images
    dress_type, color = recommendations
    primary_keywords = [dress_type.lower(), color.lower()]
    fallback_keywords = [dress_type.lower(), color.lower()]

    # Filter and display images from CSV
    csv_file = "mockdata.csv"  # Replace with your actual CSV file path
    filter_csv_and_display_images(csv_file, primary_keywords, fallback_keywords)


