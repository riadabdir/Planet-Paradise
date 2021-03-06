import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import MyBookingItem from '../MyBookingItem/MyBookingItem';

const MyBooking = () => {
    const [myBooking, setMyBooking] = useState([]);
    const { user } = useAuth();
    const email = user.email;

    useEffect(() => {
        fetch(`https://polar-hollows-28101.herokuapp.com/bookings/${email}`)
            .then(res => res.json())
            .then(data => setMyBooking(data))
    }, [myBooking]);


    return (
        <div className="container my-3 py-2">
            <h3 className="text-center fw-bold fst-italic mb-4">Hello <span className="text-success">{user.email && user.displayName}</span> ! Here is Your Bookings</h3>
            <div className="row">
                {
                    myBooking.map(bookings => <MyBookingItem
                        key={bookings._id}
                        bookings={bookings}
                    ></MyBookingItem>)
                }
            </div>

            <div className="text-center">
                <Link to="/">
                    <button className="btn btn-dark mt-5">Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default MyBooking;