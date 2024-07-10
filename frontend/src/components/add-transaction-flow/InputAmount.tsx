import { Input } from "../ui/input";

export function InputAmount({
    value, onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) {
    return <Input
        type="number"
        required
        min={0}
        max={1000000000}
        value={value || ''}
        placeholder="סכום"
        onChange={e => onChange(Number(e.target.value))} />;
}
