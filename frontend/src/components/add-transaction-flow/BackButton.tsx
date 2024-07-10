import { Button } from "../ui/button";

export function BackButton({
    onClick,
}: {
    onClick: () => void;
}) {
    return (<div>
        <Button onClick={onClick} variant="outline">
            {"<= חזרה"}
        </Button>
    </div>);
}
