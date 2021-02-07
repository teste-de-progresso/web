class AuthenticationService {
  constructor() {
    this.host = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
  }

  async login(email, password) {
    const payload = {
      user: {
        email, password,
      },
    };

    const response = await fetch(`${this.host}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) {
      return [true, response.headers.get("Authorization").replace("Bearer ", "")];
    }

    return [false, (await response.json()).error];
  }

  async resetPasswordEmail(email) {
    const payload = { user: { email } };

    const response = await fetch(`${this.host}/password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) return true;

    return false;
  }

  // eslint-disable-next-line camelcase
  async resetPasswordByToken({ reset_password_token, password, password_confirmation }) {
    const payload = {
      user: {
        reset_password_token,
        password,
        password_confirmation,
      },
    };

    const response = await fetch(`${this.host}/password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 204) return true;

    return false;
  }
}

export default new AuthenticationService();
