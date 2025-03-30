import React, { useState, useEffect } from "react";
import axios from "axios";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "../service/AIModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { db, app } from "@/service/firebaseConfig";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // ✅ Corrected import

function CreateTrip() {
    const [place, setPlace] = useState(null);
    const [formData, setFormData] = useState({});
    const [openDailog, setOpenDailog] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // ✅ Corrected `useNavigation()` to `useNavigate()`

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (tokenInfo) => {
            console.log("Google Login Success:", tokenInfo);
            GetUserProfile(tokenInfo);
        },
        onError: (error) => console.log("Google Login Error:", error)
    });

    const OnGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDailog(true);
            return;
        }
        if (!formData.noOfDays || !formData.location?.label || !formData.budget || !formData.travelWith) {
            toast.error("Please fill all details");
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.travelWith)
            .replace('{budget}', formData?.budget);

        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log("AI Response:", result?.response?.text());
            SaveAiTrip(result?.response?.text());
            setLoading(false);
        } catch (error) {
            console.error("Error in AI response:", error);
        }
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId); // ✅ Using `useNavigate()` correctly
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: "application/json"
            }
        })
            .then((resp) => {
                console.log("User Profile:", resp.data);
                localStorage.setItem('user', JSON.stringify(resp.data));
                setOpenDailog(false);
                OnGenerateTrip();
            })
            .catch((err) => {
                console.error("Error fetching user profile:", err);
            });
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <ToastContainer />

            <h2 className="font-bold text-3xl">Tell Us Your Travel Preferences🏕🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className="mt-20 flex flex-col gap-10">
                <div>
                    <h2 className="text-xl my-3 font-medium">
                        What is your destination of choice?
                    </h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v);
                            },
                        }}
                    />
                </div>
            </div>

            <div>
                <h2 className="text-xl my-3 font-medium">
                    How many days are you planning your trip?
                </h2>
                <input
                    placeholder="Ex. 3"
                    type="number"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                />
            </div>

            <div>
                <h2 className="text-xl my-3 font-medium">
                    What is Your Budget?
                </h2>
                <div className="flex gap-5 mt-5">
                    {SelectBudgetOptions.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center gap-2 border p-4 rounded-lg hover:shadow-lg 
                            ${formData?.budget === item.title ? "shadow-lg border-black" : ""}`}
                            onClick={() => handleInputChange('budget', item.title)}
                        >
                            <span className="text-4xl">{item.icon}</span>
                            <span className="font-bold text-lg">{item.title}</span>
                            <span className="text-sm text-gray-500">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl my-3 font-medium">
                    Who do you plan on traveling with on your next adventure?
                </h2>
                <div className="flex gap-5 mt-5">
                    {SelectTravelsList.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center gap-2 border p-4 rounded-lg hover:shadow-lg 
                            ${formData?.travelWith === item.title ? "shadow-lg border-black" : ""}`}
                            onClick={() => handleInputChange('travelWith', item.title)}
                        >
                            <span className="text-4xl">{item.icon}</span>
                            <span className="font-bold text-lg">{item.title}</span>
                            <span className="text-sm text-gray-500">{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-10 justify-end flex">
                <Button
                    disabled={loading}
                    onClick={OnGenerateTrip}
                    className="bg-black text-white hover:bg-gray-800"
                >
                    {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
                </Button>

                <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                    <DialogContent className="max-w-sm w-full p-6 rounded-lg shadow-lg bg-white flex flex-col items-center text-center">
                        <DialogHeader>
                            <h2 className="font-bold text-lg">Sign In With Google</h2>
                        </DialogHeader>
                        <DialogDescription className="text-gray-600 text-sm mt-2">
                            Sign in to the App with Google authentication securely
                        </DialogDescription>
                        <Button onClick={login} variant="outline" className="mt-4 w-full flex gap-4 items-center">
                            <FcGoogle className='h-7 w-7' />Sign In With Google
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default CreateTrip;
