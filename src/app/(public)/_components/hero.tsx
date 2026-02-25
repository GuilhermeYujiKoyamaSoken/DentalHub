import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImage from '../../../../public/doctor-image.png'

export function Hero() {
    return (
        <div>
            <section className="bg-white">
                <div className="container mx-auto px-4 pt-20 pb-4 sm:pb-0 sm:px-6 lg:px-8">

                    <main className="flex items-center justify-center">
                        <article className="flex-2 max-w-3xl space-y-8 flex flex-col text-center">
                            <h1 className="text-4xl font-bold lg:text-5x1 max-w-2xl">Encontre os melhores profissionais em um único lugar!</h1>
                            <p className="text-base md:text-lg text-gray-600 text-justify">
                                Nós somos uma plataforma para profissionais da saúde dentária com foco 
                                em agilizar seu atendimento de forma simplificada e organizada.
                            </p>

                            <Button className="bg-emerald-500 hover:bg-emerald-300 w-fit px-6 font-semibold">
                                Encontre uma clínica
                            </Button>
                        </article>

                        <div className="hidden lg:block">
                            <Image src={doctorImage} alt="imagem de dentista sorrindo"
                             width={340}
                             height={400}
                             className="object-contain"
                             quality={100}
                             priority>   
                             </Image>
                        </div>

                    </main>

                </div>
            </section>
        </div>
    )
}