import { useState } from "react";
import type { FormEvent } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário, que é recarregar a página

    try {
      // Dispara os dados para salvar no banco de dados H2 através do Spring
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/login"); // Após cadastrar, joga o usuário para a tela de login
      } else {
        alert(
          "Erro ao cadastrar usuário. Verifique se o e-mail ou nome já existem.",
        );
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0A1628] via-[#1a2942] to-[#00C49A] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-xl p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Crie sua conta
          </h1>

          {/* Campo Username */}
          <div className="relative">
            <input
              type="text"
              placeholder="Nome de Usuário"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full px-6 pr-12 text-white placeholder-white/70 focus:outline-none focus:border-[#00C49A] transition-colors"
            />
            <FaUser className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70" />
          </div>

          {/* Campo E-mail */}
          <div className="relative">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full px-6 pr-12 text-white placeholder-white/70 focus:outline-none focus:border-[#00C49A] transition-colors"
            />
            <FaEnvelope className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70" />
          </div>

          {/* Campo Senha */}
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full px-6 pr-12 text-white placeholder-white/70 focus:outline-none focus:border-[#00C49A] transition-colors"
            />
            <FaLock className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70" />
          </div>

          {/* Botão Cadastrar */}
          <button
            type="submit"
            className="w-full h-12 bg-linear-to-r from-[#00C49A] to-[#00d4a8] text-[#0A1628] font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Cadastrar
          </button>

          <div className="text-center text-sm text-white">
            <p>
              Já tem uma conta?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-[#00C49A] hover:underline bg-transparent border-none cursor-pointer"
              >
                Faça Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
