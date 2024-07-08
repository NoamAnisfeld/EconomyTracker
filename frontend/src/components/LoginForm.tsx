import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, type FormEventHandler } from "react"

export interface LoginDetails {
    username: string,
}

export interface LoginFormProps {
    onSubmit: (loginDetails: LoginDetails) => void,
}

export default function LoginForm({
    onSubmit
}: LoginFormProps) {
    const [inputUsername, setInputUsername] = useState('');

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (inputUsername) {
            onSubmit({
                username: inputUsername,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader>
                    <CardDescription>
                        Please insert your name to enter the system.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        required
                        autoFocus
                        value={inputUsername}
                        onChange={e => setInputUsername(e.target.value)}
                    />
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Enter</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
