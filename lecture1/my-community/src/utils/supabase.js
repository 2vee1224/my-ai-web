import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwgvfkfbwplfmiqkvgqf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3Z3Zma2Zid3BsZm1pcWt2Z3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjI4NjQsImV4cCI6MjA4NzA5ODg2NH0.1gfX13AnBoby21_0Apz19yEmwvWpyWnkEtK7bibR1UQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
