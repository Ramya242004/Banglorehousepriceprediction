import streamlit as st
import requests

# Function to fetch the available locations
def fetch_location_names():
    try:
        response = requests.get('http://127.0.0.1:5000/get_location_names')
        response.raise_for_status()  # This will raise an exception for HTTP errors
        locations = response.json().get('locations', [])
        return locations
    except requests.exceptions.RequestException as e:
        st.error(f"Error fetching location names: {e}")
        return []

# Function to predict the home price
def predict_home_price(total_sqft, location, bhk, bath):
    try:
        response = requests.post('http://127.0.0.1:5000/predict_home_price', data={
            'total_sqft': total_sqft,
            'location': location,
            'bhk': bhk,
            'bath': bath
        })
        response.raise_for_status()  # This will raise an exception for HTTP errors
        result = response.json()

        # Check if there's an error in the response
        if 'estimated_price' in result:
            return result['estimated_price']
        else:
            st.error(f"Error in prediction: {result.get('error')}")
            return None
    except requests.exceptions.RequestException as e:
        st.error(f"Error predicting home price: {e}")
        return None

# Streamlit app interface
st.title("Home Price Prediction")

# Input fields for user to provide information
location = st.selectbox('Select Location', fetch_location_names())
total_sqft = st.number_input('Enter Total Square Feet', min_value=1)
bhk = st.number_input('Enter Number of BHK', min_value=1)
bath = st.number_input('Enter Number of Bathrooms', min_value=1)

# Button to trigger prediction
if st.button('Predict Price'):
    # Ensure inputs are valid before sending them to Flask API
    if location and total_sqft and bhk and bath:
        price = predict_home_price(total_sqft, location, bhk, bath)
        if price:
            st.success(f"Estimated Home Price: ₹{price}")
        else:
            st.error("Unable to predict the price. Please try again.")
    else:
        st.error("Please fill all the fields before predicting the price.")
