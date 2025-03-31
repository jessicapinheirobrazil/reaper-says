export default function InputForm({ name, setName, birthdate, setBirthdate, onSubmit }) {
    const handleNameChange = (e) => {
        // Permite apenas letras e espaços, removendo números
        const newName = e.target.value.replace(/[0-9]/g, ''); 
        setName(newName);
    };

    const handleKeyPress = (e) => {
        // Impede a digitação de números
        if (/[0-9]/.test(e.key)) {
            e.preventDefault();  // Previne a digitação do número
        }
    };

    return (
        <div className="input-form">
            <div className="form-group">
                <label htmlFor="name-input">Your Full Name</label>
                <input
                    id="name-input"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={handleNameChange}
                    onKeyPress={handleKeyPress}  // Chama a função para bloquear números na digitação
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
