import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Categories,
  Coupons,
  Orders,
  Pages,
  Products,
  Profile,
  Reviews,
  Setting,
  Leaf,
  StuffUser,
  Invoice,
  Return,
  Inventory,
  FlashSale,
  Tag,
  Shipment,
  Collection,
  Affiliate,
} from "@/svg";

const sidebar_menu: Array<ISidebarMenus> = [
  {
    id: 1,
    icon: Dashboard,
    link: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 2,
    icon: Products,
    link: "/product-list",
    title: "Products",
    subMenus: [
      { title: "Product List", link: "/product-list" },
      { title: "Product Grid", link: "/product-grid" },
      { title: "Add Product", link: "/add-product" }
    ],
  },
  {
    id: 3,
    icon: Categories,
    link: "/category",
    title: "Category",
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Orders",
  },
  {
    id: 5,
    icon: Leaf,
    link: "/brands",
    title: "Brand",
  },
  {
    id: 6,
    icon: Reviews,
    link: "/reviews",
    title: "Reviews",
  },
  {
    id: 7,
    icon: Coupons,
    link: "/coupon",
    title: "Coupons",
  },
  {
    id: 8,
    icon: Collection,
    link: "/collections",
    title: "Collections",
  },
  {
    id: 9,
    icon: FlashSale,
    link: "/flash-sales",
    title: "Flash Sales",
  },
  {
    id: 10,
    icon: Tag,
    link: "/product-tags",
    title: "Product Tags",
  },
  {
    id: 11,
    icon: Tag,
    link: "/product-labels",
    title: "Product Labels",
  },
  {
    id: 12,
    icon: Inventory,
    link: "/inventory",
    title: "Inventory",
  },
  {
    id: 13,
    icon: Shipment,
    link: "/shipments",
    title: "Shipments",
  },
  {
    id: 14,
    icon: Return,
    link: "/order-returns",
    title: "Order Returns",
  },
  {
    id: 15,
    icon: Invoice,
    link: "/invoices",
    title: "Invoices",
  },
  {
    id: 16,
    icon: Affiliate,
    link: "/affiliates",
    title: "Affiliates",
  },
  {
    id: 17,
    icon: Profile,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 18,
    icon: Setting,
    link: "#",
    title: "Online store",
  },
  {
    id: 19,
    icon: StuffUser,
    link: "/our-staff",
    title: "Our Staff",
  },
  {
    id: 20,
    icon: Pages,
    link: "/dashboard",
    title: "Pages",
    subMenus: [
      { title: "Register", link: "/register" },
      { title: "Login", link: "/login" },
      { title: "Forgot Password", link: "/forgot-password" }
    ],
  },
];

export default sidebar_menu;
