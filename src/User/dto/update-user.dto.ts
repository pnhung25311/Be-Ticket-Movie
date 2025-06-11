export class UpdateUserDto {
  name: string;
  email: string;
  password: string; // sẽ được hash trước khi lưu
  phone?: string;
  role?: string;
}
