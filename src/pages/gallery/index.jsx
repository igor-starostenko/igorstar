import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function GalleryRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/gallery/page/1');
  }, [router]);

  return <div>Loading...</div>;
}
