import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register/buyer')
  async registerBuyer(@Body() registerDto: Omit<RegisterDto, 'role'>) {
    return this.authService.register(registerDto, Role.BUYER);
  }

  @Post('register/vendor')
  async registerVendor(@Body() registerDto: Omit<RegisterDto, 'role'>) {
    return this.authService.register(registerDto, Role.VENDOR);
  }

  @Post('register/rider')
  async registerRider(@Body() registerDto: Omit<RegisterDto, 'role'>) {
    return this.authService.register(registerDto, Role.RIDER);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
