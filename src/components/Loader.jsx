function Loader({ children, loading, ...props }) {
    return (
        <button
            {...props}
            disabled={loading}
            className={`px-4 py-2 rounded bg-blue-600 text-white flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
            {loading && (
                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {children}
        </button>
    );
}

export default Loader;
