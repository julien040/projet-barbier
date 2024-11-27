import React, { useState, useEffect, ChangeEvent } from 'react';

// Définition de l'interface pour les données de ville
interface Ville {
    Code_commune_INSEE: number;
    Nom_commune: string,
    Code_postal: number;
    Libelle_acheminement: string;
    Ligne_5: string;
    coordonnees_gps: string;
}

const AutoCompleteCities: React.FC = () => {
    const [villes, setVilles] = useState<Ville[]>([]);  // Liste des villes initialisée comme un tableau vide
    const [suggestions, setSuggestions] = useState<Ville[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetch('/france.json')
            .then(response => response.json())
            .then(data => setVilles(data));
    }, []);

    // Fonction pour mettre à jour les suggestions
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (value.length >= 1) {  // Début de la suggestion dès 1 caractère
            const filteredSuggestions = villes
                .filter(ville =>
                    ville.Nom_commune.toLowerCase().startsWith(value.toLowerCase())
                )
                .slice(0, 5);  // Limite à 5 résultats

            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion: Ville) => {
        setInput(suggestion.Nom_commune);
        setSuggestions([]);  // Ferme la liste après sélection
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            <label
                className="text-sm font-bold"
                htmlFor="emplacement"
            >Emplacement</label>
            <input
                type="text"
                id="emplacement"
                value={input}
                placeholder="Pau, Pyrénées-Atlantiques"
                className="border border-black/10 p-2 bg-white rounded-md text-sm"
                name="emplacement"
                onChange={handleChange}
            />
            {suggestions.length > 0 && (
                <ul className="border border-gray-300 rounded mt-1 bg-white shadow-lg">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.Code_commune_INSEE}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                            {suggestion.Nom_commune} ({suggestion.Code_postal})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoCompleteCities;
