interface Address {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
  }
  
  const getAddressByCep = async (cep: string): Promise<Address> => {
    try {
      const response: Response = await fetch(`https://opencep.com/v1/${cep}`);
      if (!response.ok) {
        throw new Error('Não foi possível obter o endereço.');
      }
      const data: Address = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      throw error;
    }
  };
  
  export default getAddressByCep;
  