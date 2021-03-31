const host = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

export const authentication = {
  login: async (email: string, password: string) => {
    const payload = {
      user: {
        email,
        password,
      },
    };

    const response = await fetch(`${host}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response?.status === 200) {
      return [
        true,
        response.headers.get("Authorization")?.replace("Bearer ", ""),
      ];
    }

    return [false, (await response.json()).error];
  },
  resetPasswordEmail: async (email: string) => {
    const payload = { user: { email } };

    const response = await fetch(`${host}/password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200) return true;

    return false;
  },
  resetPasswordByToken: async ({
    reset_password_token,
    password,
    password_confirmation,
  }: {
    reset_password_token: string;
    password: string;
    password_confirmation: string;
  }) => {
    const payload = {
      user: {
        reset_password_token,
        password,
        password_confirmation,
      },
    };

    const response = await fetch(`${host}/password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 204) return true;

    return false;
  },
};
