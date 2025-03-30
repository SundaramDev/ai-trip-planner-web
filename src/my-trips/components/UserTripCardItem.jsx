import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        if (!trip?.userSelection?.location?.label) {
            console.warn("No location label found for the trip.");
            return;
        }

        const data = { textQuery: trip.userSelection.location.label };

        try {
            console.log("Fetching place details for:", data);
            const resp = await GetPlaceDetails(data);

            if (!resp?.data?.places || resp.data.places.length === 0) {
                console.warn("No places found in response", resp?.data);
                return;
            }

            const place = resp.data.places[0];
            if (!place?.photos || place.photos.length < 4) {
                console.warn("No valid photo found in place response", place);
                return;
            }

            const photoRef = place.photos[3].name;
            const finalPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
            setPhotoUrl(finalPhotoUrl);
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-all '>
                <img
                    src={photoUrl ? photoUrl : '/placeholder.jpg'}
                    alt="Trip Image"
                    className="object-cover rounded-xl h-[220px]"
                />
                <div>
                    <h2 className='font-bold text-lg text-black'>
                        {trip?.userSelection?.location?.label || "Unknown Location"}
                    </h2>
                    <h2 className='text-sm text-gray-500 '>
                        {trip?.userSelection?.noOfDays || "N/A"} Days trip with {trip?.userSelection?.budget || "N/A"} Budget
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCardItem;