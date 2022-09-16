import Head from 'next/head'
import prisma from '../utils/prisma';
import Guestbook from '../components/guestbook'

export default function GuestbookPage({ fallbackData }) {
  return (
    <div>
    <Head>
      <title>Hey</title>
    </Head>
        <h1>
          Guestbook.
        </h1>
        <Guestbook fallbackData={fallbackData} />
      </div>
  )
}

export async function getStaticProps() {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  });

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    updated_at: entry.updated_at.toString(),
    created_by: entry.created_by.toString()
  }));

  return {
    props: {
      fallbackData
    },
    revalidate: 60
  };
}
