import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Simulação de um usuário
        const user = { id: "1", name: 'User', username: 'user', password: 'password' };

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