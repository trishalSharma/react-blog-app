
import { useSearchParams, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function verifyEmail() {
      if (!userId || !secret) {
        setError("Invalid verification link.");
        setLoading(false);
        return;
      }

      try {
        await authService.account.updateVerification(userId, secret);

        navigate("/login");
      } catch (err) {
        setError(
          "Verification failed or link expired. Please request a new verification email."
        );
        setLoading(false);
      }
    }

    verifyEmail();
  }, [userId, secret, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071a1e] text-white">
        <p>Verifying your email…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071a1e] text-white">
      <div className="bg-slate-800 p-6 rounded-xl shadow max-w-md text-center">
        <h1 className="text-xl font-semibold mb-3">
          Email verification failed
        </h1>

        <p className="text-gray-300 mb-4">{error}</p>

        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
        >
          Back to Signup
        </button>
      </div>
    </div>
  );
}
