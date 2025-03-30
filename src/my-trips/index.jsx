import React, { useEffect, useState } from 'react'; // ✅ Added useState
import { useNavigate } from 'react-router-dom'; // ✅ Corrected to useNavigate
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './../service/firebaseConfig'; // ✅ Ensure correct import for Firebase DB
import UserTripCardItem from "./components/UserTripCardItem.jsx"; // ✅ Correct path

function MyTrips() {
    const navigate = useNavigate(); // ✅ Corrected useNavigation to useNavigate
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, []);

    /**
     * Used to Get All User trips
     * @returns 
     */
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // ✅ Parse user from localStorage
        if (!user) {
            navigate('/'); // ✅ Redirect if user is not found
            return;
        }
        // ✅ Reset trips before fetching
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email)); // ✅ Access user email correctly
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        const trips = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data()); // ✅ Log user trips
            trips.push(doc.data());
        });
        setUserTrips(trips); // ✅ Set trips after loop
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
                {userTrips?.length > 0 ? userTrips.map((trip, index) => ( // ✅ Fixed variable name
                    <UserTripCardItem key={index} trip={trip} /> // ✅ Ensure key is provided for performance
                ))
                    : [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div
                            key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MyTrips;
