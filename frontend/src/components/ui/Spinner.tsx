import { Slot } from "@radix-ui/react-slot"

export default function Spinner() {
    return (
        <Slot>
            <img src={"/assets/spinner.svg"} alt="loading" />
        </Slot>
    )
}