import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// Ensure the chatSession is correctly initialized
export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing,rating, Time to travel each of the locations for 3 days with each day plan with best time to visit in JSON format."
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: "I cannot access real-time information, including hotel prices, availability, images, and real-time geo-coordinates. Also, I cannot browse the internet to find image URLs. However, I can give you a JSON template with placeholder values that you can fill in using online travel booking sites and Google Maps. Remember to always verify prices and availability before making bookings.\n\n\n```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Budget-Friendly Hotel 1 (Example)\",\n      \"hotelAddress\": \"123 Example Street, Las Vegas, NV (Example)\",\n      \"price\": {\"range\": \"$50-$80 per night (Example)\"},\n      \"hotelImageUrl\": \"PLACEHOLDER_IMAGE_URL_1\",\n      \"geoCoordinates\": {\"latitude\": 36.1699, \"longitude\": -115.1398},\n      \"rating\": 3.5,\n      \"description\": \"A basic but clean hotel with a pool. Located near the Strip (Example).\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free walking area with light shows and street performers.\",\n        \"placeImageUrl\": \"PLACEHOLDER_IMAGE_URL_4\",\n        \"geoCoordinates\": {\"latitude\": 36.1699, \"longitude\": -115.1400},\n        \"ticketPricing\": \"Free\",\n        \"travelTime\": \"30 minutes (Example)\"\n      }\n    ]\n  }\n}\n```\n\nRemember to replace all the `PLACEHOLDER_IMAGE_URL` and numerical values with actual data."
                },
            ],
        },
    ],
});
