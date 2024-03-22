export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/photo", "/video", "/albums"],
};
