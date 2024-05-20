interface City {
    id: number;
    nome: string;
    estado: {
      id: number;
      sigla: string;
      nome: string;
      regiao: {
        id: number;
        sigla: string;
        nome: string;
      };
    };
  }
  
  const getCitiesByState = async (uf: string): Promise<City[]> => {
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`);
      if (!response.ok) {
        throw new Error('Não foi possível obter a lista de cidades.');
      }
      const data: City[] = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      throw error;
    }
  };
  
  export default getCitiesByState;
  