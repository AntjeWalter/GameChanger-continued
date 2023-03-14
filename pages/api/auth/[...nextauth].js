import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: { label: "Benutzername", type: "text" },
      password: { label: "Passwort", type: "password" },
    },
    async authorize(credentials) {
      if (credentials.username === "GNTM" && credentials.password === "GNTM") {
        return {
          name: "GNTM-Gruppe",
          email: "GNTM@example.de",
        };
      } else if (
        credentials.username === "GameChanger" &&
        credentials.password === "GameChanger"
      ) {
        return {
          name: "Test-Nutzer",
          email: "Text@example.de",
        };
      } else {
        return null;
      }
    },
  }),
];

export const authOptions = {
  providers,
};

export default NextAuth(authOptions);
