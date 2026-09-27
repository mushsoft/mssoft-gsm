import { readFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

const env = await readFile('.env.local', 'utf8');
const get = (key) => env.split(/\r?\n/).find((l) => new RegExp(`^\\s*${key}\\s*=`).test(l))
  ?.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '');

const supabase = createClient(get('NEXT_PUBLIC_SUPABASE_URL'), get('SUPABASE_SERVICE_ROLE_KEY'), {
  auth: { autoRefreshToken: false, persistSession: false },
});

const email = 'musakalungi2019@gmail.com';

const { data: existing } = await supabase.auth.admin.listUsers();
let user = existing?.users.find((u) => u.email === email);

if (!user) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
    app_metadata: { role: 'admin' },
  });
  if (error) {
    console.error('Failed to create user:', error.message);
    process.exit(1);
  }
  user = data.user;
  console.log('Created admin user', user.id, user.email);
} else {
  const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, role: 'admin' },
  });
  if (error) {
    console.error('Failed to update user role:', error.message);
    process.exit(1);
  }
  user = data.user;
  console.log('Updated existing user to admin role', user.id, user.email);
}

const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
  type: 'recovery',
  email,
  options: { redirectTo: 'https://www.mssoft-gsm.com/account/reset-password' },
});
if (linkError) {
  console.error('Failed to generate password-set link:', linkError.message);
  process.exit(1);
}

console.log('\nPassword-set link (valid once, expires per Supabase Auth settings):');
console.log(linkData.properties.action_link);
