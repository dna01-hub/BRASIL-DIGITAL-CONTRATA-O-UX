import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://prjjupuezxxyaknvgtvf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByamp1cHVlenh4eWFrbnZndHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTY5MjYsImV4cCI6MjA4ODQzMjkyNn0.YOFyzSZ5KosM_Lc-Iwhvph0x5dJp8Bo0wsJYi_tfbIs';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
