<script setup lang="ts">
import { ref } from "vue";
import CalendarIco from "./icons/CalendarIco.vue";
import ChatIco from "./icons/ChatIco.vue";
import CustomersIco from "./icons/CustomersIco.vue";
import DashboardIco from "./icons/DashboardIco.vue";
import HelpIco from "./icons/HelpIco.vue";
import HomeIco from "./icons/HomeIco.vue";
import InboxIco from "./icons/InboxIco.vue";
import InvoicesIco from "./icons/InvoicesIco.vue";
import ProductsIco from "./icons/ProductsIco.vue";
import SettingsIco from "./icons/SettingsIco.vue";

enum Tab {
  Home = "Home",
  Dashboard = "Dashboard",
  Inbox = "Inbox",
  Products = "Products",
  Invoices = "Invoices",
  Customers = "Customers",
  Chat = "Chat Room",
  Calendar = "Calendar",
  Help = "Help Center",
  Settings = "Settings",
}

const activeTab = ref<Tab>(Tab.Calendar);

const tabs = [
  { icon: HomeIco, label: Tab.Home, link: "/" },
  { icon: DashboardIco, label: Tab.Dashboard, link: "/dashboard" },
  { icon: InboxIco, label: Tab.Inbox, link: "/inbox" },
  { icon: ProductsIco, label: Tab.Products, link: "/products" },
  { icon: InvoicesIco, label: Tab.Invoices, link: "/invoices" },
  { icon: CustomersIco, label: Tab.Customers, link: "/customers" },
  { icon: ChatIco, label: Tab.Chat, link: "/chat" },
  { icon: CalendarIco, label: Tab.Calendar, link: "/calendar" },
  { icon: HelpIco, label: Tab.Help, link: "/help" },
  { icon: SettingsIco, label: Tab.Settings, link: "/settings" },
];


function setActive(tab: Tab) {
  activeTab.value = tab;
}

</script>

<template>
  <aside class="menu">
    <div class="logo">IMPEKABLE</div>

    <nav class="nav">
      <ul class="nav__list">
        <li
          v-for="tab in tabs"
          :key="tab.label"
          class="nav__item"
          :class="{ 'nav__item--active': activeTab === tab.label }"
          @click.prevent="setActive(tab.label)"
        >
          <a href="`#`" class="nav__link">
            <component :is="tab.icon" />
            {{ tab.label }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>
