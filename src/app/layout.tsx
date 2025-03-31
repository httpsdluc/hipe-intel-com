import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar"; // ✅ Make sure this exists and has no typos

export const metadata = {
  title: "HIPE INTEL COM",
  description: "A community for future intelligence professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-950 text-white">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
