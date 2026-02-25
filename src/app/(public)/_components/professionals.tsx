import { Card, CardContent } from "@/components/ui/card";
import fotoImg from '../../../../public/foto1.jpg'
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Professionals() {
    return (
        <section className="bg-gray-50 pt-16 pb-16">

            <div className="container mx-auto px-4 sm:px-6 lg:pxpx-8">

                <h2 className="text-3xl text-center mb-12 font-bold">Profissionais</h2>

                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    <Card className="overflow-hidden">
                        <CardContent className="p-0">

                            <div>
                                <div className="relative h-48">
                                    <Image
                                        src={fotoImg}
                                        alt="Foto do profissional"
                                        fill
                                        className="object-cover">
                                    </Image>
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Clínica Sorrisal</h3>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Rua 25 de dezembro, 924 - Campo Grande/MS
                                </p>
                                
                            </div>
                                <Link
                                    href={"/clinica/123"}
                                    className="w-full bg-emerald-500 hover:bg-emerald-300 text-white flex items-center 
                                    justify-center py-2 rounded-md text-sm md:text-base font-medium">
                                    Agendar horário
                                    <ArrowRight className="ml-2"></ArrowRight>
                                </Link>
                        
                        </CardContent>
                    </Card>

                </section>

            </div>

        </section>
    )
}