import React, { useEffect, useState } from 'react';
import { Address } from '../../interfaces/Address';
import { State } from '../../interfaces/State';
import { Cities } from '../../interfaces/Cities';
import InputForm from '../InputForm';
import SelectStatesForm from '../Select/SelectStatesForm';
import SelectCitiesForm from '../Select/SelectCitiesForm';
import './index.css';

interface FormField {
    id: string;
    label: string;
    value: string;
    states?: State[];
}

interface AddressFormProps {
    formData: FormField[];
    onHandleForm: (addressData: Address) => void;
    states: State[];
    citiesByState: Cities[];
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, onHandleForm, states, citiesByState }) => {
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleInputChange = (id: string, value: string) => {
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    useEffect(() => {
        if (formValues) {
            const addressData: Address = {
                cep: formValues.cep || '',
                logradouro: formValues.logradouro || '',
                complemento: formValues.complemento || '',
                bairro: formValues.bairro || '',
                localidade: formValues.localidade || '',
                uf: formValues.uf || ''
            };
            onHandleForm(addressData);
        }
    }, [formValues]);

    return (
        <form className="address-form">
            {formData.map((data) => (
                <div key={`${data.id}-container`}>
                    {data.id === 'uf' || data.id === 'localidade' ? (
                        <>
                            <label style={{ marginTop: '20px' }} htmlFor={data.id}>{data.label}</label>
                            {
                                data.id === 'uf'
                                    ? <SelectStatesForm value={data.value} fileds={states} onChange={(value) => handleInputChange(data.id, value)} />
                                    : <SelectCitiesForm value={data.value} fileds={citiesByState} onChange={(value) => handleInputChange(data.id, value)} />
                            }

                        </>
                    ) : (
                        <>
                            <label style={{ marginTop: '16px' }} htmlFor={data.id}>{data.label}</label>
                            <InputForm
                                key={`${data.id}-input`}
                                value={data.value}
                                onChange={(newValue) => handleInputChange(data.id, newValue)}
                            />
                        </>
                    )}
                </div>
            ))}
        </form>
    );
};

export default AddressForm;
