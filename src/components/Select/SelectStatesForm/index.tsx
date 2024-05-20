import { useMemo, useState } from "react";
import { State } from "../../../interfaces/State";

interface SelectProps {
    value: string;
    onChange: (value: any) => void;
    fileds: State[] | undefined;
}

const SelectStatesForm = ({ value, onChange, fileds }: SelectProps) => {
    const [selectedState, setSelectedState] = useState<string>()

    useMemo(() => {
        setSelectedState(value)
    }, [value])

    return (
        <select
            defaultValue="Selecione..."
            value={selectedState}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Selecione o estado</option>
            {fileds && fileds.map((filed) => (
                <option key={filed.id} value={filed.sigla}>
                    {filed.nome}
                </option>
            ))}
        </select>
    );
}


export default SelectStatesForm;

