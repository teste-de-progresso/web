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
}

export default new AuthenticationService();
