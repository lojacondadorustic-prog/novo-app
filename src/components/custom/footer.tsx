import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F5A8A] text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D9A441] to-white flex items-center justify-center overflow-hidden">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/8b86afc1-b201-4b03-b4b5-6ab2d5e6e602.png" 
                  alt="NutriDog Pro Logo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="text-xl font-bold">NutriDog Pro</span>
            </div>
            <p className="text-sm text-white/80">
              Nutrição inteligente para o seu melhor amigo
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pantry" className="text-white/80 hover:text-white transition-colors">
                  Pantry Inteligente
                </Link>
              </li>
              <li>
                <Link href="/generate" className="text-white/80 hover:text-white transition-colors">
                  Gerar Dieta
                </Link>
              </li>
              <li>
                <Link href="/weekly" className="text-white/80 hover:text-white transition-colors">
                  Plano Semanal
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-white/80 hover:text-white transition-colors">
                  Histórico
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/quick" className="text-white/80 hover:text-white transition-colors">
                  Quick Generate
                </Link>
              </li>
              <li>
                <Link href="/kitchen" className="text-white/80 hover:text-white transition-colors">
                  Modo Cozinha
                </Link>
              </li>
              <li>
                <Link href="/vet" className="text-white/80 hover:text-white transition-colors">
                  Vet Connect
                </Link>
              </li>
              <li>
                <Link href="/market" className="text-white/80 hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                <span>contato@nutridogpro.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} NutriDog Pro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
