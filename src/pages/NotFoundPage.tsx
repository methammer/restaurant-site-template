const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFoundPage;
