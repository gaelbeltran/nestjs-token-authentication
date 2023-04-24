import { HttpException, Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto) {
    const { password } = registerDto;
    const hashedPassword = await hash(password, 10);
    const payload = { ...registerDto, password: hashedPassword };
    const createdUser = await this.usersService.create(payload);
    return createdUser;
  }

  async login(loginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOne({ email: email });
    if (!user) throw new HttpException('NOT_FOUND', 404);

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new HttpException('INVALID_PASSWORD', 403);

    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
