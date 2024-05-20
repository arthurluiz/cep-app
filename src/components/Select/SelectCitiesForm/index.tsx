import { useMemo, useState } from "react";
import { Cities } from "../../../interfaces/Cities";

interface SelectProps {
    value: string;
    onChange: (value: any) => void;
    fileds: Cities[] | undefined;
}

const SelectCitiesForm = ({ value, onChange, fileds }: SelectProps) => {
    const [selectedCity, setSelectedCity] = useState<string>()

    useMemo(() => {
        setSelectedCity(value)
    }, [value])

    return (
        <select
            value={selectedCity}
            onChange={e => { 
                setSelectedCity(e.target.value)
                onChange(e.target.value)
            }}
        >
            <option value="">Selecione uma cidade</option>
            {fileds && fileds.map((filed) => (
                <option key={filed.id} value={filed.nome}>
                    {filed.nome}
                </option>
            ))}
        </select>
    )
}


export default SelectCitiesForm;
