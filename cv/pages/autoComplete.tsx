import React, { useState, useEffect, ChangeEvent } from 'react';

// Définir un type pour chaque métier
interface Metier {
    code: string;
    libelle: string;
}

const AutoComplete: React.FC = () => {
    const [metiers, setMetiers] = useState<Metier[]>([]);
    const [suggestions, setSuggestions] = useState<Metier[]>([]);
    const [input, setInput] = useState("");

    // Charger les métiers depuis le fichier JSON
    useEffect(() => {
        fetch('/metiers.json')
            .then(response => response.json())
            .then(data => setMetiers(data));
    }, []);

    // Fonction pour mettre à jour les suggestions
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        if (value) {
            // Filtrer sur le champ `libelle`
            setSuggestions(metiers.filter(metier =>
                metier.libelle.toLowerCase().includes(value.toLowerCase())
            ));
        } else {
            setSuggestions([]); // Réinitialiser les suggestions si l'input est vide
        }
    };

    // Fonction pour sélectionner une suggestion
    const handleSuggestionClick = (suggestion: Metier) => {
        setInput(suggestion.libelle); // Remplir l'input avec le libellé choisi
        setSuggestions([]); // Masquer les suggestions après le clic
    };

    return (
        <div className="flex flex-col gap-1 max-w-[50%] ">
            <label
                className="text-sm font-bold "
                htmlFor="type_emploi"
            >
                Type d&apos;emploi
                <input
                    type="text"
                    id="metier"
                    value={input}
                    onChange={handleChange}
                    placeholder="Commencez à taper..."
                    className="border border-black/10 p-2 bg-white rounded-md text-sm"
                    name ="metier"
                />
            </label>

            {suggestions.length > 0 && (
                <ul className="border border-gray-300 rounded mt-1 bg-white shadow-lg">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.code}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                            {suggestion.libelle}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
