/**
https://francetravail.io/produits-partages/catalogue/romeo-2
*/

type ExtractJobResult = {
    job: string;
};

async function extractJob(text: string): Promise<ExtractJobResult> {
    return {
        job: "job",
    };
}
