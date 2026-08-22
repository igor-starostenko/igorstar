'use client';
// Edit/create form for one entry, driven by the field model (lib/models.js).
//
// Flow (spec §6): edit -> preflight (confirm:false) -> confirmation dialog
// with diff -> confirm (confirm:true, version) -> success/error banner.
// Asset fields upload via POST /api/assets (sharp-processed, published).
// RichText is edited as plain text in the MVP and serialized to a minimal
// Contentful RichText Document (paragraphs) on save.

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fieldsFor, addableFields } from '@/lib/models';

// --- RichText <-> plain text (MVP: paragraphs only) -----------------------
function docToPlainText(doc) {
  if (!doc || typeof doc === 'string') return String(doc || '');
  const out = [];
  const walk = (block) => {
    if (!block) return;
    if (block.nodeType === 'paragraph' || block.nodeType === 'heading-2') {
      const text = (block.content || []).map((n) => n.value || '').join('');
      if (text.trim()) out.push(text);
    }
  };
  (doc.content || []).forEach((b) => walk(b));
  return out.join('\n\n');
}

function plainToDoc(text) {
  const blocks = String(text || '')
    .split(/\n{2,}/)
    .map((block) =>
      block
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => ({ nodeType: 'text', value: line, marks: [] }))
    )
    .filter((content) => content.length);
  return {
    nodeType: 'document',
    content: blocks.length
      ? blocks.map((content) => ({ nodeType: 'paragraph', content }))
      : [{ nodeType: 'paragraph', content: [] }],
  };
}

// --- field value <-> form state ------------------------------------------
function toFormValue(field, value) {
  if (value === undefined || value === null) return null;
  switch (field.type) {
    case 'date':
      return typeof value === 'string'
        ? value.replace('T', ' ').slice(0, 16)
        : new Date(value).toISOString().slice(0, 16);
    case 'array':
      return Array.isArray(value) ? value.join(', ') : String(value);
    case 'richtext':
      return docToPlainText(value);
    case 'boolean':
      return Boolean(value);
    case 'integer':
      return value;
    case 'location':
      return {
        latitude: value?.latitude ?? '',
        longitude: value?.longitude ?? '',
      };
    case 'asset':
    case 'entryLinks':
      return value;
    case 'assetArray':
      return Array.isArray(value) ? value : [];
    default:
      return typeof value === 'string' ? value : JSON.stringify(value);
  }
}

function fromFormValue(field, value) {
  if (value === null || value === undefined || value === '') return undefined;
  switch (field.type) {
    case 'date':
      return new Date(value).toISOString();
    case 'array':
      return String(value)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    case 'richtext':
      return plainToDoc(value);
    case 'boolean':
      return Boolean(value);
    case 'integer':
      return Number.isFinite(value) ? Math.trunc(value) : undefined;
    case 'location':
      if (value.latitude === '' && value.longitude === '') return undefined;
      return {
        latitude: Number(value.latitude),
        longitude: Number(value.longitude),
      };
    default:
      return value;
  }
}

function AssetUpload({ field, value, onChange, type }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const isMultiple = field.type === 'assetArray';
  const current = isMultiple ? value || [] : [value].filter(Boolean);

  const upload = async (file) => {
    setBusy(true);
    setErr(null);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('target', type);
      form.append('confirm', 'true');
      const res = await fetch('/api/assets', { method: 'POST', body: form });
      const json = await res.json();
      if (!res.ok || !json.ok)
        throw new Error(json.error || `HTTP ${res.status}`);
      const link = json.asset.link;
      onChange(isMultiple ? [...(value || []), link] : link);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
      {current.map((a, i) => (
        <div key={i} className="hint">
          #{a.sys.id}
          {isMultiple && (
            <button
              type="button"
              className="btn danger"
              style={{ padding: '2px 8px' }}
              onClick={() => onChange(current.filter((_, j) => j !== i))}
            >
              remove
            </button>
          )}
        </div>
      ))}
      {err && <div className="err">{err}</div>}
      {busy && <div className="hint">processing &amp; uploading…</div>}
    </div>
  );
}

export default function EditPage({ mode }) {
  const { type, id } = useParams();
  const schema = useMemo(() => fieldsFor(type), [type]);
  const addable = useMemo(() => new Set(addableFields(type)), [type]);
  // /:type/new is a static segment, so useParams() carries no `id` there —
  // create intent comes from the `mode` prop (or a direct id === 'new' URL).
  const isCreate = id === 'new' || mode === 'create';

  const [form, setForm] = useState({});
  const [status, setStatus] = useState(null); // {kind: 'ok'|'error'|'info', text}
  const [dialog, setDialog] = useState(null); // {kind: 'write'|'diff', ...}
  const [loading, setLoading] = useState(!isCreate);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/entries/${type}/${id}`, {
        cache: 'no-store',
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
      const f = {};
      for (const field of schema) {
        f[field.name] = toFormValue(
          field,
          json.fields[field.name] ?? json.rawFields?.[field.name]
        );
      }
      setForm(f);
      if (
        json.snapshot &&
        (json.snapshot.added.length ||
          json.snapshot.removed.length ||
          json.snapshot.changed.length)
      ) {
        setDialog({ kind: 'diff', diff: json.snapshot });
      }
    } catch (e) {
      setStatus({ kind: 'error', text: e.message });
    } finally {
      setLoading(false);
    }
  }, [type, id, schema]);

  useEffect(() => {
    if (!isCreate) load();
  }, [isCreate, load]);

  const setField = (name, v) => setForm((f) => ({ ...f, [name]: v }));

  const buildPayload = () => {
    const payload = {};
    for (const field of schema) {
      if (!addable.has(field.name) && field.type !== 'entryLinks') continue; // edit-only non-link fields: send through on edit
      if (isCreate && !addable.has(field.name)) continue;
      const v = fromFormValue(field, form[field.name]);
      if (v !== undefined) payload[field.name] = v;
    }
    // entryLinks (post.recommendations) are edit-only (spec §2): the field is
    // hidden from the form and omitted from every write — CMA full-body
    // updates preserve it because we never overwrite it.
    delete payload.recommendations;
    return payload;
  };

  const doSave = async (confirm) => {
    const url = isCreate
      ? `/api/entries/${type}`
      : `/api/entries/${type}/${id}`;
    const method = isCreate ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...buildPayload(), confirm }),
    });
    return res.json().then((json) => ({ status: res.status, json }));
  };

  const onSave = async () => {
    setStatus(null);
    try {
      const pre = await doSave(false);
      if (!pre.json.ok) {
        setStatus({
          kind: 'error',
          text: (pre.json.errors || [pre.json.error]).join('; '),
        });
        return;
      }
      setDialog({ kind: 'write', version: pre.json.version });
    } catch (e) {
      setStatus({ kind: 'error', text: e.message });
    }
  };

  const onConfirmWrite = async () => {
    setDialog(null);
    try {
      const out = await doSave(true);
      if (!out.json.ok) throw new Error(out.json.error || `HTTP ${out.status}`);
      setStatus({
        kind: 'ok',
        text: `Saved. ${isCreate ? `Created ${type} ${out.json.body.sys.id}.` : `Published ${type} (v${out.json.body.sys.version}).`}`,
      });
      if (isCreate) {
        window.location.href = `/${type}`;
      }
    } catch (e) {
      setStatus({ kind: 'error', text: e.message });
    }
  };

  if (loading) return <div className="list dim">Loading…</div>;

  return (
    <div className="list">
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Link href={`/${type}`} className="btn">
          ← {type} list
        </Link>
        <span className="dim">
          {isCreate ? `New ${type}` : `Edit ${type} ${id}`}
        </span>
      </div>

      {status && <div className={`banner ${status.kind}`}>{status.text}</div>}

      <div className="field">
        {schema.map((field) => {
          const v = form[field.name];
          const label = field.name;
          const required = field.required && addable.has(field.name);
          const labelId = `f-${type}-${label}`;
          return (
            <div key={label} className="field">
              <label htmlFor={labelId}>
                {label}
                {required ? ' *' : ''}
                {!addable.has(field.name) && (
                  <span className="dim"> (existing only)</span>
                )}
              </label>
              {field.type === 'boolean' ? (
                <input
                  id={labelId}
                  type="checkbox"
                  checked={Boolean(v)}
                  onChange={(e) => setField(label, e.target.checked)}
                />
              ) : field.type === 'asset' || field.type === 'assetArray' ? (
                <AssetUpload
                  field={field}
                  value={v}
                  onChange={(nv) => setField(label, nv)}
                  type={type === 'page' ? 'post' : type}
                />
              ) : field.type === 'richtext' ? (
                <textarea
                  id={labelId}
                  value={v ?? ''}
                  onChange={(e) => setField(label, e.target.value)}
                />
              ) : field.type === 'location' ? (
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    id={labelId}
                    type="number"
                    step="any"
                    placeholder="lat"
                    value={v?.latitude ?? ''}
                    onChange={(e) =>
                      setField(label, { ...v, latitude: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    step="any"
                    placeholder="lng"
                    value={v?.longitude ?? ''}
                    onChange={(e) =>
                      setField(label, { ...v, longitude: e.target.value })
                    }
                  />
                </div>
              ) : field.type === 'entryLinks' ? (
                <span className="hint">
                  edit-only (spec §2) — existing links are preserved
                  automatically; managed in Contentful Web
                </span>
              ) : field.type === 'date' ? (
                <input
                  id={labelId}
                  type="datetime-local"
                  value={v ?? ''}
                  onChange={(e) => setField(label, e.target.value)}
                />
              ) : (
                <input
                  id={labelId}
                  value={v ?? ''}
                  onChange={(e) => setField(label, e.target.value)}
                />
              )}
              {field.note && <span className="hint">{field.note}</span>}
            </div>
          );
        })}
      </div>

      <button className="btn primary" onClick={onSave}>
        {isCreate ? 'Create' : 'Publish changes'}
      </button>

      {dialog?.kind === 'diff' && (
        <div className="confirm-dialog">
          <div className="box">
            <h3>Local snapshot detected — changes since last local save</h3>
            <pre>{JSON.stringify(dialog.diff, null, 2)}</pre>
            <div className="actions">
              <button className="btn" onClick={() => setDialog(null)}>
                Continue editing
              </button>
            </div>
          </div>
        </div>
      )}
      {dialog?.kind === 'write' && (
        <div className="confirm-dialog">
          <div className="box">
            <h3>Confirm write to Contentful</h3>
            <p className="dim">
              {isCreate
                ? 'This creates a new entry'
                : 'This updates the entry (full-body)'}{' '}
              and publishes it in the target environment.
            </p>
            <div className="actions">
              <button className="btn" onClick={() => setDialog(null)}>
                Cancel
              </button>
              <button className="btn primary" onClick={onConfirmWrite}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
