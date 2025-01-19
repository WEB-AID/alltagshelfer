import Image from 'next/image'

export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Image
                src="/spin.svg"
                alt="Plant logo"
                width={300}
                height={300}
                className="mx-auto animate-spin-pause"
            />
        </div>
    )
}
