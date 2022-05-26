import { realizarSorteio } from "./realizarSorteio";

describe("Dado o sorteio de um amigo secreto", () => {
  test("Cada participante não sorteie o proprio nome", () => {

    const participantes = ['Darlan', 'Mayara', 'Theo', 'Iza', 'Meire', 'Dari'];

    const sorteio = realizarSorteio(participantes)

    participantes.forEach((participante)=> {
      const amigoSecreto = sorteio.get(participante)

      expect(amigoSecreto).not.toEqual(participante)
    })
  });
});
