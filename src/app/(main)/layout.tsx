import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
            {children}
        </div>
    </div>
}