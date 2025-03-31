import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SchedulePage.css";
import userphoto from "../assets/images/UserProfile.png";
const SchedulePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [propertyData, setPropertyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        visitor_name: "",
        visitor_email: "",
        visitor_phone: "",
        visit_date: "",
        visit_time: "",
        notes: ""
    });
    const [submitStatus, setSubmitStatus] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [existingSchedules, setExistingSchedules] = useState([]);
    const [dateError, setDateError] = useState("");

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                setLoading(true);
                const [propertyRes, detailsRes] = await Promise.all([
                    fetch(`http://localhost:5000/api/v1/properties/${id}`),
                    fetch(`http://localhost:5000/api/v1/property-details/${id}`)
                ]);

                const propertyData = await propertyRes.json();
                const detailsData = await detailsRes.json();

                setPropertyData({
                    ...propertyData,
                    details: detailsData.data
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPropertyData();
    }, [id]);

    useEffect(() => {
        const fetchExistingSchedules = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/schedules/property/${id}`);
                const data = await response.json();
                console.log('Fetched schedules:', data);
                setExistingSchedules(data.schedules || []);
            } catch (err) {
                console.error("Error fetching schedules:", err);
                setExistingSchedules([]);
            }
        };

        fetchExistingSchedules();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'visit_date') {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                setDateError("Cannot select a past date");
                return;
            }
            setDateError("");

            if (formData.visit_time && Array.isArray(existingSchedules)) {
                if (isDuplicateSchedule(value, formData.visit_time)) {
                    setDateError("This time slot is already booked");
                    return;
                }
            }
        }

        if (name === 'visit_time') {
            if (formData.visit_date && Array.isArray(existingSchedules)) {
                if (isDuplicateSchedule(formData.visit_date, value)) {
                    setDateError("This time slot is already booked");
                    return;
                }
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const selectedDate = new Date(formData.visit_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setDateError("Cannot schedule for a past date");
            return;
        }

        if (isDuplicateSchedule(formData.visit_date, formData.visit_time)) {
            setDateError("This time slot is already booked");
            return;
        }

        setSubmitStatus("loading");

        try {
            const response = await fetch('http://localhost:5000/api/v1/schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_id: id,
                    ...formData
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to schedule visit');
            }

            setSubmitStatus("success");
            setTimeout(() => {
                navigate(`/view-property/${id}`);
            }, 2000);
        } catch (error) {
            setSubmitStatus("error");
            console.error("Error scheduling visit:", error);
        }
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const isDuplicateSchedule = (date, time) => {
        if (!Array.isArray(existingSchedules)) {
            console.error('existingSchedules is not an array:', existingSchedules);
            return false;
        }
        
        return existingSchedules.some(schedule => 
            schedule && 
            schedule.visit_date === date && 
            schedule.visit_time === time
        );
    };

    if (loading) return <div className="schedule-page">Loading...</div>;
    if (error) return <div className="schedule-page">Error: {error}</div>;
    if (!propertyData) return <div className="schedule-page">Property not found</div>;

    return (
        <div className="schedule-page">
            <Navbar />
            <div className="schedule-container">
                <div className="schedule-header">
                    <h1>Schedule a Property Visit</h1>
                    <p>Book an appointment to view this property</p>
                </div>

                <div className="schedule-content">
                    <div className="property-preview">
                        <h2>Property Details</h2>
                        <div className="property-main-image">
                            <img 
                                src={selectedImage || propertyData.details.mainImage.url} 
                                alt={propertyData.name} 
                            />
                        </div>
                        
                        <div className="property-gallery">
                            <div 
                                className={`gallery-thumb ${!selectedImage ? 'active' : ''}`}
                                onClick={() => handleImageClick(propertyData.details.mainImage.url)}
                            >
                                <img src={propertyData.details.mainImage.url} alt="Main" />
                            </div>
                            {propertyData.details.sideImages.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`gallery-thumb ${selectedImage === img.url ? 'active' : ''}`}
                                    onClick={() => handleImageClick(img.url)}
                                >
                                    <img src={img.url} alt={`Gallery ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        <div className="property-info">
                            <h3>{propertyData.name}</h3>
                            <p>{propertyData.location}</p>
                            
                            <div className="owner-section">
                                <div className="owner-photo">
                                    <img 
                                        src={propertyData.owner_photo || userphoto} 
                                        alt={propertyData.owner} 
                                    />
                                </div>
                                <div className="owner-details">
                                    <div className="info-item">
                                        <i className="fas fa-user"></i>
                                        <span>{propertyData.owner}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="fas fa-phone"></i>
                                        <span>{propertyData.phone_no}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="fas fa-envelope"></i>
                                        <span>{propertyData.email || "shibbs075@gmail.com"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="scheduling-form">
                        <h2>Schedule Your Visit</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="visitor_name"
                                    name="visitor_name"
                                    value={formData.visitor_name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="visitor_name">Your Name</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="visitor_email"
                                    name="visitor_email"
                                    value={formData.visitor_email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="visitor_email">Your Email</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    id="visitor_phone"
                                    name="visitor_phone"
                                    value={formData.visitor_phone}
                                    onChange={handleInputChange}
                                    required
                                    placeholder=" "
                                />
                                <label htmlFor="visitor_phone">Your Phone</label>
                            </div>

                            <div className="form-group">
                                <input
                                    type="date"
                                    id="visit_date"
                                    name="visit_date"
                                    value={formData.visit_date}
                                    onChange={handleInputChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                                <label htmlFor="visit_date" className="date-label"></label>
                                {dateError && <div className="error-message">{dateError}</div>}
                            </div>

                            <div className="form-group">
                                <select
                                    id="visit_time"
                                    name="visit_time"
                                    value={formData.visit_time}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Time</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Additional Notes (Optional)"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className={`submit-btn ${submitStatus}`}
                                disabled={submitStatus === "loading"}
                            >
                                {submitStatus === "loading" ? "Scheduling..." :
                                 submitStatus === "success" ? "Visit Scheduled!" :
                                 "Finalize Visit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SchedulePage;
