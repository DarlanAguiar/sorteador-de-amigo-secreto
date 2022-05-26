import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ListaParticipantes from "./ListaParticipantes";

// informando ao jest o que ele tem que mocar de fato
jest.mock("../state/hook/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
});

describe("Uma lista vazia de participantes", () => {
  //informando para o mock retornar uma lista vazia
  beforeEach(()=> {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })

  test("deve ser renderizada sem elementos", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");

    expect(itens).toHaveLength(0);
  });
});

describe("Uma lista preechida de participantes", () => {
  const participantes = ["Darlan", "Mayara"];

  beforeEach(()=> {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes)
  })

  test("deve ser renderizada com participantes", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );
      // buscando pela role ('seu valor semântico)
      // listitem == <li>
    const itens = screen.queryAllByRole("listitem");

    expect(itens).toHaveLength(participantes.length);
  });
});
