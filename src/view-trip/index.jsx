import React, { useEffect, useState } from 'react'; // ✅ Added `useState`
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { toast } from 'react-toastify';
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels"; // ✅ Ensure this import exists
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './components/Footer'; // ✅ Added missing import

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null); // ✅ Set initial state to `null`

    useEffect(() => {
        const GetTripData = async () => {
            if (!tripId) return;

            const docRef = doc(db, 'AITrips', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document:", docSnap.data());
                setTrip(docSnap.data());
            } else {
                console.log("No such Document");
                toast('No trip found!');
            }
        };

        GetTripData();
    }, [tripId]);

    console.log("Hotels Data:", trip?.tripData?.hotels); // ✅ Corrected path
    // ✅ Added console.log here

    return (
        <div className='p-10 md:px-20 lg:px-14 xl:px-56'>
            {/* Information section */}
            {trip && <InfoSection trip={trip} />} {/* ✅ Render only if trip exists */}
            {/* Recommended Hotels */}
            {trip && <Hotels trip={trip} />} {/* ✅ Pass correct prop */}
            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />
            {/* Footer */}
            <Footer trip={trip} /> {/* ✅ Footer now properly defined */}
        </div>
    );
}

export default Viewtrip;
