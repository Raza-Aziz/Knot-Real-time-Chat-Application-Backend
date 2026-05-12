import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignupDto } from './dto/signup.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@supabase/supabase-js';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  // INFO : Signup service
  // TODO : Understand and document its working (and maybe make an algo or flowchart) to make it framework-agnostic
  async signUp(dto: SignupDto) {
    // 1. Create User in Supabase Auth
    const { data, error } = await this.supabase.client.auth.signUp({
      email: dto.email,
      password: dto.password,
    });

    if (error) throw new BadRequestException(error.message);
    if (!data.user) throw new BadRequestException('Signup Failed');

    const supabaseUser: User = data.user;

    // Added optional (?) in email cause User dtype doesn't require email (it has email as optional)
    const { id, email }: { id: string; email?: string } = supabaseUser;

    try {
      const newUser = await this.prisma.user.create({
        data: {
          id,
          email,
          displayName: dto.displayName || email.split('@')[0],
        },
      });

      return { user: newUser, session: data.session };
    } catch (dbError) {
      console.error(dbError);
      throw new BadRequestException(`Profile Sync failed: ${dbError}`);
    }
  }

  // INFO : Login service
  // TODO : Understand and document its working (and maybe make an algo or flowchart) to make it framework-agnostic
  async login(dto: LoginDto) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) throw new BadRequestException(error.message);
    if (!data.user) throw new BadRequestException('Signup Failed');

    const userProfile = await this.prisma.user.findUnique({
      where: { id: data.user.id },
    });

    // if (!userProfile) return UnauthorizedException('Profile not found');
    if (!userProfile) throw new NotFoundException('Profile not found');

    return {
      user: userProfile,
      session: data.session,
    };
  }
}
