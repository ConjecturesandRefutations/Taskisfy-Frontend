function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Taskify - Get things done!</p>
      </div>
    </footer>
  );
}

export default Footer;
