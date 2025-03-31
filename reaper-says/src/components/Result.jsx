export default function Result({ name, result }) {
    if (!result) return null;

    const formatDateUTC = (date) => {
        return date.toLocaleDateString('en-GB', { timeZone: 'UTC' });
    };

    return (
        <div className="result">
            <h2>{name}, your fate has been sealed.</h2>
            <p>Date of Death: {result.date instanceof Date ? formatDateUTC(result.date) : result.date}</p>
            <p>Cause: {result.cause}</p>
        </div>
    );
}
