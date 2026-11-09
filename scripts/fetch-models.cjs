const fs = require('fs');
const { createClient } = require('contentful');
require('dotenv').config();
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const tk = Object.keys(process.env).find((k) => k.startsWith('CONTENTFUL_ACC'));
(async () => {
  const c = createClient({ space: spaceId, accessToken: process.env[tk] });
  const ct = await c.getContentTypes();
  const types = ct.items.map((t) => ({
    id: t.sys.id,
    name: t.name,
    fields: (t.fields || []).map((f) => ({
      id: f.id,
      type: f.type,
      required: !!f.required,
      linkType: f.linkType || null,
    })),
  }));
  fs.writeFileSync(
    '/workspace/igorstar/scripts/content-models.json',
    JSON.stringify({ types }, null, 2)
  );
  console.log('WROTE —', types.length, 'content types');
  process.exit(0);
})().catch((e) => {
  console.log('ERR', e.message);
  process.exit(1);
});
