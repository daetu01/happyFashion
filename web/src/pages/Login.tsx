import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import PageShell from "../components/PageShell";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import { useAuth } from "../lib/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = !!email.trim() && !!password && !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      await login(email.trim(), password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell back>
      <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Welcome back</h1>
        <p className="mt-2 text-sm text-white/55">Log in to save and revisit your aura.</p>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.05} variants={fadeUp}>
        <GlassCard className="p-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-aura-400/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/50">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-10 text-sm text-white placeholder:text-white/35 outline-none focus:border-aura-400/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-rose-400">{error}</p>}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!canSubmit}
              icon={submitting ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            >
              {submitting ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </GlassCard>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="show"
        custom={0.1}
        variants={fadeUp}
        className="mt-5 text-center text-sm text-white/45"
      >
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-aura-300 hover:text-aura-200">
          Sign up
        </Link>
      </motion.p>
    </PageShell>
  );
}
