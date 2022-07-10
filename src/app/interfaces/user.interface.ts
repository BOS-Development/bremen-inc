export interface User {
  id: string;
  accessToken: string;
  alliance: Alliance;
  code: string;
  corporation: Corporation;
  modified?: string;
  name: string;
  refreshToken: string;
  scopes: number;
}

interface Alliance {
  id: string,
  name: string
}

interface Corporation {
  id: string,
  name: string
}
