import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock } from "lucide-react";

export default function PendingPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <Card className="w-[450px] shadow-xl glass text-center">
                <CardHeader>
                    <div className="mx-auto bg-yellow-100 p-4 rounded-full mb-4">
                        <Clock className="w-12 h-12 text-yellow-600" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">Account Pending Approval</CardTitle>
                    <CardDescription className="text-base mt-2">
                        Your account has been created successfully and is currently awaiting administrator approval.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-600">
                        You will be able to log in once an admin reviews and approves your registration. Please check back later.
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                        <Link href="/login">Return to Login</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
