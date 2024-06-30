import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const {
      loginInput: { phone, password },
    } = ctx.getArgs();
    gqlReq.body.phone = phone;
    gqlReq.body.password = password;
    return gqlReq;
  }
}
