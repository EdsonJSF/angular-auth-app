export interface AuthResponse {
  ok:   boolean;
  msg:  string;
  data?: Usuario;
}

export interface Usuario {
  id:     string;
  mail?:  string;
  name:   string;
  token:  string;
}