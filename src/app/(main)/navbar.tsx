"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png"
import { UserButton } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
export default function Navbar() {
    const {theme} = useTheme();
    return <header className="shadow-sm">
        <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-3">
            <Link href="/resumes" className="flex items-center gap-2">
                <Image src={logo} alt="logo" width={35} height={35} className="rounded-full" />
                <span className="text-xl font-bold tracking-tight">AI Powered ATS Resume Builder</span>
            </Link>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <UserButton
                appearance={{
                    baseTheme: theme === "dark" ? dark : undefined,
                    elements: {
                        avatarBox: {
                            width: 35,
                            height: 35,
                        }
                    }
                }}
            >
                <UserButton.MenuItems>
                    <UserButton.Link
                        label="Billing"
                        labelIcon={<CreditCardIcon className="size-4" />}
                        href="/billing">
                    </UserButton.Link>
                </UserButton.MenuItems>
            </UserButton>
            </div>
            
        </div>
    </header>
}