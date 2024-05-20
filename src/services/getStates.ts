interface State {
    id: number;
    sigla: string;
    nome: string;
    regiao: {
      id: number;
      sigla: string;
      nome: string;
    };
  }
  
  const getStates = async (): Promise<State[]> => {
    try {
      const response: Response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      if (!response.ok) {
        throw new Error('Não foi possível obter a lista de estados.');
      }
      const data: State[] = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      throw error;
    }
  };
  
  export default getStates;
  