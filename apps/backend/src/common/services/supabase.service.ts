import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    }
    else {
      throw new Error('Supabase用の環境変数が設定されていません。'
        + '<SUPABASE_URL>と<SUPABASE_KEY>を確認してください。');
    }
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}