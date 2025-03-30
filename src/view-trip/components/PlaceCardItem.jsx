import React, { useState, useEffect } from 'react'; // ✅ Added missing imports
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom'; // ✅ Import Link correctly
import { Button } from "@/components/ui/button"; // ✅ Import Button correctly (adjust path if needed)

function PlaceCardItem({ place }) {  // ✅ Destructure place correctly
    const [photoUrl, setPhotoUrl] = useState(); // ✅ useState is now defined

    useEffect(() => {
        place && GetPlacePhoto();
    }, [place]);

    const GetPlacePhoto = async () => {
        if (!place?.userSelection?.location?.label) { // ✅ Fixed incorrect variable `trip` to `place`
            console.warn("Location label is missing.");
            return;
        }

        const data = {
            textQuery: place.placeName
        };

        try {
            const resp = await GetPlaceDetails(data);

            if (resp?.places?.length > 0) {
                const place = resp.places[0]; // Extract first place
                const photoName = place?.photos?.[3]?.name; // Ensure index exists

                if (photoName) {
                    const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName); // ✅ Fixed incorrect capitalization `PhotoUrl`
                    setPhotoUrl(photoUrl); // ✅ Fix setting photo URL correctly
                } else {
                    console.warn("Photo not found at index [3]");
                    setPhotoUrl('/placeholder.jpg'); // ✅ Fallback to placeholder if no photo
                }
            } else {
                console.warn("No places found in API response.");
                setPhotoUrl('/placeholder.jpg'); // ✅ Fallback if no places found
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
            setPhotoUrl('/placeholder.jpg'); // ✅ Fallback in case of error
        }
    };

    return (
        <Link
            to={`https://www.google.com/maps/search/?q=${encodeURIComponent(place.placeName)}`}
            target='_blank'
            className="no-underline text-black" // ✅ Ensures text is black and removes default link styling
        >
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img
                    src={photoUrl || '/placeholder.jpg'} // ✅ Ensured placeholder works properly
                    alt={place?.placeName || "Place Image"}  // ✅ Add alt for accessibility
                    className='w-[130px] h-[130px] rounded-xl' // ✅ Fix className placement
                    onError={(e) => e.target.src = '/placeholder.jpg'} // ✅ Ensures fallback if image fails
                />
                <div className="text-black"> {/* ✅ Ensure inner text is also black */}
                    <h2 className='font-bold text-lg text-black'>{place.placeName}</h2>
                    <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                    <h2 className='mt-2 text-black'>🕙 {place.travelTime}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
