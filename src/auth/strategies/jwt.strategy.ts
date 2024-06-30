import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminsService } from '../../admins/admins.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly adminsService: AdminsService,
    readonly configService: ConfigService,
  ) {
    super({
      // jwtFromRequest: ExtractJwt.fromExtractors([  // *** For frontend request ***
      //   (request: Request) => {
      //     return request.cookies?.access_token;
      //   },
      // ]),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    const admin = await this.adminsService.findById(payload.sub);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
