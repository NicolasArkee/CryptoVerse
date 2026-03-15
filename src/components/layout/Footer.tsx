export function Footer() {
  return (
    <footer className="border-t border-border bg-deep mt-auto">
      <div className="mx-auto max-w-[80rem] px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-pixel text-[0.5rem] text-muted tracking-widest">
            CRYPTOVERSE — THE ULTIMATE CRYPTOCURRENCY ENCYCLOPEDIA
          </div>
          <div className="text-sm text-muted">
            Data provided by <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">CoinGecko</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
