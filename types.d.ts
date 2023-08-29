type Fish = {
  id: number;
  name: string;
  url: string;
  img_src_set: {
    '1.5x': string;
    '2x': string;
  };
  meta: {
    conservation_status: string;
    scientific_classification: {
      kingdom: string;
      phylum: string;
      class: string;
      order: string;
      family: string;
      genus: string;
      species: string;
    };
    binomial_name: string;
  };
};
