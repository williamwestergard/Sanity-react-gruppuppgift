const AnimalCard = ({ name, description, image }) => {
    return (
        <article className="animal-card">
            <img src={image} alt={name} className="animal-image" />
            <h3>{name}</h3>
            <p>{description}</p>
        </article>
    );
};

export default AnimalCard;