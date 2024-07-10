
export function SelectYear({
    year, onSelected,
}: {
    year: number;
    onSelected: (value: number) => void;
}) {
    return (
        <select required onChange={e => onSelected(Number(e.target.value))}>
            {[...Array(10)].map((_, i) => <option
                key={i}
                value={new Date().getFullYear() - i}
                selected={year === new Date().getFullYear() - i}
            >
                {new Date().getFullYear() - i}
            </option>
            )}
        </select>
    );
}
