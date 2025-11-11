import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, User } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check credentials
    if (username === "admin" && password === "admin123") {
      // Set admin session
      localStorage.setItem("adminAuthenticated", "true");
      localStorage.setItem("adminLoginTime", new Date().toISOString());
      
      // Redirect to admin dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/10 via-transparent to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent rounded-full blur-3xl animate-float-slow" />
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 bg-card/95 backdrop-blur-xl border-border/50">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Chronos Store Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div>
            <Label htmlFor="username" className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="text-lg py-6"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="flex items-center gap-2 mb-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="text-lg py-6"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full text-lg py-6"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </Button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Demo Credentials:</strong><br />
            Username: <code className="bg-primary/10 px-2 py-1 rounded">admin</code><br />
            Password: <code className="bg-primary/10 px-2 py-1 rounded">admin123</code>
          </p>
        </div>

        {/* Back to Store */}
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground"
          >
            ← Back to Store
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
