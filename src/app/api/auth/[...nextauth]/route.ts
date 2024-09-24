import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const url = 'http://localhost:8080';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Admin user, remove this
        const admin = { id: "1", name: 'User', username: 'admin', password: 'admin' };
        if (credentials?.username === admin.username && credentials?.password === admin.password) {
          return admin;
        }

        const response = await fetch(`${url}/user/${credentials?.username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const user = await response.json();

        if (credentials?.username === user.username && credentials?.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };