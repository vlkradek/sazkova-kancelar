import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="grid place-items-center w-full h-screen">
            <Link
                className="text-8xl bg-indigo-700 text-white rounded-2xl py-4 px-10 font-bold tracking-wide hover:bg-indigo-800 duration-150"
                href={`/match/id`}
            >
                Sázet
            </Link>
        </main>
    );
}
