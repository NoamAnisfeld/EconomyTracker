import { createFileRoute } from "@tanstack/react-router";
import Panel from "@/components/Panel";

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {

    return (<>
        <Panel />
    </>)
}