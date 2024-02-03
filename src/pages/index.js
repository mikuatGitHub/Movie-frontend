import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

                        <Link
                            href="/home"
                            className="ml-4 text-sm text-gray-700 underline">
                            Home
                        </Link>

        </>
    )
}
