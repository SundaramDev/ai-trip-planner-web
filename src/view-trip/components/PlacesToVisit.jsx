import React from 'react';
import PlaceCardItem from '../components/PlaceCardItem'; // ✅ Ensure correct import

function PlacesToVisit({ trip }) {
    console.log("PlacesToVisit - tripData:", trip?.tripData);
    console.log("PlacesToVisit - itinerary:", trip?.tripData?.itinerary);

    // Convert itinerary object into an array of objects
    const itineraryList = trip?.tripData?.itinerary;
    const safeItinerary = itineraryList && typeof itineraryList === 'object'
        ? Object.entries(itineraryList).map(([day, places]) => ({ day, places }))
        : [];

    console.log("PlacesToVisit - safeItinerary:", safeItinerary);

    return (
        <div>
            <h2 className='font-bold text-lg'> Places To Visit</h2>
            <div>
                {safeItinerary.length > 0 ? (
                    safeItinerary.map((item, index) => (
                        <div key={index} className='mb-5 mt-5'>
                            <h2 className='font-medium text-lg mb-3'>
                                {`Day ${index + 1}`}
                            </h2>

                            {/* Debugging */}
                            {console.log(`Checking places for ${item.day}:`, item.places)}

                            {Array.isArray(item.places) && item.places.length > 0 ? (
                                <div className='grid md:grid-cols-2 gap-5'>
                                    {item.places.map((place, placeIndex) => (
                                        <div key={placeIndex} className='flex flex-col'>
                                            <h2 className='font-medium text-sm text-orange'>{place.travelTime}</h2>
                                            <div className=''>
                                                <PlaceCardItem place={place} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-gray-500'>No places available</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className='text-gray-500'>No itinerary available</p>
                )}
            </div>
        </div>
    );
}

export default PlacesToVisit;
