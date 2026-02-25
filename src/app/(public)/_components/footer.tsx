

export function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm md:text-base">
      <p>
        Copyright © {new Date().getFullYear()}{" "}
        <a
          href="https://github.com/GuilhermeYujiKoyamaSoken"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors duration-300"
        >
          Guilherme Yuji
        </a>.
      </p>
    </footer>
  )
}