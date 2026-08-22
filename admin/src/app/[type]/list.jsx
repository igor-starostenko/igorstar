'use client';
// Entry list for one content type. Fetches /api/entries/:type on mount.
// New entry -> /:type/new (edit form). Row click -> /:type/:id (edit form).

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

const ORDER_BY_TYPE = {
  post: ['fields.category', '-fields.date'],
  page: ['fields.title'],
  gallery: ['-fields.id'],
  feed: ['-fields.date'],
};

const COLUMN_BY_TYPE = {
  post: ['fields.title', 'fields.category', 'fields.path'],
  page: ['fields.title'],
  gallery: ['fields.id', 'fields.description'],
  feed: ['fields.date', 'fields.id'],
};

const TYPE_LABEL = {
  post: 'Posts',
  page: 'Pages',
  gallery: 'Gallery',
  feed: 'Feed',
};

export default function ListPage() {
  const { type } = useParams();
  const known = Object.prototype.hasOwnProperty.call(TYPE_LABEL, type);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(known);

  const load = useCallback(async () => {
    if (!known) return;
    setLoading(true);
    setError(null);
    try {
      const order = (ORDER_BY_TYPE[type] || []).join(',');
      const res = await fetch(
        `/api/entries/${type}${order ? `?order=${encodeURIComponent(order)}` : ''}`,
        { cache: 'no-store' }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [type, known]);

  useEffect(() => {
    load();
  }, [load]);

  if (!known)
    return (
      <div className="banner error" style={{ margin: '20px auto' }}>
        Unknown content type: <code>{type}</code>. Managed types: post, page,
        gallery, feed.
      </div>
    );
  if (loading)
    return <div className="list dim">Loading {TYPE_LABEL[type] || type}…</div>;
  if (error)
    return (
      <div className="banner error" style={{ margin: '20px auto' }}>
        {error}
      </div>
    );

  const cols = COLUMN_BY_TYPE[type] || [];
  const valueOf = (entry, col) => {
    const v = entry.fields[col.replace('fields.', '')];
    if (typeof v === 'string') return v;
    if (typeof v === 'number') return v;
    return v != null ? JSON.stringify(v) : '';
  };

  return (
    <div className="list">
      <div className="banner ok">
        {data.total} {TYPE_LABEL[type] || type} · live from Contentful ·{' '}
        <Link href={`/${type}/new`}>+ new {type}</Link>
      </div>
      <table>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{c.replace('fields.', '')}</th>
            ))}
            <th>status</th>
            <th>updated</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.entries.map((e) => (
            <tr key={e.id}>
              {cols.map((c) => (
                <td key={c}>
                  {valueOf(e, c) || <span className="dim">—</span>}
                </td>
              ))}
              <td>
                {e.published ? (
                  <span className="published">published</span>
                ) : (
                  <span className="draft">draft</span>
                )}
              </td>
              <td className="dim">
                {e.updatedAt ? new Date(e.updatedAt).toLocaleDateString() : '—'}
              </td>
              <td>
                <button
                  className="btn danger"
                  onClick={async () => {
                    if (
                      !window.confirm(
                        `Delete this ${type}? This cannot be undone.`
                      )
                    )
                      return;
                    const re = window.confirm(
                      'Confirm delete — this removes the entry from Contentful.'
                    );
                    if (!re) return;
                    await fetch(`/api/entries/${type}/${e.id}`, {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ confirm: true }),
                    });
                    load();
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
