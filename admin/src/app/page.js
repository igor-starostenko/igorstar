// app/page.js — shell: top bar (env + localhost-only notice) + type tabs.
import Link from 'next/link';
import { CONTENT_TYPES } from '@/lib/models';
import { resolveEnv, hasPat } from '@/lib/contentful';

export const dynamic = 'force-dynamic';

const TYPE_LABEL = {
  post: 'Posts',
  page: 'Pages',
  gallery: 'Gallery',
  feed: 'Feed',
};

export default function Home() {
  let env = 'master';
  try {
    env = resolveEnv();
  } catch {
    // unconfigured — still render the shell
  }
  const pat = hasPat();
  return (
    <>
      <div className="topbar">
        <h1>igorstar admin</h1>
        <span className="env">env: {env}</span>
        {!pat && (
          <span className="env">
            delivery-only token (reads work, writes need CONTENTFUL_PAT)
          </span>
        )}
        <span className="lock">localhost-only · never deployed</span>
      </div>
      <div className="tabs">
        {CONTENT_TYPES.map((t) => (
          <Link key={t} href={`/${t}`}>
            {TYPE_LABEL[t] || t}
          </Link>
        ))}
      </div>
      <div className="list dim" style={{ paddingTop: 40 }}>
        Select a content type above. Portal covers the four live content types;
        fields mirror the live Contentful model (fetched 2026-08-22).
      </div>
    </>
  );
}
