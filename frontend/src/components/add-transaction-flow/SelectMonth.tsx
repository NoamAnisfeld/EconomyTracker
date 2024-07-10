export function SelectMonth({
    month, year, onSelected,
}: {
    month: number;
    year: number;
    onSelected: (value: number) => void;
}) {
    const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

    return (
        <select required onChange={e => onSelected(Number(e.target.value))}>
            {monthNames.map((monthName, i) => <option
                key={i + 1}
                value={i + 1}
                selected={month === i + 1}
                disabled={year === new Date().getFullYear() && i > new Date().getMonth()}
            >
                {monthName}
            </option>
            )}
        </select>
    );
}
