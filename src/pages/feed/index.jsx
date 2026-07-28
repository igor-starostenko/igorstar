import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function FeedRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/feed/1');
  }, [router]);

  return <div>Loading...</div>;
}
