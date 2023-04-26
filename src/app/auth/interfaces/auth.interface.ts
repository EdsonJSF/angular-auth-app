export interface AuthResponse {
  ok:   boolean;
  msg:  string;
  data?: Usuario;
  token?:  string;
}

export interface Usuario {
  id:     string;
  mail:  string;
  name:   string;
}