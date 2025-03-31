export default function Result({ name, result }) {
    if (!result) return null;

    return (
        <div className="result">
            <h2>{name}, your fate has been sealed.</h2>
            <p>Date of Death: {result.date.toLocaleDateString()}</p>
            <p>Cause: {result.cause}</p>
        </div>
    );
}