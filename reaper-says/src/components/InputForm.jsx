export default function InputForm({ name, setName, birthdate, setBirthdate, onSubmit }) {
    return (
        <div className="input-form">
            <div className="form-group">
                <label htmlFor="name-input">Your Full Name</label>
                <input
                    id="name-input"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="birthdate-input">Date of Birth</label>
                <input
                    id="birthdate-input"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
            </div>

            <button onClick={onSubmit}>Discover your fate</button>
        </div>
    );
}
