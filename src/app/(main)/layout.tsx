import Navbar from "./navbar";
import PremiumModal from "@/components/premium/PremiumModal";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
                {children}
                <PremiumModal />
        </div>
    )
}