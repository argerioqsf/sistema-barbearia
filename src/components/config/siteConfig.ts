import { ArrowDownIcon } from "../Icons/ArrowDownIcon";
import { CircleIcon } from "../Icons/CircleIcon";
import { ClipboardIcon } from "../Icons/ClipboardIcon";
import { DashBoardIcon } from "../Icons/DashBoardIcon";
import { HandPointLeftIcon } from "../Icons/HandPointLeftIcon";
import { UsersIcon } from "../Icons/UsersIcon";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  items_side_menu: [
    {
      id: "1",
      href: "home",
      label: "SIM",
      size: 45,
      image:
        "https://www.grupomadretereza.com.br/sim/themes/simadm/assets/images/logo.png",
    },
    {
      id: "2",
      label: "ARGÉRIO FILHO",
      href: "profile",
    },
    {
      id: "3",
      label: "Dashboard",
      href: "profile",
      icon: DashBoardIcon,
    },
    {
      id: "4",
      label: "Indicadores",
      icon: HandPointLeftIcon,
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "home",
          icon: CircleIcon,
        },
        {
          id: "2",
          label: "Solicitações",
          href: "home",
          icon: CircleIcon,
        },
        {
          id: "3",
          label: "Cadastrar Indicador",
          href: "profile",
          icon: CircleIcon,
        },
      ],
    },
    {
      id: "5",
      label: "Leads",
      icon: UsersIcon,
      subMenuList: [
        {
          id: "1",
          label: "Novos Leads",
          href: "home",
          icon: CircleIcon,
        },
        {
          id: "2",
          label: "Listagem",
          href: "home",
          icon: CircleIcon,
        },
        {
          id: "3",
          label: "Confirmados",
          href: "perfil",
          icon: CircleIcon,
        },
        {
          id: "4",
          label: "Cadastrar Leads",
          href: "perfil",
          icon: CircleIcon,
        },
      ],
    },
    {
      id: "6",
      label: "Segmentos",
      icon: ClipboardIcon,
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "home",
          icon: CircleIcon,
        },
        {
          id: "2",
          label: "Cadastrar Segmento",
          href: "home",
          icon: CircleIcon,
        },
      ],
    },
    {
      id: "7",
      label: "Usuários",
      subMenuList: [
        {
          id: "1",
          label: "Listagem",
          href: "users",
          icon: CircleIcon,
        },
        {
          id: "2",
          label: "Cadastrar Usuários",
          href: "users/edit",
          icon: CircleIcon,
        },
      ],
    },
  ],
};
