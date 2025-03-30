import React, { useState, useEffect } from 'react'; // ✅ Added missing imports
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState(); // ✅ useState is now defined

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        if (!hotel?.userSelection?.location?.label) {
            console.warn("Location label is missing.");
            return;
        }

        const data = {
            textQuery: hotel.hotelName
        };

        try {
            const resp = await GetPlaceDetails(data);
            console.log("API Response:", resp); // ✅ Debugging full response

            if (resp?.places?.length > 0) {
                const place = resp.places[0]; // Extract first place
                const photoName = place?.photos?.[3]?.name; // Ensure index exists

                if (photoName) {
                    const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                    setPhotoUrl(PhotoUrl); // ✅ Fix setting photo URL correctly
                } else {
                    console.warn("Photo not found at index [3]");
                }
            } else {
                console.warn("No places found in API response.");
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error.message);
        }
    };

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1$query{encodeURIComponent(hotel.hotelName + ', ' + hotel.hotelAddress)}`}
            target='_blank'
            className="no-underline" // ✅ Removes default link styling
        >
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl || '/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover'  /> {/* ✅ Fallback to placeholder */}
                <div className='my-2 gap-3'>
                    <h2 className='font-medium text-black'>{hotel.hotelName}</h2> {/* ✅ Ensures black text */}
                    <h2 className='text-xs text-gray-500'>📍 {hotel.hotelAddress}</h2>
                    <h2 className='text-sm text-black'>💰 {hotel.price?.range || "Price not available"}</h2> {/* ✅ Black text */}
                    <h2 className='text-sm text-black'>⭐ {hotel.rating || "Rating not available"}</h2> {/* ✅ Black text */}
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
