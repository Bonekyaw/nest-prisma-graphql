import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { User } from './decorators/user.decorator';
import { Login } from './model/login.model';
import { Register } from './model/register.model';
import { Confirm } from './model/confirm.model';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { VerifyInput } from './dto/verify.input';
import { ConfirmInput } from './dto/confirm.input';

@Throttle({
  short: { ttl: 60000, limit: 3 },
  long: { limit: 30, ttl: 60000 * 60 * 24 },
})
@Public()
@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => Login)
  async login(@Args('loginInput') loginInput: LoginInput, @User() user) {
    return this.authService.login(user);
  }

  @Mutation(() => Register)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => Register)
  async verify(@Args('verifyInput') verifyInput: VerifyInput) {
    return this.authService.verify(verifyInput);
  }

  @Mutation(() => Confirm)
  async confirm(@Args('confirmInput') confirmInput: ConfirmInput) {
    return this.authService.confirm(confirmInput);
  }
}
