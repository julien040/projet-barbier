/**
Utilisation de chatgpt pour récupérer la ville du candidat
*/

type ExtractCityResult = {
    city: string;
};

async function extractCity(text: string): Promise<ExtractCityResult> {
    return {
        city: "job",
    };
}
