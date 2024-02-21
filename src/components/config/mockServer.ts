import { CircleIcon } from "../Icons/CircleIcon";
import { ClipboardIcon } from "../Icons/ClipboardIcon";
import { DashBoardIcon } from "../Icons/DashBoardIcon";
import { HandPointLeftIcon } from "../Icons/HandPointLeftIcon";
import { UsersIcon } from "../Icons/UsersIcon";

export type MockServer = typeof mockServer;

export const mockServer = {
  indicators: [
    {
      id: 1,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 2,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 3,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 4,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 5,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 6,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
    {
      id: 7,
      name: "Argério Queiroz",
      cidade: "Macapá",
      link: "link",
      data: "22/04/2023",
    },
  ],
  leads: [
    {
      id: 6,
      name: "Argério Queiroz",
      whatsapp: "(96) 9 8623-3232",
      training_course: "Engenahria da Computação",
      indicator_id: "qweacsdcsdcq31231",
      indicator: {
        name: "Damiles Arruda",
        curso: {
          name: "Arquitetura",
        },
      },
      status: "Consultor entrou em contato",
      created_at: "11/02/2024",
      updated_at: "20/02/2024",
    },
    {
      id: 7,
      name: "Argério Queiroz",
      whatsapp: "(96) 9 8623-3232",
      training_course: "Engenahria da Computação",
      indicator_id: "23wefsdsdfwr3scds",
      indicator: {
        name: "Damiles Arruda",
      },
      status: "Consultor entrou em contato",
      created_at: "11/02/2024",
      updated_at: "20/02/2024",
    },
    {
      id: 8,
      name: "Argério Queiroz",
      whatsapp: "(96) 9 8623-3232",
      training_course: "Engenahria da Computação",
      indicator_id: "1234234wfsdfsf",
      indicator: {
        name: "Damiles Arruda",
      },
      status: "Consultor entrou em contato",
      created_at: "11/02/2024",
      updated_at: "20/02/2024",
    },
  ],
  users: [
    {
      id: 1,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
      image:
        "https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg",
    },
    {
      id: 2,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
      image:
        "https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg",
    },
    {
      id: 3,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
      image:
        "https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg",
    },
    {
      id: 4,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
      image:
        "https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg",
    },
    {
      id: 5,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
      image:
        "https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg",
    },
    {
      id: 6,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
      image:
        "https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg",
    },
    {
      id: 7,
      name: "Argério Queiroz",
      email: "argerioaf@gmail.com",
      number: "(96) 9 8623-3232",
      status: "Consultor entrou em contato",
      image:
        "https://img.myloview.com.br/adesivos/humano-homem-pessoa-avatar-perfil-do-usuario-vector-icon-ilustracao-700-80949473.jpg",
    },
  ],
  listActionsIndicators: [
    {
      id: 1,
      onclick: () => {},
      icon: "Edit",
      href: "indicators/edit",
      name: "Editar",
    },
    {
      id: 2,
      onclick: () => {},
      icon: "Eye",
      href: "home",
      name: "Vizualizar",
    },
    {
      id: 3,
      onclick: () => {},
      icon: "Lock",
      href: "home",
      name: "Desativar",
    },
    {
      id: 4,
      onclick: () => {},
      icon: "Link",
      href: "home",
      name: "Link",
    },
  ],
  listActionsUsers: [
    {
      id: 1,
      onclick: () => {},
      icon: "Edit",
      href: "users/edit",
      name: "Editar",
    },
    {
      id: 2,
      onclick: () => {},
      icon: "Eye",
      href: "home",
      name: "Vizualizar",
    },
    {
      id: 3,
      onclick: () => {},
      icon: "Lock",
      href: "home",
      name: "Desativar",
    },
  ],
  listActionsLeads: [
    {
      id: 1,
      onclick: () => {},
      icon: "Edit",
      href: "leads/edit",
      name: "Editar",
    },
    {
      id: 2,
      onclick: () => {},
      icon: "Eye",
      href: "home",
      name: "Vizualizar",
    },
  ],
};
