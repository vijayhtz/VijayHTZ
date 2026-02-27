import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

interface EventCardProps {
    title: string;
    image: string;
    description: string;
    linkTo: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, image, description, linkTo }) => {
    return (
        <Link to={linkTo} className="event-card-link">
            <div className="event-card">
                <div className="event-card-image-wrap">
                    <img src={image} alt={title} className="event-card-img" />
                    <div className="event-card-overlay">
                        <span className="event-card-action">View Details</span>
                    </div>
                </div>
                <div className="event-card-content">
                    <h3 className="event-card-title">{title}</h3>
                    <p className="event-card-desc">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
