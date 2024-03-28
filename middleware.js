import { withAuth } from "next-auth/middleware";


export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/dashboard/login',
    error: '/not-found',
  }
})

export const config = {
    matcher: [
    "/",
    "/artist/:path*",
    "/album/:path*",
    "/collection/:path*",
    "/playlist/:path*",
    "/upload/:path*",
    "/user/:path*",
  ],
};
