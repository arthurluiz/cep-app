import { useEffect, useState, Suspense } from 'react';
import AddressForm from '../../components/AddressForm';
import getAddressByCep from '../../services/getAddressByCep';
import getCitiesByState from '../../services/getCitiesByState';
import getStates from '../../services/getStates';
import { Address } from '../../interfaces/Address';
import LoadingSuspense from '../../components/LoadingSuspense';

const formData = [
  { id: 'cep', label: 'CEP', value: '' },
  { id: 'uf', label: 'Estado', value: '' },
  { id: 'localidade', label: 'Cidade', value: '' },
  { id: 'logradouro', label: 'Logradouro', value: '' },
  { id: 'complemento', label: 'Complemento', value: '' },
  { id: 'bairro', label: 'Bairro', value: '' },
];

const MainPage = () => {
  const [formValues, setFormValues] = useState<Address>();
  const [addressData, setAddressData] = useState(formData);
  const [allStates, setAllStates] = useState<any>();
  const [cities, setCities] = useState<any>();

  const fetchStatesData = async () => {
    try {
      const states = await getStates();
      setAllStates(states);
    } catch (error) {
      console.error('Erro ao buscar os estados:', error);
    }
  };

  const fetchAddressData = async () => {
    try {
      if (formValues?.cep) {
        const data = await getAddressByCep(formValues.cep);
        setAddressData(prevData =>
          prevData.map(field => ({
            ...field,
            value: data[field.id as keyof typeof data] || '',
          }))
        );

        const citiesData = await getCitiesByState(data.uf);
        setCities(citiesData);
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  useEffect(() => {
    fetchAddressData();
    fetchStatesData();
  }, [formValues?.cep]);

  useEffect(() => {
    const fillSelectCities = async (state: string) => {
      const citiesData = await getCitiesByState(state);
      setCities(citiesData);
    };

    if (formValues?.uf) {
      fillSelectCities(formValues.uf);
    }
  }, [formValues?.uf]);

  return (
    <div>
      <Suspense fallback={<LoadingSuspense />}>
        <AddressForm
          formData={addressData}
          states={allStates}
          citiesByState={cities}
          onHandleForm={setFormValues}
        />
      </Suspense>
    </div>
  );
};

export default MainPage;
