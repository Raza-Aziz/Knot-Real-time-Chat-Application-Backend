import { Injectable } from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient<any, 'public'>;

  constructor(private configService: ConfigService) {
    this.client = createClient(
      this.configService.get('DATABASE_URL'),
      this.configService.get('SUPABASE_ANON_KEY'),
    );
  }
}
