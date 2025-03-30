import React, { useState, useEffect } from 'react';
import { IoIosSend } from "react-icons/io";
import { GetPlaceDetails } from '../../service/GlobalApi';

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(); // ✅ useState is now defined

    useEffect(() => {
        GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        if (!trip?.userSelection?.location?.label) {
            console.warn("Location label is missing.");
            return;
        }

        const data = {
            textQuery: trip.userSelection.location.label
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
        <div>
            <img src={photoUrl || '/placeholder.jpg'} className='h-[340px] w-full object-cover rounded-xl' alt="Location" />
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>
                        {trip?.userSelection?.location?.label || "Unknown Location"}
                    </h2>
                    <div className="flex gap-5">
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            📅 {trip?.userSelection?.noOfDays || 1} Day
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            💰 {trip?.userSelection?.budget || "N/A"} Budget
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
                            🥂 No. of Traveler: {trip?.userSelection?.traveler || 1}
                        </h2>
                    </div>
                </div>
                <button className="p-2 bg-blue-500 text-white rounded-md flex items-center gap-2">
                    <IoIosSend />
                    Send
                </button>
            </div>
        </div>
    );
}

export default InfoSection;
