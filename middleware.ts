import { withAuth } from 'next-auth/middleware'

// protect URLs from being directly visited by typing: 'localhost:3000/users/redhawc',
// after adding this , we can only log in using the proper way.

export default withAuth({
    pages: {
        signIn: '/',
    }
})

export const config = {
    matcher: [
        '/users/:path*',
        '/conversations/:path*'
    ]
}