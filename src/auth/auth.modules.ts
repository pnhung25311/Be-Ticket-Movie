import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Module({
  providers: [AuthService],
  exports: [AuthService],  // ⚠️ PHẢI EXPORT để module khác dùng được!
})
export class AuthModule {}
