export class InvalidatedRefreshTokenError extends Error {
  constructor() {
    super('Invalidated refresh token');
  }
}

export class ExpiredRefreshTokenError extends Error {
  constructor() {
    super('Refresh token expired');
  }
}
