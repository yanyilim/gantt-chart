import { InputText } from 'primereact/inputtext';

export const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>, filters: any, setFilters: any, setGlobalFilterValue: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};


