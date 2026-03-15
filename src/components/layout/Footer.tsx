export function Footer() {
  return (
    <footer className="border-t border-border bg-deep mt-auto">
      <div className="mx-auto max-w-[80rem] px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-pixel text-[0.5rem] text-muted tracking-widest">
            CRYPTOVERSE — THE ULTIMATE CRYPTOCURRENCY ENCYCLOPEDIA
          </div>
          <div className="text-xs text-muted flex flex-wrap gap-x-3 gap-y-1 justify-center">
            <span>Data:</span>
            <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">CoinGecko</a>
            <a href="https://defillama.com" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">DefiLlama</a>
            <a href="https://alternative.me" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">Alternative.me</a>
            <a href="https://blockchain.info" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">Blockchain.com</a>
            <a href="https://cryptopanic.com" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">CryptoPanic</a>
            <a href="https://www.ecb.europa.eu" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">ECB/Frankfurter</a>
            <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-white transition-colors">DexScreener</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
