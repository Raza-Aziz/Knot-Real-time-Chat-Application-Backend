import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignupDto } from './dto/signup.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
