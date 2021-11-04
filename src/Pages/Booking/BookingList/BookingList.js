import React, { useEffect, useState } from 'react';
import './BookingList.css';

const BookingList = (props) => {
    const [bookingItem, setBookingItem] = useState([]);
    const { _id, key, userName, address, phoneNumber } = props.myBookings;


    useEffect(() => {
        fetch('https://polar-hollows-28101.herokuapp.com/tourpackages')
            .then(response => response.json())
            .then(data => setBookingItem(data));
    }, [])
    const booking = bookingItem.find((packageInfo) => packageInfo._id === key);

    // Delete a Booking
    const handleDeleteBooking = id => {
        const proceed = window.confirm("Are you sure, you want to delete this Booking?");
        if (proceed) {
            const url = `https://polar-hollows-28101.herokuapp.com/bookings/${id}`;
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Successfully Deleted Booking.");

                    }
                })
        }
    }



    return (
        <div className="card mb-3 border shadow-sm">
            <div className="row align-items-center">
                <div className="col-md-3 custom-booking">
                    <img src={booking?.img} className="img-fluid rounded-start" width="100%" alt="" />
                </div>
                <div className="col-md-9 py-2">
                    <h4 className="fw-bold">{booking?.title}</h4>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h5 className="fw-bold text-secondary">{booking?.price} tk</h5>
                            <h6>Booked By: {userName}</h6>
                            <h6>Address: {address}</h6>
                            <h6>Phone Number: {phoneNumber}</h6>
                        </div>
                        <div className="col-md-6 text-center">
                            {/* <h5 className="text-danger pending-approve">Booking Pending</h5> */}
                            <button onClick={() => handleDeleteBooking(_id)} className="btn btn-danger me-2">Delete</button>
                            <button className="btn btn-success ms-2">Approve</button>

                            {/* Modal For Delete */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingList;