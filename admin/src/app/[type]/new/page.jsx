import EditPage from '../edit';

export const dynamic = 'force-dynamic';

export default function NewPage() {
  // Static `new` segment — useParams() has no `id` here, so create intent
  // must be explicit (EditPage falls back to id === 'new' for direct URLs).
  return <EditPage mode="create" />;
}
